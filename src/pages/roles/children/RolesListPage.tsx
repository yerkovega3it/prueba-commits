import { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery, useMutation, useSuspenseQueries, useQueryClient } from '@tanstack/react-query'
import { useShallow } from 'zustand/react/shallow'
import { 
  utils, 
  Table, 
  Paginator, 
  Detail, 
  Button,
  Badge,
  Toast,
  Select,
  type FilterElement, 
  type SelectFilter, 
  type SelectOption,
  type TablePaginator,
  type TableSort,
  type ToastCore,
  type ToastExpose
} from 'uikit-3it-react'
import { useCurrentBreadcrumb, useFilters } from '@/hooks'
import { Filters, ListSearch, FaIcon, EnableDisable } from '@/components'
import messages from '@/messages/messages'

import { 
  getRolesAction, 
  getRoleByIdAction,
  slideRoleFilterAction, 
  slideRoleDetailAction, 
  slideRoleCloseAction,
  getSelectStatusAction,
  getSelectModuleAction,
  getSelectRoleUserAction,
  mutationUpdateStatusRoleFormAction
} from '@/actions'
import { useStoreRoles } from '@/stores'
import { initialFiltersRole, initialQueryParamsRole } from '@/factories'
import type { Role, RoleFilters, EnableDisableExpose, RoleStatusPayload } from '@/interfaces'

//Exclusive Components
import RoleDetail from '@/components/roles/RoleDetail'

// Utils
const { actionView, actionEdit, actionEnabledDisabled } = utils.createAction<Role>()
const { sortTable } = utils.createTable()
const {
  messageAlertEnableDisabled,
  messageToastEnableDisabled
} = utils.createMessage()

export default function RolesListPage() {
  // ============================================================
  // 1. ROUTING & NAVIGATION
  // ============================================================
  const breadcrumb = useCurrentBreadcrumb()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const toastRef = useRef<ToastExpose>(null)

  const urlRoleId = useMemo(() => {
    const idParam = searchParams.get('detail')
    return idParam ? Number(idParam) : null
  }, [searchParams])

  // ============================================================
  // 2. LOCAL STATE
  // ============================================================
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [filters, setFilters] = useState<RoleFilters>({ ...initialFiltersRole })
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(urlRoleId)
  const hasInitializedFilters = useRef(false)
  const previousFilterSelected = useRef<boolean | null>(null)
  const dialogEnableDisable = useRef<EnableDisableExpose>(null)
  const [toast, setToast] = useState<ToastCore>({ variant: 'info', title: '', message: '', code: '' })
  const [selectedRole, setSelectedRole] = useState<SelectOption | null >(null)

  // ============================================================
  // 3. GLOBAL STATE (STORES)
  // ============================================================
  const {
    roles,
    setRoles,
    loadingTable,
    setLoadingTable,
    slideFilter,
    slideDetail,
    errorBack,
    setErrorBack,
    queryParams,
    setQueryParams,
    messageDialogAlert,
    setMessageDialogAlert
  } = useStoreRoles(
    useShallow((state) => ({
      roles: state.roles,
      setRoles: state.setRoles,
      loadingTable: state.loadingTable,
      setLoadingTable: state.setLoadingTable,
      slideFilter: state.slideFilter,
      slideDetail: state.slideDetail,
      errorBack: state.errorBack,
      setErrorBack: state.setErrorBack,
      queryParams: state.queryParams,
      setQueryParams: state.setQueryParams,
      messageDialogAlert: state.messageDialogAlert,
      setMessageDialogAlert: state.setMessageDialogAlert
    }))
  )

  // ============================================================
  // 4. SERVER STATE (QUERIES)
  // ============================================================
  const queryClient = useQueryClient()

  const [selectStatus, selectModules, selectRoleUser] = useSuspenseQueries({
    queries: [
      {queryKey: ['selectorStatus'], queryFn: () => getSelectStatusAction(), staleTime: 30_000},
      {queryKey: ['selectorModules'], queryFn: () => getSelectModuleAction(), staleTime: 30_000},
      {queryKey: ['selectRoleUser'], queryFn: () => getSelectRoleUserAction({filter: true}), staleTime: 30_000}
    ]
  })
  
  const rolesQuery = useQuery({
    queryKey: ['roles', queryParams],
    queryFn: () => getRolesAction(queryParams),
    staleTime: 30_000
  })

  const roleQuery = useQuery({
    queryKey: ['role', selectedRoleId],
    queryFn: () => getRoleByIdAction(selectedRoleId as number),
    enabled: selectedRoleId != null,
    staleTime: 30_000,
    //placeholderData: (previousData) => previousData // Mantener datos previos cuando se deshabilita
  })

  const mutationUpdateStatusRoleForm = useMutation({
    mutationFn: (payload: RoleStatusPayload) => mutationUpdateStatusRoleFormAction(payload),
    onSuccess: async () => {
      handleToastShow()
      await queryClient.invalidateQueries({ queryKey: ['roles'] })
      await queryClient.invalidateQueries({ queryKey: ['role'] })
    }
  })

  // ============================================================
  // 5. CUSTOM HOOKS
  // ============================================================
  const { mapRouteToFilters, mapFiltersToRoute } = useFilters()

  // ============================================================
  // 6. DERIVED STATE & MEMOIZED VALUES
  // ============================================================
  // Verificar si los selectores están listos
  const selectorsReady = useMemo(() => {
    return selectStatus.data.data.length > 0 && selectModules.data.data.length > 0
  }, [selectStatus.data.data.length, selectModules.data.data.length])

  // Elementos de filtro (dependen de selectores y estado local)
  const filterElements = useMemo<FilterElement[]>(() => {
    const status: SelectFilter = {
      ...selectStatus.data,
      multiple: false,
      selected: filters.status,
      handle: (opt) => setFilters((prev: RoleFilters) => ({ ...prev, status: opt }))
    }

    const modules: SelectFilter = {
      ...selectModules.data,
      multiple: false,
      selected: filters.module,
      handle: (opt) => setFilters((prev: RoleFilters) => ({ ...prev, module: opt }))
    }

    return [status, modules]
  }, [selectStatus.data, selectModules.data, filters])

  // Control de si hay filtros seleccionados
  const controlFilterSelected = useMemo(() => {
    return filterElements.some((filter) => {
      if (filter.type === "select") {
        if (filter.multiple) return !!filter.selected?.length
        return !!filter.selected
      }
      if (filter.type === "switch") return filter.input !== null
      if (filter.type === "date") return !!filter.input
      if (filter.type === "range") return !!filter.start?.input || !!filter.end?.input
      return false
    })
  }, [filterElements])

  // Datos de paginación para la tabla
  const handleTablePaginator: TablePaginator = useMemo(() => {
    if (!rolesQuery.data) return { total: 0, finalPage: 1, currentPage: 1 }
    return {
      total: rolesQuery.data.meta.total,
      finalPage: rolesQuery.data.meta.finalPage,
      currentPage: rolesQuery.data.meta.currentPage
    }
  }, [rolesQuery.data])

  // Configuración de skeleton de carga
  const controlLoadingTable = useMemo(() => {
    return { row: 8, column: roles.columns.length }
  }, [roles.columns.length])
  
  // Tabla filtrada y ordenada
  const filterTable = useMemo(() => {
    return sortTable(roles.sort, rolesQuery.data?.roles || [])
  }, [rolesQuery.data?.roles, roles.sort])

  const controlEnableDisableData = useMemo(() => {
    return {
      record: roleQuery.data ?? null,
      errorBack: errorBack,
      loading: roleQuery.isFetching,
      loadingBtn: mutationUpdateStatusRoleForm.isPending,
      disabledSubmit: mutationUpdateStatusRoleForm.isPending || (roleQuery.data?.phantomKey.status === true && selectedRole === null),
      messageAlert: { ...messageDialogAlert }
    }
  }, [roleQuery.data, errorBack, roleQuery.isFetching, messageDialogAlert, mutationUpdateStatusRoleForm.isPending, selectedRole])

  const controlCurrentDisableRole = useMemo(() => {
    if (!roleQuery.data || !selectRoleUser.data?.data) return [] 
    const currentRoleId = roleQuery.data.phantomKey.id
    return selectRoleUser.data.data.map(role => ({
      ...role,
      isDisabled: role.id === currentRoleId
    }))
  }, [roleQuery.data, selectRoleUser.data?.data])

  // ============================================================
  // 7. INITIALIZATION EFFECTS
  // ============================================================
  // Inicializar filtros desde URL cuando los selectores estén listos (solo una vez)
  useEffect(() => {
    if (!hasInitializedFilters.current && selectorsReady) {
      mapRouteToFilters(filterElements, setFilters)
      hasInitializedFilters.current = true
      
      const statusValue = searchParams.get('status') === 'true' ? true : searchParams.get('status') === 'false' ? false : null
      const moduleValue = searchParams.get('module') ? parseInt(searchParams.get('module')!) : null
      const pageValue = searchParams.get('page') ? parseInt(searchParams.get('page')!) - 1 : 0
      const searchValue = searchParams.get('search') || ''
      
      setQueryParams({
        page: pageValue,
        size: queryParams.size,
        sort: queryParams.sort,
        search: searchValue,
        subModuleId: moduleValue,
        status: statusValue
      })
    }
  }, [selectorsReady, filterElements, mapRouteToFilters, searchParams, queryParams.size, queryParams.sort, setQueryParams])

  // ============================================================
  // 8. CALLBACKS & HANDLERS
  // ============================================================
  const handleToastShow = useCallback(() => {
    setToast(messageToastEnableDisabled(
      messages.role,
      !roleQuery.data?.recordStatus?.status,
      !!errorBack
    ))
    toastRef.current?.handleShowToast()
  }, [errorBack, setToast, roleQuery.data])

  // Aplicar filtros (click en botón "Filtrar")
  const handleFilterContent = useCallback(() => {
    try {
      mapFiltersToRoute(filterElements, setFilters, true)
      setRoles({ paginator: { ...roles.paginator, currentPage: 1 } })
      
      const statusValue = filters.status ? Boolean((filters.status as SelectOption).status) : null
      const moduleValue = (filters.module as SelectOption)?.id || null
      
      setQueryParams({
        page: 0,
        size: queryParams.size,
        sort: queryParams.sort,
        search: search || '',
        subModuleId: moduleValue,
        status: statusValue
      })
    } catch (error) {
      console.error('Error applying filters:', error)
    } 
  }, [filterElements, mapFiltersToRoute, filters.status, filters.module, search, queryParams.size, queryParams.sort, setQueryParams, setRoles, roles.paginator])

  // Handlers de búsqueda
  const handleInputSearch = (output: string) => {
    setSearch(output.trim())
  }
  
  const handlePressEnter = useCallback(() => {
    setFilters((prev: RoleFilters) => ({ ...prev, search: search, page: 1 }))
    setRoles({ paginator: { ...roles.paginator, currentPage: 1 } })
    setQueryParams({ search, page: 0 })
    setSearchParams(prev => {
      if (search) prev.set('search', String(search))
      else prev.delete('search')
      return prev
    }, { replace: true })
  }, [search, setRoles, roles.paginator, setQueryParams, setSearchParams])

  // Handlers de paginación
  const handleUpdatePaginator = useCallback((page: number): void => {
    const zeroBased = Math.max(0, page - 1)
  
    setSearchParams(prev => {
      prev.set('page', String(page))
      return prev
    }, { replace: true })

    setQueryParams({ page: zeroBased })
  }, [setSearchParams, setQueryParams])

  // Handlers de tabla
  const handleUpdateSort = useCallback((newSort: TableSort) => {
    setRoles({ sort: newSort })
  }, [setRoles])

  // Handlers de acciones de registros
  const handleDownloadRecords = async () => {
    try {
      console.log('Descargando registros...')
    } catch (error) {
      console.error(error)
    }
  }

  const handleNewRecord = useCallback(() => {
    navigate('/roles/new')
  }, [navigate])

  const handleViewRecord = useCallback((record: Role) => {
    setSearchParams(prev => {
      prev.set('detail', String(record.phantomKey.id))
      return prev
    }, { replace: true })
  }, [setSearchParams])

  const handleEditRecord = useCallback((record: Role) => {
    navigate(`/roles/edit/${record.phantomKey.id}`)
  }, [navigate])

  const handleDialogStatus = useCallback((record: Role) => {
    // Limpiar previos
    setErrorBack(null)
    setSelectedRole(null)

    // Actualizar el roleId para roleQuery
    setSelectedRoleId(record.phantomKey.id)

    // Abrir el diálogo
    dialogEnableDisable.current?.showDialog()
  },[setSelectedRoleId, setErrorBack])

  const handleSelectedRole = useCallback((value: { id: number; name: string }) => {
    setSelectedRole(value)
  }, [setSelectedRole])

  const handleEnableDisableRecord = useCallback(async () => {

    const data_: RoleStatusPayload = {
      roleId: Number(selectedRoleId),
      status: !roleQuery.data?.recordStatus.status,
      newRoleId: selectedRole ? selectedRole.id : ''
    }
    await mutationUpdateStatusRoleForm.mutateAsync(data_)

  },[selectedRoleId, roleQuery.data, mutationUpdateStatusRoleForm, selectedRole])

  const handleTableActions = useCallback(() => {
    setRoles({
      actions: [
        actionView(handleViewRecord, 'Ver rol'),
        actionEdit(handleEditRecord, 'Editar rol'),
        actionEnabledDisabled(handleDialogStatus),
      ]
    })
  }, [setRoles, handleViewRecord, handleEditRecord, handleDialogStatus])

  const removeDetailParam = useCallback(() => {
    setSearchParams(prev => {
      prev.delete('detail')
      return prev
    }, { replace: true })
  }, [setSearchParams])

  const handleOpenFilter = useCallback(() => {
    slideRoleFilterAction(removeDetailParam)
  }, [removeDetailParam])

  const handleCloseSlide = useCallback(() => {
    slideRoleCloseAction(removeDetailParam)
  }, [removeDetailParam])

  // ============================================================
  // 9. SIDE EFFECTS (REACTIVE)
  // ============================================================
  // Sincronizar selectedRoleId con roleId de la URL
  useEffect(() => {
    if (urlRoleId !== null) {
      setSelectedRoleId(urlRoleId)
    }
  }, [urlRoleId])

  // Abrir slide de detalle cuando existe 'roleId'
  useEffect(() => {
    if (urlRoleId) slideRoleDetailAction()
  }, [urlRoleId])

  // Sincronizar estado de carga con query
  useEffect(() => {
    setLoadingTable(rolesQuery.isFetching)
  }, [rolesQuery.isFetching, setLoadingTable])

  // Manejar errores de la query
  useEffect(() => {
    if (axios.isAxiosError(rolesQuery.error)) {
      setErrorBack(rolesQuery.error)
    }
  }, [rolesQuery.error, setErrorBack])

  // Limpiar filtros cuando se deseleccionan todos
  useEffect(() => {
    if (hasInitializedFilters.current && 
        previousFilterSelected.current && 
        !controlFilterSelected) {
      
      setQueryParams({ ...initialQueryParamsRole, search: search || '' })
      
      setSearchParams(prev => {
        const newParams = new URLSearchParams()
        const pageValue = prev.get('page')
        const searchValue = prev.get('search')
        
        if (pageValue) newParams.set('page', pageValue)
        if (searchValue) newParams.set('search', searchValue)
        
        return newParams
      }, { replace: true })
    }
    
    previousFilterSelected.current = controlFilterSelected
  }, [controlFilterSelected, setQueryParams, setSearchParams, search])

  useEffect(() => {
    setMessageDialogAlert(messageAlertEnableDisabled(
      roleQuery.data?.recordStatus?.status ?? false, 
      messages.role, 
      'RL_STATUS'
    ))
  }, [setMessageDialogAlert, roleQuery.data])

  useEffect(() => {
    if (mutationUpdateStatusRoleForm.isSuccess) {
      dialogEnableDisable.current?.closeDialog()
    }
  }, [mutationUpdateStatusRoleForm.isSuccess])

  // ============================================================
  // 10. LIFECYCLE & CLEANUP
  // ============================================================
  // Ejecutar configuración inicial
  useEffect(() => { 
    handleTableActions()  
  }, [handleTableActions])

  // ============================================================
  // 11. RENDER
  // ============================================================
  return (
    <>
      <h1 
        data-eit-font="primary"
        data-eit-font-size="x7"
        data-eit-color="text"
        data-eit-font-weight="900"
        data-eit-mt="0"
        data-eit-mb="2"
      >
        {breadcrumb}
      </h1>

      <ListSearch
        btnNewRecord="Nuevo" 
        searchPlaceholder="Buscar por nombre"
        input={search}
        btnDownload={{
          loading: false,
          isDisabled: false,
          active: true
        }}
        onNewRecord={handleNewRecord}
        onInputSearch={handleInputSearch}
        onPressEnter={handlePressEnter}
        onDownloadRecords={handleDownloadRecords}
        onSlideFilter={handleOpenFilter}
      />

      <Table
        loading={loadingTable}
        sort={roles.sort}
        columns={roles.columns}
        data={filterTable}
        actions={roles.actions}
        skeleton={controlLoadingTable}
        onUpdateSort={handleUpdateSort}
      >
        <Paginator
          data={handleTablePaginator}
          onValueChange={handleUpdatePaginator}
        />
      </Table>

      <Detail
        slide={slideFilter}
        slideSmall={true}
        onSlideChange={handleCloseSlide}
        title={
          <h3
            data-eit-font="primary" 
            data-eit-font-size="x5" 
            data-eit-color="text" 
            data-eit-font-weight="900"
            data-eit-my="0"
          >
            <FaIcon 
              name="sliders" 
              data-eit-color="tertiary"
              data-eit-ms="2"
            />
            Filtros
          </h3>
        }
        footer={
          <div data-eit-display="flex">
            <Button
              type="button"
              data-eit-w="100"
              data-eit-variant="primary"
              text="Filtrar contenido"
              loadingText="Filtrando..."
              isDisabled={!controlFilterSelected || roleQuery.isFetching}
              loading={roleQuery.isFetching}
              onEmitEvent={handleFilterContent}
            />
          </div>
        }
      >
        <Suspense fallback="">
          <Filters
            elements={filterElements}
            onSelected={() => {}}
          />
        </Suspense>
      </Detail>

      <Detail
        detailById={true}
        slide={slideDetail}
        record={roleQuery.data}
        loading={roleQuery.isFetching}
        onSlideChange={handleCloseSlide}
        title={
          <>
            <h3 
              data-eit-font="primary" 
              data-eit-font-size="x5" 
              data-eit-color="text" 
              data-eit-font-weight="900"
              className="my-0"
            >
              Detalle del rol
            </h3>
            <div data-eit-display='flex'>
              <Badge
                text={roleQuery.data?.recordStatus.name}
                className={`${roleQuery.data?.recordStatus.className} eit-font__size--x2`}
              />
            </div>       
          </>
        }
      >
        <RoleDetail 
          record={roleQuery.data} 
        />
      </Detail>

      <EnableDisable
        ref={dialogEnableDisable}
        data={controlEnableDisableData}
        onSubmit={handleEnableDisableRecord}
        customRecord={{
          icon: "users",
          title: roleQuery.data ? roleQuery.data.name : '',
          subtitle: roleQuery.data ? roleQuery.data.description : ''
        }}
        children={roleQuery.data?.phantomKey.status === true && (
          <>
          <h3 
            data-eit-mt="3" 
            data-eit-mb="1"
            data-eit-color="blue"
            data-eit-font-size="x4"
          >
            Antes de continuar
          </h3>
          <div 
            data-eit-p="3"
            data-eit-border="all"
            data-eit-border-color="blue"
            data-eit-border-radius="x3"
          >
            <p 
              data-eit-mt="0" 
              data-eit-color="text-soft"
              data-eit-font-size="x2"
            >
              Existen <strong data-eit-color="text">{roleQuery.data?.totalUsers} usuarios</strong> en este rol. Debes asignarle uno nuevo.
            </p>
            <Select
              data={controlCurrentDisableRole}
              selected={selectedRole}
              onValueChange={handleSelectedRole}
              isDisabled={selectRoleUser.isFetching}
            />
          </div>
          </>
        )
        }
      />

      <Toast 
        ref={toastRef} 
        data={toast} 
        position="bottom" 
        visible={5000} 
      />

    </>
  )
}
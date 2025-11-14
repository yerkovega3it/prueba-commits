import { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react'
import axios from 'axios'
import { useQuery, useMutation, useSuspenseQueries, useQueryClient } from '@tanstack/react-query'
import { useCurrentBreadcrumb, useFilters } from '@/hooks'
import { Filters, ListSearch, FaIcon, EnableDisable } from '@/components'
import { useNavigate, useSearchParams } from "react-router-dom"
import { utils, Table, Paginator, Detail, Button, Toast,
  type FilterElement, 
  type SelectFilter, 
  type RangeFilter, 
  type DateFilter, 
  type SwitchFilter,
  type SelectOption,
  type TablePaginator,
  type TableSort,
  type ToastCore,
  type ToastExpose
} from 'uikit-3it-react'
import { 
  getUsersAction, 
  getUserByIdAction,
  slideUserFilterAction, 
  slideUserDetailAction, 
  slideUserCloseAction,
  getSelectStatusAction,
  getSelectRoleUserAction,
  mutationUpdateStatusUserFormAction,
} from '@/actions'
import { useShallow } from 'zustand/react/shallow'
import { useStoreUsers } from '@/stores'
import type { User, UserFilters, UserStatus, EnableDisableExpose } from '@/interfaces'
import messages from '@/messages/messages'

import { 
  dateFilterBase,
  rangeFilterBase,
  switchFilterBase,
  initialFiltersUser,
  initialQueryParamsUser
} from '@/factories'

//Exclusive Components
import UserDetail from '@/components/users/UserDetail'

//Utils
const { actionView, actionEdit, actionEnabledDisabled } = utils.createAction<User>()
const { sortTable } = utils.createTable()
const {
  messageAlertEnableDisabled,
  messageToastEnableDisabled
} = utils.createMessage()


export default function UsersListPage() {
  // ============================================================
  // 1. ROUTING & NAVIGATION
  // ============================================================
  const breadcrumb = useCurrentBreadcrumb()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const toastRef = useRef<ToastExpose>(null)
  
  const urlUserId = useMemo(() => {
    const idParam = searchParams.get('detail')
    return idParam ? Number(idParam) : null
  }, [searchParams])

  // ============================================================
  // 2. LOCAL STATE
  // ============================================================
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [filters, setFilters] = useState<UserFilters>({ ...initialFiltersUser })
  const [selectedUserId, setSelectedUserId] = useState<number | null>(urlUserId)
  const hasInitializedFilters = useRef(false)
  const previousFilterSelected = useRef<boolean | null>(null)
  const dialogEnableDisable = useRef<EnableDisableExpose>(null)
  const [toast, setToast] = useState<ToastCore>({ variant: 'info', title: '', message: '', code: '' })

  // ============================================================
  // 3. GLOBAL STATE (STORES)
  // ============================================================
  const {
    users,
    setUsers,
    loadingTable,
    setLoadingTable,
    slideFilter,
    slideDetail,
    setErrorBack,
    queryParams,
    setQueryParams,
    errorBack,
    messageDialogAlert,
    setMessageDialogAlert
  } = useStoreUsers(
    useShallow((state) => ({
      users: state.users,
      setUsers: state.setUsers,
      loadingTable: state.loadingTable,
      setLoadingTable: state.setLoadingTable,
      slideFilter: state.slideFilter,
      slideDetail: state.slideDetail,
      setErrorBack: state.setErrorBack,
      queryParams: state.queryParams,
      setQueryParams: state.setQueryParams,
      errorBack: state.errorBack,
      messageDialogAlert: state.messageDialogAlert,
      setMessageDialogAlert: state.setMessageDialogAlert,
    }))
  )

  // ============================================================
  // 4. SERVER STATE (QUERIES)
  // ============================================================
  const queryClient = useQueryClient()

  const [selectStatus, selectRoleUser] = useSuspenseQueries({
    queries: [
      {queryKey: ['selectorStatus'], queryFn: () => getSelectStatusAction(), staleTime: 30_000},
      {queryKey: ['selectorRoleUser'], queryFn: () => getSelectRoleUserAction(), staleTime: 30_000}
    ]
  })
  
  const usersQuery = useQuery({
    queryKey: ['users', queryParams],
    queryFn: () => getUsersAction(queryParams),
    staleTime: 30_000
  })
  
  const userQuery = useQuery({
    queryKey: ['user', selectedUserId],
    queryFn: () => getUserByIdAction(selectedUserId as number),
    enabled: selectedUserId != null,
    staleTime: 30_000
  })

  const mutationUpdateStatusUserForm = useMutation({
    mutationFn: (payload: UserStatus) => mutationUpdateStatusUserFormAction(payload),
    onSuccess: async () => {
      handleToastShow()
      await queryClient.invalidateQueries({ queryKey: ['users'] })
      await queryClient.invalidateQueries({ queryKey: ['user'] })
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
    return selectStatus.data.data.length > 0 && selectRoleUser.data.data.length > 0
  }, [selectStatus.data.data.length, selectRoleUser.data.data.length])

  // Elementos de filtro (dependen de selectores y estado local)
  const filterElements = useMemo<FilterElement[]>(() => {
    const status: SelectFilter = {
      ...selectStatus.data,
      multiple: false,
      selected: filters.status,
      handle: (opt) => setFilters((prev: UserFilters) => ({ ...prev, status: opt }))
    }

    const roleUser: SelectFilter = {
      ...selectRoleUser.data,
      multiple: false,
      selected: filters.role,
      handle: (opt) => setFilters((prev: UserFilters) => ({ ...prev, role: opt }))
    }

    const date: DateFilter = {
      ...dateFilterBase,
      placeholder: 'dd/mm/aaaa',
      input: filters.dateFilter,
      handle: (date) => setFilters((prev: UserFilters) => ({ ...prev, dateFilter: date }))
    }

    const range: RangeFilter = {
      ...rangeFilterBase,
      start: {
        ...rangeFilterBase.start,
        placeholder: 'dd/mm/aaaa',
        input: filters.startKey,
        maxDate: filters.endKey ?? rangeFilterBase.start.maxDate,
        handle: (date) => setFilters((prev: UserFilters) => ({ ...prev, startKey: date }))
      },
      end: {
        ...rangeFilterBase.end,
        placeholder: 'dd/mm/aaaa',
        input: filters.endKey,
        minDate: filters.startKey ?? rangeFilterBase.end.minDate,
        handle: (date) => setFilters((prev: UserFilters) => ({ ...prev, endKey: date }))
      }
    }

    const enabled: SwitchFilter = {
      ...switchFilterBase,
      input: filters.switch ?? false,
      handle: (value) => setFilters((prev: UserFilters) => ({ ...prev, switch: value }))
    }
    
    return [status, roleUser, date, range, enabled]
  }, [selectStatus.data, selectRoleUser.data, filters])

  // Control de si hay filtros seleccionados
  const controlFilterSelected = useMemo(() => {
    return filterElements.some((filter) => {
      if (filter.type === "select") {
        if (filter.multiple) return !!filter.selected?.length
        return !!filter.selected
      }
      if (filter.type === "switch") return !!filter.input
      if (filter.type === "date") return !!filter.input
      if (filter.type === "range") return !!filter.start?.input || !!filter.end?.input
      return false
    })
  }, [filterElements])

  // Datos de paginación para la tabla
  const handleTablePaginator: TablePaginator = useMemo(() => {
    if (!usersQuery.data) return { total: 0, finalPage: 1, currentPage: 1 }
    return {
      total: usersQuery.data.meta.total,
      finalPage: usersQuery.data.meta.finalPage,
      currentPage: usersQuery.data.meta.currentPage
    }
  }, [usersQuery.data])

  // Configuración de skeleton de carga
  const controlLoadingTable = useMemo(() => {
    return { row: 8, column: users.columns.length }
  }, [users.columns.length])
  
  // Tabla filtrada y ordenada
  const filterTable = useMemo(() => {
    return sortTable(users?.sort, usersQuery.data?.users || [])
  }, [usersQuery.data?.users, users?.sort])

  const controlEnableDisableData = useMemo(() => {
    return {
      record: userQuery.data ?? null,
      errorBack: errorBack,
      loading: userQuery.isFetching,
      loadingBtn: mutationUpdateStatusUserForm.isPending,
      disabledSubmit: mutationUpdateStatusUserForm.isPending,
      messageAlert: { ...messageDialogAlert }
    }
  }, [userQuery.data, errorBack, userQuery.isFetching, messageDialogAlert, mutationUpdateStatusUserForm.isPending])

  // ============================================================
  // 7. INITIALIZATION EFFECTS
  // ============================================================
  // Inicializar filtros desde URL cuando los selectores estén listos (solo una vez)
  useEffect(() => {
    if (!hasInitializedFilters.current && selectorsReady) {
      // Cargar filtros desde URL hacia el estado local
      mapRouteToFilters(filterElements, setFilters)
      hasInitializedFilters.current = true
      
      // Sincronizar queryParams iniciales desde searchParams para el backend
      const statusValue = searchParams.get('status') === 'true' ? true : searchParams.get('status') === 'false' ? false : null
      const roleValue = searchParams.get('role') ? parseInt(searchParams.get('role')!) : null
      const pageValue = searchParams.get('page') ? parseInt(searchParams.get('page')!) - 1 : 0
      const searchValue = searchParams.get('search') || ''
      
      setQueryParams({
        page: pageValue,
        size: queryParams.size,
        sort: queryParams.sort,
        search: searchValue,
        roleId: roleValue,
        status: statusValue
      })
    }
  }, [selectorsReady, filterElements, mapRouteToFilters, selectStatus.data.data.length, selectRoleUser.data.data.length, searchParams, queryParams.size, queryParams.sort, setQueryParams])

  // ============================================================
  // 8. CALLBACKS & HANDLERS
  // ============================================================
  const handleToastShow = useCallback(() => {
    setToast(messageToastEnableDisabled(
      messages.user,
      !userQuery.data?.recordStatus?.status,
      !!errorBack
    ))
    toastRef.current?.handleShowToast()
  }, [errorBack, setToast, userQuery.data])

  // Aplicar filtros (click en botón "Filtrar")
  const handleFilterContent = useCallback(() => {
    try {
      // Actualizar URL con page=1 y filtros seleccionados
      mapFiltersToRoute(filterElements, setFilters, true) // true = resetear page a 1
      
      // Resetear paginación en el store
      setUsers({ paginator: { ...users.paginator, currentPage: 1 } })
      
      // Convertir filtros locales a queryParams para el backend
      const statusValue = filters.status ? Boolean((filters.status as SelectOption).status) : null
      const roleValue = (filters.role as SelectOption)?.id || null
      
      setQueryParams({
        page: 0, // Backend usa 0-indexed
        size: queryParams.size,
        sort: queryParams.sort,
        search: search || '',
        roleId: roleValue,
        status: statusValue
      })
    } catch (error) {
      console.error('Error applying filters:', error)
    } 
  }, [filterElements, mapFiltersToRoute, filters.status, filters.role, search, queryParams.size, queryParams.sort, setQueryParams, setUsers, users.paginator])

  // Handlers de búsqueda
  const handleInputSearch = (output: string) => {
    setSearch(output.trim())
  }
  
  const handlePressEnter = useCallback(() => {
    setFilters((prev: UserFilters) => ({ ...prev, search: search, page: 1 }))
    setUsers({ paginator: { ...users.paginator, currentPage: 1 } })
    setQueryParams({ search, page: 0 })
    setSearchParams(prev => {
      if (search) prev.set('search', String(search))
      else prev.delete('search')
      return prev
    }, { replace: true })
  }, [search, setUsers, users.paginator, setQueryParams, setSearchParams])

  // Handlers de paginación
  const handleUpdatePaginator = useCallback((page: number): void => {
    const zeroBased = Math.max(0, page - 1)
  
    // Actualizar URL con el nuevo page (1-indexed para usuario)
    setSearchParams(prev => {
      prev.set('page', String(page))
      return prev
    }, { replace: true })

    // Actualizar queryParams para backend (0-indexed)
    setQueryParams({ page: zeroBased })
  }, [setSearchParams, setQueryParams])

  // Handlers de tabla
  const handleUpdateSort = useCallback((newSort: TableSort) => {
    setUsers({ sort: newSort })
  }, [setUsers])

  // Handlers de acciones de registros
  const handleDownloadRecords = async () => {
    try {
      console.log('Descargando registros...')
    } catch (error) {
      console.error(error)
    }
  }

  const handleNewRecord = useCallback(() => {
    navigate('/users/new')
  },[navigate])

  const handleViewRecord = useCallback((record: User) => {
    setSearchParams(prev => {
      prev.set('detail', String(record.phantomKey.id))
      return prev
    }, { replace: true })
  }, [setSearchParams])

  const handleEditRecord = useCallback((record: User) => {
    navigate(`/users/edit/${record.phantomKey.id}`)
  },[navigate])

  const handleDialogStatus = useCallback((record: User) => {
    // Limpiar previos
    setErrorBack(null)

    // Actualizar el userId para userQuery
    setSelectedUserId(record.phantomKey.id)
    
    // Abrir el diálogo
    dialogEnableDisable.current?.showDialog()
  },[setSelectedUserId, setErrorBack])

  const handleEnableDisableRecord = useCallback(async () => {

    const data_ = {
      id: Number(selectedUserId),
      status: !userQuery.data?.recordStatus.status
    }
    await mutationUpdateStatusUserForm.mutateAsync(data_)

  },[selectedUserId, userQuery.data, mutationUpdateStatusUserForm])

  const handleTableActions = useCallback(() => {
    setUsers({
      actions: [
        actionView(handleViewRecord, 'Ver usuario'),
        actionEdit(handleEditRecord, 'Editar usuario'),
        actionEnabledDisabled(handleDialogStatus),
      ]
    })
  }, [setUsers, handleViewRecord, handleEditRecord, handleDialogStatus])

  const removeDetailParam = useCallback(() => {
    setSearchParams(prev => {
      prev.delete('detail')
      return prev
    }, { replace: true })
  }, [setSearchParams])

  const handleOpenFilter = useCallback(() => {
    slideUserFilterAction(removeDetailParam)
  }, [removeDetailParam])

  const handleCloseSlide = useCallback(() => {
    slideUserCloseAction(removeDetailParam)
  }, [removeDetailParam])

  // ============================================================
  // 9. SIDE EFFECTS (REACTIVE)
  // ============================================================
  // Sincronizar selectedUserId con userId de la URL
  useEffect(() => {
    if (urlUserId !== null) {
      setSelectedUserId(urlUserId)
    }
  }, [urlUserId])

  // Abrir slide de detalle cuando existe 'userId'
  useEffect(() => {
    if (urlUserId) slideUserDetailAction()
  }, [urlUserId])

  // Sincronizar estado de carga con query
  useEffect(() => {
    setLoadingTable(usersQuery.isFetching)
  }, [usersQuery.isFetching, setLoadingTable])

  // Manejar errores de la query
  useEffect(() => {
    if (axios.isAxiosError(usersQuery.error)) {
      setErrorBack(usersQuery.error)
    }
  }, [usersQuery.error, setErrorBack])

  // Limpiar filtros cuando se deseleccionan todos
  useEffect(() => {
    if (hasInitializedFilters.current && 
        previousFilterSelected.current && 
        !controlFilterSelected) {
      
      setQueryParams({ ...initialQueryParamsUser, search: search || '' })
      
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
      userQuery.data?.recordStatus?.status ?? false, 
      messages.user, 
      'USR_STATUS'
    ))
  }, [setMessageDialogAlert, userQuery.data])

  useEffect(() => {
    if (mutationUpdateStatusUserForm.isSuccess) {
      dialogEnableDisable.current?.closeDialog()
    }
  }, [mutationUpdateStatusUserForm.isSuccess])


  // ============================================================
  // 10. LIFECYCLE & CLEANUP
  // ============================================================
  // Ejecutar configuración inicial
  useEffect(() => { 
    handleTableActions()  
  }, [handleTableActions])

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
        sort={users.sort}
        columns={users.columns}
        data={filterTable}
        actions={users.actions}
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
            <FaIcon name="sliders" 
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
              isDisabled={!controlFilterSelected || usersQuery.isFetching}
              loading={usersQuery.isFetching}
              onEmitEvent={handleFilterContent}
            />
          </div>
        }
      >
      <Suspense fallback=''>
        <Filters
          elements={filterElements}
          onSelected={() => {}}
        />
      </Suspense>

      </Detail>

      <Detail
        detailById={true}
        slide={slideDetail}
        record={userQuery.data}
        loading={userQuery.isFetching}
        onSlideChange={handleCloseSlide}
        title={
          <h3 
            data-eit-font="primary" 
            data-eit-font-size="x5" 
            data-eit-color="text" 
            data-eit-font-weight="900"
            className="my-0">
            Detalle del usuario
          </h3>
        }
      >
        <UserDetail 
          record={userQuery.data} 
        />
      </Detail>

      <EnableDisable
        ref={dialogEnableDisable}
        data={controlEnableDisableData}
        onSubmit={handleEnableDisableRecord}
        customRecord={{
          icon: "circleUser",
          title: userQuery.data ? userQuery.data.name : '',
          subtitle: userQuery.data ? userQuery.data.identification : ''
        }}
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
import { useState, useEffect, useMemo, useCallback, useRef, Suspense } from 'react'
import axios from 'axios'
import { useQuery, useMutation, useSuspenseQueries, useQueryClient } from '@tanstack/react-query'
import { useCurrentBreadcrumb, useFilters } from '@/hooks'
import {ListSearch, FaIcon, EnableDisable } from '@/components'
import { useNavigate, useSearchParams } from "react-router-dom"
import { utils, Table, Paginator, Detail, Button, Toast, Filters,
  type FilterElement, 
  type SelectFilter, 
  type RangeFilter, 
  type DateFilter, 
  type SwitchFilter,
  type TablePaginator,
  type TableSort,
  type ToastCore,
  type ToastExpose
} from 'uikit-3it-react'
import { 
  getExamplesAction, 
  getExampleByIdAction,
  slideExampleFilterAction, 
  slideExampleDetailAction, 
  slideExampleCloseAction,
  getSelectStatusAction,
  getSelectRoleUserAction,
  getSelectCountryAction,
  mutationUpdateStatusExampleFormAction,
} from '@/actions'
import { useShallow } from 'zustand/react/shallow'
import { useStoreExamples } from '@/stores'
import type { Example, ExampleFilters, ExampleStatus, EnableDisableExpose } from '@/interfaces'
import messages from '@/messages/messages'

import { 
  dateFilterBase,
  rangeFilterBase,
  switchFilterBase,
  initialFiltersExample,
  initialQueryParamsExample
} from '@/factories'

//Exclusive Components
import ExampleDetail from '@/components/examples/ExampleDetail'

//Utils
const { actionView, actionEdit, actionEnabledDisabled } = utils.createAction<Example>()
const { sortTable } = utils.createTable()
const {
  messageAlertEnableDisabled,
  messageToastEnableDisabled
} = utils.createMessage()


export default function ExamplesListPage() {
  // ============================================================
  // 1. ROUTING & NAVIGATION
  // ============================================================
  const breadcrumb = useCurrentBreadcrumb()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const toastRef = useRef<ToastExpose>(null)
  
  const urlExampleId = useMemo(() => {
    const idParam = searchParams.get('detail')
    return idParam ? Number(idParam) : null
  }, [searchParams])

  // ============================================================
  // 2. LOCAL STATE
  // ============================================================
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [filters, setFilters] = useState<ExampleFilters>({ ...initialFiltersExample })
  const [selectedExampleId, setSelectedExampleId] = useState<number | null>(urlExampleId)
  const hasInitializedFilters = useRef(false)
  const previousFilterSelected = useRef<boolean | null>(null)
  const dialogEnableDisable = useRef<EnableDisableExpose>(null)
  const [toast, setToast] = useState<ToastCore>({ variant: 'info', title: '', message: '', code: '' })

  // ============================================================
  // 3. GLOBAL STATE (STORES)
  // ============================================================
  const {
    examples,
    setExamples,
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
  } = useStoreExamples(
    useShallow((state) => ({
      examples: state.examples,
      setExamples: state.setExamples,
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

  const [selectStatus, selectRoleUser, selectCountry] = useSuspenseQueries({
    queries: [
      {queryKey: ['selectorStatus'], queryFn: () => getSelectStatusAction(), staleTime: 30_000},
      {queryKey: ['selectorRoleUser'], queryFn: () => getSelectRoleUserAction(), staleTime: 30_000},
      {queryKey: ['selectorCountry'], queryFn: () => getSelectCountryAction(), staleTime: 30_000}
    ]
  })
  
  const examplesQuery = useQuery({
    queryKey: ['examples', queryParams],
    queryFn: () => getExamplesAction(queryParams),
    staleTime: 30_000
  })
  
  const exampleQuery = useQuery({
    queryKey: ['example', selectedExampleId],
    queryFn: () => getExampleByIdAction(selectedExampleId as number),
    enabled: selectedExampleId != null,
    staleTime: 30_000
  })

  const mutationUpdateStatusExampleForm = useMutation({
    mutationFn: (payload: ExampleStatus) => mutationUpdateStatusExampleFormAction(payload),
    onSuccess: async () => {
      handleToastShow()
      await queryClient.invalidateQueries({ queryKey: ['examples'] })
      await queryClient.invalidateQueries({ queryKey: ['example'] })
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
      handle: (opt) => setFilters((prev: ExampleFilters) => ({ ...prev, status: opt }))
    }

    const roleUser: SelectFilter = {
      ...selectRoleUser.data,
      multiple: false,
      selected: filters.role,
      handle: (opt) => setFilters((prev: ExampleFilters) => ({ ...prev, role: opt }))
    }

    const country: SelectFilter = {
      ...selectCountry.data,
      multiple: true,
      selected: filters.country,
      handle: (opt) => setFilters((prev: ExampleFilters) => ({ ...prev, country: opt }))
    }

    const date: DateFilter = {
      ...dateFilterBase,
      key: 'birthday',
      filter: 'Cumpleaños',
      placeholder: 'dd/mm/aaaa',
      input: filters.birthday,
      handle: (date) => setFilters((prev: ExampleFilters) => ({ ...prev, birthday: date }))
    }

    const range: RangeFilter = {
      ...rangeFilterBase,
      filter: 'Fecha creación',
      start: {
        ...rangeFilterBase.start,
        key: 'startCreateDate',
        placeholder: 'dd/mm/aaaa',
        input: filters.startDate,
        maxDate: filters.endDate ?? rangeFilterBase.start.maxDate,
        handle: (date) => setFilters((prev: ExampleFilters) => ({ ...prev, startDate: date }))
      },
      end: {
        ...rangeFilterBase.end,
        key: 'endCreateDate',
        placeholder: 'dd/mm/aaaa',
        input: filters.endDate,
        minDate: filters.startDate ?? rangeFilterBase.end.minDate,
        handle: (date) => setFilters((prev: ExampleFilters) => ({ ...prev, endDate: date }))
      }
    }

    const enabled: SwitchFilter = {
      ...switchFilterBase,
      input: filters.switch ?? false,
      handle: (value) => setFilters((prev: ExampleFilters) => ({ ...prev, switch: value }))
    }
    
    return [status, roleUser, country, date, range, enabled]
  }, [selectStatus.data, selectRoleUser.data, selectCountry.data, filters])

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
    if (!examplesQuery.data) return { total: 0, finalPage: 1, currentPage: 1 }
    return {
      total: examplesQuery.data.meta.total,
      finalPage: examplesQuery.data.meta.finalPage,
      currentPage: examplesQuery.data.meta.currentPage
    }
  }, [examplesQuery.data])

  // Configuración de skeleton de carga
  const controlLoadingTable = useMemo(() => {
    return { row: 8, column: examples.columns.length }
  }, [examples.columns.length])
  
  // Tabla filtrada y ordenada
  const filterTable = useMemo(() => {
    return sortTable(examples?.sort, examplesQuery.data?.examples || [])
  }, [examplesQuery.data?.examples, examples?.sort])

  const controlEnableDisableData = useMemo(() => {
    return {
      record: exampleQuery.data ?? null,
      errorBack: errorBack,
      loading: exampleQuery.isFetching,
      loadingBtn: mutationUpdateStatusExampleForm.isPending,
      disabledSubmit: mutationUpdateStatusExampleForm.isPending,
      messageAlert: { ...messageDialogAlert }
    }
  }, [exampleQuery.data, errorBack, exampleQuery.isFetching, messageDialogAlert, mutationUpdateStatusExampleForm.isPending])

  // ============================================================
  // 7. INITIALIZATION EFFECTS
  // ============================================================
  // Inicializar filtros desde URL cuando los selectores estén listos (solo una vez)
  useEffect(() => {
    if (!hasInitializedFilters.current && selectorsReady) {
      // Cargar filtros desde URL hacia el estado local
      mapRouteToFilters(filterElements, setFilters)
      hasInitializedFilters.current = true
 
      setQueryParams({
        page: searchParams.get('page') ? Number(searchParams.get('page')!) - 1 : 0,
        size: queryParams.size,
        sort: queryParams.sort,
        search: searchParams.get('search') || null,
        roleId: Number(searchParams.get('role')!) || null,
        status: searchParams.get('status') === 'true' ? true : searchParams.get('status') === 'false' ? false : null,
        countryIds: searchParams.get('country') || null,
        birthDate: searchParams.get('birthday') || null,
        createdAtStart: searchParams.get('startCreateDate') || null,
        createdAtEnd: searchParams.get('endCreateDate') || null,
        switchExample: searchParams.get('switch') === 'true' ? true : null
      })
    }
  }, [selectorsReady, filterElements, mapRouteToFilters, selectStatus.data.data.length, selectRoleUser.data.data.length, searchParams, queryParams.size, queryParams.sort, setQueryParams])

  // ============================================================
  // 8. CALLBACKS & HANDLERS
  // ============================================================
  const handleToastShow = useCallback(() => {
    setToast(messageToastEnableDisabled(
      messages.example,
      !exampleQuery.data?.recordStatus?.status,
      !!errorBack
    ))
    toastRef.current?.handleShowToast()
  }, [errorBack, setToast, exampleQuery.data])

  // Aplicar filtros (click en botón "Filtrar")
  const handleFilterContent = useCallback(() => {
    try {
      mapFiltersToRoute(filterElements, setFilters, true) // true = resetear page a 1
      
      // Resetear paginación en el store
      setExamples({ paginator: { ...examples.paginator, currentPage: 1 } })
    } catch (error) {
      console.error('Error applying filters:', error)
    } 
  }, [filterElements, mapFiltersToRoute, setFilters, setExamples, examples.paginator])

  // Handlers de búsqueda
  const handleInputSearch = (output: string) => {
    setSearch(output.trim())
  }
  
  const handlePressEnter = useCallback(() => {
    setFilters((prev: ExampleFilters) => ({ ...prev, search: search, page: 1 }))
    setExamples({ paginator: { ...examples.paginator, currentPage: 1 } })
    setQueryParams({ search, page: 0 })
    setSearchParams(prev => {
      if (search) prev.set('search', String(search))
      else prev.delete('search')
      return prev
    }, { replace: true })
  }, [search, setExamples, examples.paginator, setQueryParams, setSearchParams])

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
    setExamples({ sort: newSort })
  }, [setExamples])

  // Handlers de acciones de registros
  const handleDownloadRecords = async () => {
    try {
      console.log('Descargando registros...')
    } catch (error) {
      console.error(error)
    }
  }

  const handleNewRecord = useCallback(() => {
    navigate('/examples/new')
  },[navigate])

  const handleViewRecord = useCallback((record: Example) => {
    setSearchParams(prev => {
      prev.set('detail', String(record.phantomKey.id))
      return prev
    }, { replace: true })
  }, [setSearchParams])

  const handleEditRecord = useCallback((record: Example) => {
    navigate(`/examples/edit/${record.phantomKey.id}`)
  },[navigate])

  const handleDialogStatus = useCallback((record: Example) => {
    // Limpiar previos
    setErrorBack(null)

    // Actualizar el exampleId para exampleQuery
    setSelectedExampleId(record.phantomKey.id)
    
    // Abrir el diálogo
    dialogEnableDisable.current?.showDialog()
  },[setSelectedExampleId, setErrorBack])

  const handleEnableDisableRecord = useCallback(async () => {

    const data_ = {
      id: Number(selectedExampleId),
      status: !exampleQuery.data?.recordStatus.status
    }
    await mutationUpdateStatusExampleForm.mutateAsync(data_)

  },[selectedExampleId, exampleQuery.data, mutationUpdateStatusExampleForm])

  const handleTableActions = useCallback(() => {
    setExamples({
      actions: [
        actionView(handleViewRecord, 'Ver example'),
        actionEdit(handleEditRecord, 'Editar example'),
        actionEnabledDisabled(handleDialogStatus),
      ]
    })
  }, [setExamples, handleViewRecord, handleEditRecord, handleDialogStatus])

  const removeDetailParam = useCallback(() => {
    setSearchParams(prev => {
      prev.delete('detail')
      return prev
    }, { replace: true })
  }, [setSearchParams])

  const handleOpenFilter = useCallback(() => {
    slideExampleFilterAction(removeDetailParam)
  }, [removeDetailParam])

  const handleCloseSlide = useCallback(() => {
    slideExampleCloseAction(removeDetailParam)
  }, [removeDetailParam])

  // ============================================================
  // 9. SIDE EFFECTS (REACTIVE)
  // ============================================================
  // Sincronizar selectedExampleId con exampleId de la URL
  useEffect(() => {
    if (urlExampleId !== null) {
      setSelectedExampleId(urlExampleId)
    }
  }, [urlExampleId])

  // Abrir slide de detalle cuando existe 'exampleId'
  useEffect(() => {
    if (urlExampleId) slideExampleDetailAction()
  }, [urlExampleId])

  // Sincronizar estado de carga con query
  useEffect(() => {
    setLoadingTable(examplesQuery.isFetching)
  }, [examplesQuery.isFetching, setLoadingTable])

  // Manejar errores de la query
  useEffect(() => {
    if (axios.isAxiosError(examplesQuery.error)) {
      setErrorBack(examplesQuery.error)
    }
  }, [examplesQuery.error, setErrorBack])

  // Limpiar filtros cuando se deseleccionan todos
  useEffect(() => {
    if (hasInitializedFilters.current && 
        previousFilterSelected.current && 
        !controlFilterSelected) {
      
      setQueryParams({ ...initialQueryParamsExample, search: search || '' })
      
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

  // Sincronizar queryParams con searchParams cuando cambian los filtros en la URL
  useEffect(() => {
    if (hasInitializedFilters.current) {
      setQueryParams({
        page: searchParams.get('page') ? Number(searchParams.get('page')!) - 1 : 0,
        size: queryParams.size,
        sort: queryParams.sort,
        search: searchParams.get('search') || null,
        roleId: Number(searchParams.get('role')!) || null,
        status: searchParams.get('status') === 'true' ? true : searchParams.get('status') === 'false' ? false : null,
        countryIds: searchParams.get('country') || null,
        birthDate: searchParams.get('birthday') || null,
        createdAtStart: searchParams.get('startCreateDate') || null,
        createdAtEnd: searchParams.get('endCreateDate') || null,
        switchExample: searchParams.get('switch') === 'true' ? true : null
      })
    }
  }, [searchParams, queryParams.size, queryParams.sort, setQueryParams])

  useEffect(() => {
    setMessageDialogAlert(messageAlertEnableDisabled(
      exampleQuery.data?.recordStatus?.status ?? false, 
      messages.example, 
      'EX_STATUS'
    ))
  }, [setMessageDialogAlert, exampleQuery.data])

  useEffect(() => {
    if (mutationUpdateStatusExampleForm.isSuccess) {
      dialogEnableDisable.current?.closeDialog()
    }
  }, [mutationUpdateStatusExampleForm.isSuccess])


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
        sort={examples.sort}
        columns={examples.columns}
        data={filterTable}
        actions={examples.actions}
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
              isDisabled={!controlFilterSelected || examplesQuery.isFetching}
              loading={examplesQuery.isFetching}
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
        record={exampleQuery.data}
        loading={exampleQuery.isFetching}
        onSlideChange={handleCloseSlide}
        title={
          <h3 
            data-eit-font="primary" 
            data-eit-font-size="x5" 
            data-eit-color="text" 
            data-eit-font-weight="900"
            className="my-0">
            Detalle del example
          </h3>
        }
      >
        <ExampleDetail 
          record={exampleQuery.data} 
        />
      </Detail>

      <EnableDisable
        ref={dialogEnableDisable}
        data={controlEnableDisableData}
        onSubmit={handleEnableDisableRecord}
        customRecord={{
          icon: "circleUser",
          title: exampleQuery.data ? exampleQuery.data.name : '',
          subtitle: exampleQuery.data ? exampleQuery.data.identification : ''
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

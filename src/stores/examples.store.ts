import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import type { Example, ExamplesState } from '@/interfaces'
import { 
  createTableData, 
  initialQueryParamsExample, 
  initialAlert, 
  initialExample, 
  initialExampleForm,
  initialFiltersExample
} from '@/factories'
import type { AlertsCore } from 'uikit-3it-react'

export const useStoreExamples = create<ExamplesState>()(
  devtools(subscribeWithSelector((set) => ({
  examples: createTableData<Example>(['ID', 'Nombre', 'RUT', 'Rol', 'Estado']),
  setExamples: (data) => set((state) => ({ examples: { ...state.examples, ...data, columns: state.examples.columns }})),
  example: { ...initialExample },
  setExample: (data) => set((state) => ({ example: { ...state.example, ...data }})),
  exampleForm: { ...initialExampleForm },
  setExampleForm: (data) => set((state) => ({ exampleForm: { ...state.exampleForm, ...data }})),

  defaultFilters: { ...initialFiltersExample },
  setDefaultFilters: (data) => set((state) => ({ defaultFilters: { ...state.defaultFilters, ...data }})),
  queryParams: { ...initialQueryParamsExample },
  setQueryParams: (params) => set((state) => ({ queryParams: { ...state.queryParams, ...params } })),

  //loading
  loadingTable: false,
  setLoadingTable: (value: boolean) => set(() => ({ loadingTable: value })),
  loadingDetail: false,
  setLoadingDetail: (value: boolean) => set(() => ({ loadingDetail: value })),

  //Detail
  slideFilter: false,
  setSlideFilter: (value: boolean) => set(() => ({ slideFilter: value })),
  slideDetail: false,
  setSlideDetail: (value: boolean) => set(() => ({ slideDetail: value })),

  //Message
  messageToast: {},
  setMessageToast: (data) => set(() => ({ messageToast: data })),
  messageAlert: { ...initialAlert },
  setMessageAlert: (data: AlertsCore) => set(() => ({ messageAlert: data })),
  messageDialogAlert: { ...initialAlert },
  setMessageDialogAlert: (data: AlertsCore) => set(() => ({ messageDialogAlert: data })),

  //Errors
  errorBack: null,
  setErrorBack: (error) => set(() => ({ errorBack: error })),
}))))

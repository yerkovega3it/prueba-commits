import axios from 'axios'
import { examplesApi, exampleByIdApi, exampleCreateApi, exampleUpdateApi } from "@/services"
import type { Example, ExampleQueryParams, ExampleForm, ExampleStatus } from '@/interfaces'
import { useStoreExamples } from '@/stores'
import { mapperExamples, mapperExample, mapperExampleForm, mapperExampleFormToPayload } from '@/mappers'
import { initialSort } from '@/factories'

const { setSlideFilter, setSlideDetail } = useStoreExamples.getState()
 
export interface ExamplesResponse {
  examples: Example[]
  meta: { total: number; finalPage: number; currentPage: number }
}

export async function getExamplesAction(params: ExampleQueryParams): Promise<ExamplesResponse> {
  const { setExamples } = useStoreExamples.getState()
  const dto = await examplesApi(params)
  const result = {
    examples: mapperExamples(dto.data),
    meta: {
      total: dto.meta.pagination.total,
      finalPage: dto.meta.pagination.pageCount,
      currentPage: dto.meta.pagination.page + 1,
    },
  }
  setExamples({ sort: { ...initialSort, keys: Object.keys(result.examples[0] || {}) } })
  return result
}

export const getExampleByIdAction = async (payload: string | number) => {
  const { setErrorBack } = useStoreExamples.getState()
  try {
    const dto = await exampleByIdApi(payload)
    const result = mapperExample(dto.data)
    return result
  } 
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const getExampleByIdFormAction = async (payload: string | number) => {
  const { setErrorBack } = useStoreExamples.getState()
  try {
    const dto = await exampleByIdApi(payload)
    const result = mapperExampleForm(dto.data)
    return result
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const mutationCreateExampleFormAction = async (form: ExampleForm) => {
  const { setErrorBack } = useStoreExamples.getState()
  try {
    const payload = mapperExampleFormToPayload(form)
    const { data } = await exampleCreateApi(payload)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const mutationUpdateExampleFormAction = async (form: ExampleForm) => {
  
  const { setErrorBack } = useStoreExamples.getState()
  try {
    const payload = mapperExampleFormToPayload(form)
    const { data } = await exampleUpdateApi(payload)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const mutationUpdateStatusExampleFormAction = async (payload: ExampleStatus) => {
  
  const { setErrorBack } = useStoreExamples.getState()
  try {
    const { data } = await exampleUpdateApi(payload)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export function slideExampleFilterAction (removeDetailParam?: () => void) {
  if (removeDetailParam) removeDetailParam()
    
  setSlideDetail(false)
  setSlideFilter(true)
}

export function slideExampleDetailAction () {
  setSlideFilter(false)
  setSlideDetail(true)
}

export function slideExampleCloseAction (removeDetailParam?: () => void) {
  const { slideDetail } = useStoreExamples.getState()
  if (slideDetail && removeDetailParam) removeDetailParam()

  setSlideFilter(false)
  setSlideDetail(false)
}

import axios from 'axios'
import { usersApi, userByIdApi, userCreateApi, userUpdateApi } from "@/services"
import type { User, UserQueryParams, UserForm, UserStatus } from '@/interfaces'
import { useStoreUsers } from '@/stores'
import { mapperUsers, mapperUser, mapperUserForm, mapperUserFormToPayload } from '@/mappers'
import { initialSort } from '@/factories'

const { setSlideFilter, setSlideDetail } = useStoreUsers.getState()
 
export interface UsersResponse {
  users: User[]
  meta: { total: number; finalPage: number; currentPage: number }
}

export async function getUsersAction(params: UserQueryParams): Promise<UsersResponse> {
  const { setUsers } = useStoreUsers.getState()
  const dto = await usersApi(params)
  const result = {
    users: mapperUsers(dto.data),
    meta: {
      total: dto.meta.pagination.total,
      finalPage: dto.meta.pagination.pageCount,
      currentPage: dto.meta.pagination.page + 1,
    },
  }
  setUsers({ sort: { ...initialSort, keys: Object.keys(result.users[0] || {}) } })
  return result
}

export const getUserByIdAction = async (payload: string | number) => {
  const { setErrorBack } = useStoreUsers.getState()
  try {
    const dto = await userByIdApi(payload)
    const result = mapperUser(dto.data)
    return result
  } 
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const getUserByIdFormAction = async (payload: string | number) => {
  const { setErrorBack } = useStoreUsers.getState()
  try {
    const dto = await userByIdApi(payload)
    const result = mapperUserForm(dto.data)
    return result
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const mutationCreateUserFormAction = async (form: UserForm) => {
  const { setErrorBack } = useStoreUsers.getState()
  try {
    const payload = mapperUserFormToPayload(form)
    const { data } = await userCreateApi(payload)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const mutationUpdateUserFormAction = async (form: UserForm) => {
  
  const { setErrorBack } = useStoreUsers.getState()
  try {
    const payload = mapperUserFormToPayload(form)
    const { data } = await userUpdateApi(payload)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export const mutationUpdateStatusUserFormAction = async (payload: UserStatus) => {
  
  const { setErrorBack } = useStoreUsers.getState()
  try {
    const { data } = await userUpdateApi(payload)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) setErrorBack(error)
  }
}

export function slideUserFilterAction (removeDetailParam?: () => void) {
  if (removeDetailParam) removeDetailParam()
    
  setSlideDetail(false)
  setSlideFilter(true)
}

export function slideUserDetailAction () {
  setSlideFilter(false)
  setSlideDetail(true)
}

export function slideUserCloseAction (removeDetailParam?: () => void) {
  const { slideDetail } = useStoreUsers.getState()
  if (slideDetail && removeDetailParam) removeDetailParam()

  setSlideFilter(false)
  setSlideDetail(false)
}
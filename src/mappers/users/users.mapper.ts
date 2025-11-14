import type { UserRaw, User, UserForm, UserPayload } from '@/interfaces'
import { utils } from 'uikit-3it-react'
import { createBadge } from '@/utils'

  //Utils
  const { 
    formatDate,
    formatRut,
    formatRutToBack
  } = utils.createFormat()

const { 
  changeRecordStatus, 
  changeBadgeGray 
} = createBadge()

function toFullName(first: string, last?: string | null): string {
  return [first, last?.trim()].filter(Boolean).join(' ')
}

export function mapperUsers(result: readonly UserRaw[]): User[]  {
  if (!Array.isArray(result)) return []
  return result.map(item => ({
    id: String(item.id),
    name: toFullName(item.firstName, item.lastName),
    identification: item.identification,
    role: item.role,
    recordStatus: changeRecordStatus(item.status),
    phantomKey: { id: item.id, url: 'https://www.google.com/', status: item.status }
  }))
}

export function mapperUser(result: UserRaw): User {
  return {
    id: String(result.id),
    name: `${result.firstName} ${result.lastName}`,
    email: result.email,
    identification: result.identification,
    phoneNumber: result.phoneNumber ? result.phoneNumber : 'S/T',
    role: changeBadgeGray(result.role),
    createdAt: result.createdAt ? formatDate(result.createdAt) : 'S/F',
    lastLogin: result.lastLogin ? formatDate(result.lastLogin) : 'S/F',
    loginViaSso: result.loginViaSso ?? false,
    recordStatus: changeRecordStatus(result.status),
    phantomKey: { id: result.id, url: 'https://www.google.com/', status: result.status }
  }
}

export function mapperUserForm(result: UserRaw): UserForm {
  return {
    id: result.id,
    email: result.email,
    firstName: result.firstName,
    lastName: result.lastName,
    phoneNumber: result.phoneNumber,
    identification: formatRut(result.identification),
    identificationTypeId: 1,
    roleId: { id: result.role.id, name: result.role.name }
  }
}

export function mapperUserFormToPayload(form: UserForm): UserPayload {
  return {
    id: form.id ?? null,
    email: form.email,
    firstName: form.firstName,
    lastName: form.lastName,
    phoneNumber: form.phoneNumber,
    identification: formatRutToBack(form.identification),
    identificationTypeId: 1,
    roleId: form.roleId?.id ?? null,
    loginViaSso: form.loginViaSso ?? false
  }
}
import type { Role, RoleForm, SubModuleRoleForm, RoleFilters, RoleQueryParams } from '@/interfaces'
import { initialFilters, initialQueryParams } from '@/factories'

export const initialFiltersRole: RoleFilters = {
  ...initialFilters,
  module: null,
  status: null
}

export const initialQueryParamsRole: RoleQueryParams = {
  ...initialQueryParams,
  subModuleId: null,
  status: null
}

export const initialRole: Role = {
  id: '',
  name: '',
  totalUsers: '',
  totalModules: '',
  description: '',
  subModules: [],
  recordStatus: { name: '', className: '', status: true },
  phantomKey: { id: 0, status: true }
}

export const initialRoleForm: RoleForm = {
  id: null,
  name: '',
  description: '',
  subModules: null
}

export const initialRoleFormModules: SubModuleRoleForm = {
  id: null,
  name: '',
  description: '',
  canRead: true,
  canCreate: true,
  canUpdate: true,
  canDelete: true
}
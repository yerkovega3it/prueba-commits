import type { Example, ExampleForm, ExampleFilters, ExampleQueryParams } from '@/interfaces'

export const initialFiltersExample: ExampleFilters = {
  page: 1,
  search: null,
  role: null,
  status: null,
  country: null,
  birthday: null,
  startDate: null,
  endDate: null,
  switch: null,
}

export const initialQueryParamsExample: ExampleQueryParams = {
  page: 0,
  size: 8,
  sort: 'createdAt,desc',
  search: null,
  roleId: null,
  status: null,
  countryIds: null,
  birthDate: null,
  createdAtStart: null,
  createdAtEnd: null,
  switchExample: null
}

export const initialExample: Example = {
  id: '',
  email: '',
  name: '',
  phoneNumber: '',
  identification: '',
  identificationTypeId: 1,
  role: { id: 0, name: '' },
  recordStatus: { name: '', className: '', status: false },
  phantomKey: { id: 0, url: '', status: false }
}

export const initialExampleForm: ExampleForm = {
  id: null,
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  identification: '',
  identificationTypeId: 1,
  roleId: null,
  loginViaSso: false
}

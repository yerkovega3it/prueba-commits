export interface RecordStatus {
  name: string
  className: string
  status: boolean
}

export interface PhantomKey {
  id: number
  status: boolean
}

export interface MetaDataBase {
  recordStatus: RecordStatus
  phantomKey: PhantomKey
}

export interface IdentificationData {
  identification: string
  identificationTypeId: number
}

export interface PersonalInfo {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  loginViaSso?: boolean
  createdAt?: string | null
  lastLogin?: string | null
}

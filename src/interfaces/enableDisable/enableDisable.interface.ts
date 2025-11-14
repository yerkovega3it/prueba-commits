import type { AxiosError } from 'axios'
import type { ErrorBack } from 'uikit-3it-react'
import type { icons } from '@/components/icons'

interface StatusEnableDisable {
  status: boolean
}

export interface RecordEnableDisable {
  recordStatus: StatusEnableDisable
  [key: string]: unknown
}

export interface EnableDisableData {
  record: RecordEnableDisable | null
  errorBack: AxiosError<ErrorBack> | null
  loading: boolean
  loadingBtn: boolean
  disabledSubmit: boolean
  messageAlert: Record<string, unknown>
}

export interface EnableDisableProps {
  data: EnableDisableData
  customRecord: CustomRecordEnableDisable
  children?: React.ReactNode | null
  onSubmit?: () => void
}

export interface EnableDisableExpose {
  showDialog: () => void
  closeDialog: () => void
}

export interface CustomRecordEnableDisable {
  icon?: keyof typeof icons
  title?: string
  subtitle?: string
}
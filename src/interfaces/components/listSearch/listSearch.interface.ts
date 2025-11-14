export interface ListSearchProps {
  input?: string
  searchPlaceholder?: string
  btnFilter?: boolean
  btnNewRecord?: string
  btnDownload?: {
    loading: boolean
    isDisabled: boolean,
    active: boolean
  }
  onNewRecord?: () => void
  onDownloadRecords?: () => void
  onSlideFilter?: () => void
  onInputSearch?: (value: string) => void
  onPressEnter?: () => void
}
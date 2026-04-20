import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";

export interface DashboardModalSortState {
  key: string | null;
  dir: "asc" | "desc" | null;
}

export interface ColumnDef<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface DashboardModalProps<T extends object> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  response: PaginatedResponse<T>;
  isLoading?: boolean;
  columns: ColumnDef<T>[];
  entityLabel?: string;
  searchPlaceholder?: string;
  search: string;
  onSearch: (value: string) => void;
  sort: DashboardModalSortState;
  onSort: (key: string) => void;
  onPageChange: (page: number) => void;
}

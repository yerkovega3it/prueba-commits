import DashboardModal, {
  type ColumnDef,
  type DashboardModalSortState,
} from "@/components/dashboard/shared/DashboardModal";
import type { PersonOnSite } from "@/constants/mockData";
import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";

const COLUMNS: ColumnDef<PersonOnSite>[] = [
  { key: "rut", label: "RUT", sortable: true },
  { key: "name", label: "Nombre", sortable: true },
  { key: "entryDate", label: "Fecha de entrada", sortable: true },
];

interface LiveOccupancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  response: PaginatedResponse<PersonOnSite>;
  isLoading?: boolean;
  search: string;
  onSearch: (value: string) => void;
  sort: DashboardModalSortState;
  onSort: (key: string) => void;
  onPageChange: (page: number) => void;
}

export default function LiveOccupancyModal({
  response,
  ...rest
}: LiveOccupancyModalProps) {
  return (
    <DashboardModal
      {...rest}
      title={`Personas en Faena (${response.meta.pagination.total})`}
      response={response}
      columns={COLUMNS}
      entityLabel="personas"
      searchPlaceholder="Buscar por nombre o RUT"
    />
  );
}

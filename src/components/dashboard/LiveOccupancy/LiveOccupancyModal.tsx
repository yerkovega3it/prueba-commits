import DashboardModal, {
  type ColumnDef,
  type DashboardModalSortState,
} from "@/components/dashboard/shared/DashboardModal";
import type { PersonOnSite } from "@/constants/mockData";
import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";

function StatusBadge({ estado }: { estado: PersonOnSite["estado"] }) {
  const isOnSite = estado === "En faena";
  return (
    <span
      className={`flex items-center gap-2 text-base font-normal ${
        isOnSite ? "text-success" : "text-critic"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full shrink-0 ${
          isOnSite ? "bg-success" : "bg-critic"
        }`}
      />
      {estado}
    </span>
  );
}

const COLUMNS: ColumnDef<PersonOnSite>[] = [
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "apellido", label: "Apellido", sortable: true },
  { key: "rut", label: "RUT", sortable: true },
  { key: "estado", label: "Estado", render: (row) => <StatusBadge estado={row.estado} /> },
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

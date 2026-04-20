import DashboardModal from "@/components/dashboard/shared/DashboardModal";
import type { DashboardModalSortState } from "@/interfaces/dashboard/dashboardModal.interface";
import type { PersonOnSite } from "@/constants/mockData";
import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import { PEOPLE_ON_SITE_COLUMNS } from "./constants";

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
      columns={PEOPLE_ON_SITE_COLUMNS}
      entityLabel="personas"
      searchPlaceholder="Buscar por RUT"
    />
  );
}

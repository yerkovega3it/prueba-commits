import DashboardCard from "./DashboardCard";
import DashboardLineChart from "@/components/charts/LineChart/LineChart";
import DashboardModal from "@/components/dashboard/shared/DashboardModal";
import Skeleton from "@/components/shared/Skeleton";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type {
  ColumnDef,
  DashboardModalSortState,
} from "@/interfaces/dashboard/dashboardModal.interface";
import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";

interface SummaryData {
  today: number | string;
  oneDay: number | string;
  threeDays: number | string;
  fiveDays: number | string;
  isLoading: boolean;
}

interface ListData<T> {
  response: PaginatedResponse<T>;
  isLoading: boolean;
}

interface ModalState {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  setPage: (page: number) => void;
  search: string;
  sort: DashboardModalSortState;
  handleSearch: (value: string) => void;
  handleSort: (key: string) => void;
  handleClose: () => void;
}

interface CardConfig<T> {
  icon: IconDefinition;
  title: string;
  counterLabel: string;
  counterTitle: string;
  modalTitlePrefix: string;
  entityLabel: string;
  searchPlaceholder?: string;
  columns: ColumnDef<T>[];
}

interface ExpiringItemsCardProps<T extends object> {
  summary: SummaryData;
  list: ListData<T>;
  modalState: ModalState;
  config: CardConfig<T>;
}

function ExpiringItemsCard<T extends object>({
  summary,
  list,
  modalState,
  config,
}: ExpiringItemsCardProps<T>) {
  const {
    today,
    oneDay,
    threeDays,
    fiveDays,
    isLoading: summaryLoading,
  } = summary;
  const { response, isLoading: listLoading } = list;
  const {
    isOpen,
    setIsOpen,
    setPage,
    search,
    sort,
    handleSearch,
    handleSort,
    handleClose,
  } = modalState;
  const {
    icon,
    title,
    counterLabel,
    counterTitle,
    modalTitlePrefix,
    entityLabel,
    searchPlaceholder,
    columns,
  } = config;
  return (
    <>
      <DashboardCard
        title={title}
        icon={icon}
        titleClassName="text-xl font-bold text-approved"
        contentClassName="flex flex-col md:flex-row items-center gap-3 h-full mt-3"
      >
        <div
          className="shrink-0 w-auto max-w-28 xl:max-w-32 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => !summaryLoading && setIsOpen(true)}
          title={counterTitle}
        >
          <div className="text-5xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-center text-approved font-anta">
            {summaryLoading ? (
              <span className="flex justify-center items-center w-full h-full">
                <Skeleton width={60} height={40} className="mx-auto" />
              </span>
            ) : (
              today
            )}
          </div>
          <p className="text-sm md:text-sm lg:text-base xl:text-lg text-white text-center mt-1">
            {counterLabel}
          </p>
        </div>
        <DashboardLineChart
          oneDay={oneDay}
          threeDays={threeDays}
          fiveDays={fiveDays}
        />
      </DashboardCard>

      <DashboardModal
        isOpen={isOpen}
        onClose={handleClose}
        title={`${modalTitlePrefix} (${response.meta.pagination.total})`}
        response={response}
        isLoading={listLoading}
        columns={columns}
        entityLabel={entityLabel}
        searchPlaceholder={searchPlaceholder}
        search={search}
        onSearch={handleSearch}
        sort={sort}
        onSort={handleSort}
        onPageChange={setPage}
      />
    </>
  );
}

export default ExpiringItemsCard;

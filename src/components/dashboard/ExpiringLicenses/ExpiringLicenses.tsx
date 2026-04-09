import DashboardCard from "../shared/DashboardCard";
import DashboardLineChart from "@/components/charts/LineChart/LineChart";
import DashboardModal from "@/components/dashboard/shared/DashboardModal";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import {
  useVehicleDocumentsAboutToExpire,
  useExpiringVehicleDocumentsList,
} from "@/hooks/useDashboardData";
import Skeleton from "@/components/shared/Skeleton";
import { useModalState } from "@/hooks/useModalState";
import { PAGE_SIZE, COLUMNS } from "./constants";

function ExpiringLicenses({ companyName }: { companyName: string }) {
  const { today, oneDay, threeDays, fiveDays, isLoading } =
    useVehicleDocumentsAboutToExpire(companyName);

  const {
    isOpen,
    setIsOpen,
    page,
    setPage,
    search,
    sort,
    handleSearch,
    handleSort,
    handleClose,
  } = useModalState();

  const { response, isLoading: isListLoading } =
    useExpiringVehicleDocumentsList({
      companyName,
      page,
      size: PAGE_SIZE,
      search,
      sortKey: sort.key,
      sortDir: sort.dir,
    });

  return (
    <>
      <DashboardCard
        title="VEHÍCULOS DOCUMENTOS POR VENCER"
        icon={faCar}
        titleClassName="text-xl font-bold text-approved"
        contentClassName="flex flex-col md:flex-row items-center gap-3 h-full mt-3"
      >
        <div
          className="shrink-0 w-auto max-w-28 xl:max-w-32 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => !isLoading && setIsOpen(true)}
          title="Ver detalle de vehículos con documentos por vencer"
        >
          <div className="text-5xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-center text-approved font-anta">
            {isLoading ? (
              <span className="flex justify-center items-center w-full h-full">
                <Skeleton width={60} height={40} className="mx-auto" />
              </span>
            ) : (
              today
            )}
          </div>
          <p className="text-sm md:text-sm lg:text-base xl:text-lg text-white text-center mt-1">
            Vehículos con acreditación vencen hoy
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
        title={`Vehículos con documentos por vencer (${response.meta.pagination.total})`}
        response={response}
        isLoading={isListLoading}
        columns={COLUMNS}
        entityLabel="vehículos"
        searchPlaceholder="Buscar por patente o tipo de requisito"
        search={search}
        onSearch={handleSearch}
        sort={sort}
        onSort={handleSort}
        onPageChange={setPage}
      />
    </>
  );
}

export default ExpiringLicenses;

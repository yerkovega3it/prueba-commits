import CardTitle from "../shared/CardHeader";
import {
  faExclamationTriangle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  useCriticalOperationalAlert,
  useExpiredExamsList,
  useExpiredVehicleAccreditationList,
  useOutOfShiftDailyConsumptionList,
  useVisitorsNotCheckedOutList,
} from "@/hooks/useDashboardData";
import Skeleton from "@/components/shared/Skeleton";
import CompanyMap from "@/components/dashboard/CompanyMap/CompanyMap";
import DashboardModal from "@/components/dashboard/shared/DashboardModal";
import { useModalState } from "./useModalState";
import {
  PAGE_SIZE,
  EXPIRED_EXAMS_COLUMNS,
  EXPIRED_VEHICLES_COLUMNS,
  OUT_OF_SHIFT_CONSUMPTION_COLUMNS,
  VISITORS_NOT_CHECKED_OUT_COLUMNS,
} from "./constants";
import "./styles.css";

function CrtiticAlert({ companyName }: { companyName: string }) {
  const {
    peopleWithExpiredExams,
    vehiclesWithExpiredAccreditation,
    visitorsApprovedNotCheckedOut,
    isCriticalOperationalAlertActive,
    peopleOutOfShiftNotCheckedOutWithDailyConsumption,
    isLoading,
  } = useCriticalOperationalAlert(companyName);

  const expiredExamsModal = useModalState();
  const expiredVehiclesModal = useModalState();
  const outOfShiftConsumptionModal = useModalState();
  const visitorsModal = useModalState();

  const { response: expiredExamsResponse, isLoading: isExpiredExamsLoading } =
    useExpiredExamsList({
      companyName,
      page: expiredExamsModal.page,
      size: PAGE_SIZE,
      search: expiredExamsModal.search,
      sortKey: expiredExamsModal.sort.key,
      sortDir: expiredExamsModal.sort.dir,
    });

  const {
    response: expiredVehiclesResponse,
    isLoading: isExpiredVehiclesLoading,
  } = useExpiredVehicleAccreditationList({
    companyName,
    page: expiredVehiclesModal.page,
    size: PAGE_SIZE,
    search: expiredVehiclesModal.search,
    sortKey: expiredVehiclesModal.sort.key,
    sortDir: expiredVehiclesModal.sort.dir,
  });

  const {
    response: outOfShiftConsumptionResponse,
    isLoading: isOutOfShiftConsumptionLoading,
  } = useOutOfShiftDailyConsumptionList({
    companyName,
    page: outOfShiftConsumptionModal.page,
    size: PAGE_SIZE,
    search: outOfShiftConsumptionModal.search,
    sortKey: outOfShiftConsumptionModal.sort.key,
    sortDir: outOfShiftConsumptionModal.sort.dir,
  });

  const { response: visitorsResponse, isLoading: isVisitorsLoading } =
    useVisitorsNotCheckedOutList({
      companyName,
      page: visitorsModal.page,
      size: PAGE_SIZE,
      search: visitorsModal.search,
      sortKey: visitorsModal.sort.key,
      sortDir: visitorsModal.sort.dir,
    });

  return (
    <>
      <div className="flex flex-col w-full h-full min-h-0 overflow-hidden p-3 md:p-5 xl:p-8">
        <div
          className={`${
            isCriticalOperationalAlertActive
              ? "card flex flex-col flex-1 min-h-0"
              : "relative p-2.5 rounded-2xl mb-4 flex flex-col flex-1 min-h-0"
          }`}
        >
          <div
            className={`card-content flex flex-col flex-1 min-h-0 ${
              !isCriticalOperationalAlertActive
                ? "border-5 shadow-[0_0_15px_0px_rgba(8,247,51,0.8)] border-success"
                : ""
            }`}
          >
            <CardTitle
              title="ALERTA OPERATIVA CRÍTICA EN FAENA"
              icon={
                isCriticalOperationalAlertActive
                  ? faExclamationTriangle
                  : faCheckCircle
              }
              titleClassName={`text-xl md:text-2xl xl:text-3xl font-bold flex flex-col break-words whitespace-normal w-full max-w-full overflow-hidden text-center ${
                !isCriticalOperationalAlertActive
                  ? "text-success"
                  : "text-critic"
              }`}
              iconClassName={`text-alert text-xl ${
                !isCriticalOperationalAlertActive
                  ? "text-success"
                  : "text-critic"
              }`}
            />

            {!isCriticalOperationalAlertActive ? (
              <div className="mt-3 flex flex-col justify-center flex-1 min-h-0 bg-success-light/20">
                <div className="text-xl md:text-2xl xl:text-3xl text-center mx-auto">
                  <span className="text-success">
                    No hay alertas registradas en este momento.
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex flex-col justify-between gap-3 flex-1 min-h-0">
                <button
                  className="bg-critic-light rounded-lg flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 xl:px-[20px] xl:py-[14px] flex-1 text-left hover:opacity-80 transition-opacity w-full"
                  onClick={() =>
                    !isLoading && expiredExamsModal.setIsOpen(true)
                  }
                >
                  <span className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold shrink-0 w-14 lg:w-16 xl:w-20 inline-flex items-center justify-center font-anta">
                    {isLoading ? (
                      <Skeleton width={40} height={32} />
                    ) : (
                      peopleWithExpiredExams
                    )}
                  </span>
                  <p className="text-white text-base xl:text-xl leading-tight">
                    Personas con exámenes vencidos
                  </p>
                </button>

                <button
                  className="bg-critic-light rounded-lg flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 xl:px-[20px] xl:py-[14px] flex-1 text-left hover:opacity-80 transition-opacity w-full"
                  onClick={() =>
                    !isLoading && expiredVehiclesModal.setIsOpen(true)
                  }
                >
                  <span className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold shrink-0 w-14 lg:w-16 xl:w-20 inline-flex items-center justify-center font-anta">
                    {isLoading ? (
                      <Skeleton width={40} height={32} />
                    ) : (
                      vehiclesWithExpiredAccreditation
                    )}
                  </span>
                  <p className="text-white text-base xl:text-xl leading-tight">
                    Vehículos con acreditación vencida
                  </p>
                </button>

                <button
                  className="bg-critic-light rounded-lg flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 xl:px-[20px] xl:py-[14px] flex-1 text-left hover:opacity-80 transition-opacity w-full"
                  onClick={() =>
                    !isLoading && outOfShiftConsumptionModal.setIsOpen(true)
                  }
                >
                  <span className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold shrink-0 w-14 lg:w-16 xl:w-20 inline-flex items-center justify-center font-anta">
                    {isLoading ? (
                      <Skeleton width={40} height={32} />
                    ) : (
                      peopleOutOfShiftNotCheckedOutWithDailyConsumption
                    )}
                  </span>
                  <p className="text-white text-base xl:text-xl leading-tight">
                    Personas fuera de turno que no han registrado salida y
                    tienen consumo diario
                  </p>
                </button>

                <button
                  className="bg-critic-light rounded-lg flex items-center gap-3 px-3 py-2 md:px-4 md:py-3 xl:px-[20px] xl:py-[14px] flex-1 text-left hover:opacity-80 transition-opacity w-full"
                  onClick={() => !isLoading && visitorsModal.setIsOpen(true)}
                >
                  <span className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold shrink-0 w-14 lg:w-16 xl:w-20 inline-flex items-center justify-center font-anta">
                    {isLoading ? (
                      <Skeleton width={40} height={32} />
                    ) : (
                      visitorsApprovedNotCheckedOut
                    )}
                  </span>
                  <p className="text-white text-base xl:text-xl leading-tight">
                    Personas con pase de visita aprobado que aún no registran
                    salida
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>
        <CompanyMap
          companyName={companyName}
          className="hidden xl:block flex-shrink-0 mt-3 h-[200px]"
        />
      </div>

      <DashboardModal
        isOpen={expiredExamsModal.isOpen}
        onClose={expiredExamsModal.handleClose}
        title={`Personas con exámenes vencidos (${expiredExamsResponse.meta.pagination.total})`}
        response={expiredExamsResponse}
        isLoading={isExpiredExamsLoading}
        columns={EXPIRED_EXAMS_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={expiredExamsModal.search}
        onSearch={expiredExamsModal.handleSearch}
        sort={expiredExamsModal.sort}
        onSort={expiredExamsModal.handleSort}
        onPageChange={expiredExamsModal.setPage}
      />

      <DashboardModal
        isOpen={expiredVehiclesModal.isOpen}
        onClose={expiredVehiclesModal.handleClose}
        title={`Vehículos con acreditación vencida (${expiredVehiclesResponse.meta.pagination.total})`}
        response={expiredVehiclesResponse}
        isLoading={isExpiredVehiclesLoading}
        columns={EXPIRED_VEHICLES_COLUMNS}
        entityLabel="vehículos"
        searchPlaceholder="Buscar por RUT"
        search={expiredVehiclesModal.search}
        onSearch={expiredVehiclesModal.handleSearch}
        sort={expiredVehiclesModal.sort}
        onSort={expiredVehiclesModal.handleSort}
        onPageChange={expiredVehiclesModal.setPage}
      />

      <DashboardModal
        isOpen={outOfShiftConsumptionModal.isOpen}
        onClose={outOfShiftConsumptionModal.handleClose}
        title={`Personas fuera de turno con consumo diario (${outOfShiftConsumptionResponse.meta.pagination.total})`}
        response={outOfShiftConsumptionResponse}
        isLoading={isOutOfShiftConsumptionLoading}
        columns={OUT_OF_SHIFT_CONSUMPTION_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={outOfShiftConsumptionModal.search}
        onSearch={outOfShiftConsumptionModal.handleSearch}
        sort={outOfShiftConsumptionModal.sort}
        onSort={outOfShiftConsumptionModal.handleSort}
        onPageChange={outOfShiftConsumptionModal.setPage}
      />

      <DashboardModal
        isOpen={visitorsModal.isOpen}
        onClose={visitorsModal.handleClose}
        title={`Visitantes sin registrar salida (${visitorsResponse.meta.pagination.total})`}
        response={visitorsResponse}
        isLoading={isVisitorsLoading}
        columns={VISITORS_NOT_CHECKED_OUT_COLUMNS}
        entityLabel="visitantes"
        searchPlaceholder="Buscar por RUT"
        search={visitorsModal.search}
        onSearch={visitorsModal.handleSearch}
        sort={visitorsModal.sort}
        onSort={visitorsModal.handleSort}
        onPageChange={visitorsModal.setPage}
      />
    </>
  );
}

export default CrtiticAlert;

import CardTitle from "../shared/CardHeader";
import {
  faExclamationTriangle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import Skeleton from "@/components/shared/Skeleton";
import CompanyMap from "@/components/dashboard/CompanyMap/CompanyMap";
import DashboardModal from "@/components/dashboard/shared/DashboardModal";
import {
  EXPIRED_EXAMS_COLUMNS,
  EXPIRED_VEHICLES_COLUMNS,
  OUT_OF_SHIFT_CONSUMPTION_COLUMNS,
  VISITORS_NOT_CHECKED_OUT_COLUMNS,
} from "./constants";
import "./styles.css";
import type { ReturnUseModalState } from "@/hooks/useModalState";
import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type {
  PersonExpiredExam,
  VehicleExpiredAccreditation,
  PersonOutOfShiftDailyConsumption,
  VisitorNotCheckedOut,
} from "@/interfaces/dashboard/listEntities.interface";

interface ListWithModal<T> {
  response: PaginatedResponse<T>;
  isLoading: boolean;
  modal: ReturnUseModalState;
}

interface AlertSummary {
  peopleWithExpiredExams: number | string;
  vehiclesWithExpiredAccreditation: number | string;
  visitorsApprovedNotCheckedOut: number | string;
  isCriticalOperationalAlertActive: boolean;
  peopleOutOfShiftNotCheckedOutWithDailyConsumption: number | string;
  isLoading: boolean;
}

interface CriticAlertProps {
  companyName: string;
  summary: AlertSummary;
  expiredExams: ListWithModal<PersonExpiredExam>;
  expiredVehicles: ListWithModal<VehicleExpiredAccreditation>;
  outOfShiftConsumption: ListWithModal<PersonOutOfShiftDailyConsumption>;
  visitors: ListWithModal<VisitorNotCheckedOut>;
}

function CrtiticAlert({
  companyName,
  summary,
  expiredExams,
  expiredVehicles,
  outOfShiftConsumption,
  visitors,
}: CriticAlertProps) {
  const {
    peopleWithExpiredExams,
    vehiclesWithExpiredAccreditation,
    visitorsApprovedNotCheckedOut,
    isCriticalOperationalAlertActive,
    peopleOutOfShiftNotCheckedOutWithDailyConsumption,
    isLoading,
  } = summary;

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
                    !isLoading && expiredExams.modal.setIsOpen(true)
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
                    !isLoading && expiredVehicles.modal.setIsOpen(true)
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
                    !isLoading && outOfShiftConsumption.modal.setIsOpen(true)
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
                  onClick={() => !isLoading && visitors.modal.setIsOpen(true)}
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
        isOpen={expiredExams.modal.isOpen}
        onClose={expiredExams.modal.handleClose}
        title={`Personas con exámenes vencidos (${expiredExams.response.meta.pagination.total})`}
        response={expiredExams.response}
        isLoading={expiredExams.isLoading}
        columns={EXPIRED_EXAMS_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={expiredExams.modal.search}
        onSearch={expiredExams.modal.handleSearch}
        sort={expiredExams.modal.sort}
        onSort={expiredExams.modal.handleSort}
        onPageChange={expiredExams.modal.setPage}
      />

      <DashboardModal
        isOpen={expiredVehicles.modal.isOpen}
        onClose={expiredVehicles.modal.handleClose}
        title={`Vehículos con acreditación vencida (${expiredVehicles.response.meta.pagination.total})`}
        response={expiredVehicles.response}
        isLoading={expiredVehicles.isLoading}
        columns={EXPIRED_VEHICLES_COLUMNS}
        entityLabel="vehículos"
        searchPlaceholder="Buscar por RUT"
        search={expiredVehicles.modal.search}
        onSearch={expiredVehicles.modal.handleSearch}
        sort={expiredVehicles.modal.sort}
        onSort={expiredVehicles.modal.handleSort}
        onPageChange={expiredVehicles.modal.setPage}
      />

      <DashboardModal
        isOpen={outOfShiftConsumption.modal.isOpen}
        onClose={outOfShiftConsumption.modal.handleClose}
        title={`Personas fuera de turno con consumo diario (${outOfShiftConsumption.response.meta.pagination.total})`}
        response={outOfShiftConsumption.response}
        isLoading={outOfShiftConsumption.isLoading}
        columns={OUT_OF_SHIFT_CONSUMPTION_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={outOfShiftConsumption.modal.search}
        onSearch={outOfShiftConsumption.modal.handleSearch}
        sort={outOfShiftConsumption.modal.sort}
        onSort={outOfShiftConsumption.modal.handleSort}
        onPageChange={outOfShiftConsumption.modal.setPage}
      />

      <DashboardModal
        isOpen={visitors.modal.isOpen}
        onClose={visitors.modal.handleClose}
        title={`Visitantes sin registrar salida (${visitors.response.meta.pagination.total})`}
        response={visitors.response}
        isLoading={visitors.isLoading}
        columns={VISITORS_NOT_CHECKED_OUT_COLUMNS}
        entityLabel="visitantes"
        searchPlaceholder="Buscar por RUT"
        search={visitors.modal.search}
        onSearch={visitors.modal.handleSearch}
        sort={visitors.modal.sort}
        onSort={visitors.modal.handleSort}
        onPageChange={visitors.modal.setPage}
      />
    </>
  );
}

export default CrtiticAlert;

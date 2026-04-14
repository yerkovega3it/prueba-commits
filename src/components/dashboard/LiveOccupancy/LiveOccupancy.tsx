import DashboardCard from "../shared/DashboardCard";
import StatCard from "../shared/StatCard";
import {
  faUtensils,
  faPlaneDeparture,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

import Skeleton from "@/components/shared/Skeleton";
import LiveOccupancyModal from "./LiveOccupancyModal";
import DashboardModal from "@/components/dashboard/shared/DashboardModal";
import {
  OUT_OF_SHIFT_COLUMNS,
  REPEATED_DINING_COLUMNS,
  NO_SHOW_FLIGHT_COLUMNS,
} from "./constants";
import type { ReturnUseModalState } from "@/hooks/useModalState";
import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type {
  PersonOutOfShiftExit,
  PersonRepeatedDining,
  PersonNoShowFlight,
} from "@/interfaces/dashboard/listEntities.interface";
import type { PersonOnSite } from "@/constants/mockData";

interface ListWithModal<T> {
  response: PaginatedResponse<T>;
  isLoading: boolean;
  modal: ReturnUseModalState;
}

interface LaborSummary {
  peopleOnSite: number | string;
  peopleRepeatedSameDiningHallConsumption: number | string;
  peopleDidNotShowUpForFlight: number | string;
  peopleOutOfShiftAndNotRegisteredExit: number | string;
  isLoading: boolean;
}

interface LiveOccupancyProps {
  summary: LaborSummary;
  showNoShowStat: boolean;
  peopleOnSite: ListWithModal<PersonOnSite>;
  outOfShift: ListWithModal<PersonOutOfShiftExit>;
  repeatedDining: ListWithModal<PersonRepeatedDining>;
  noShowFlight: ListWithModal<PersonNoShowFlight>;
}

function LiveOccupancy({
  summary,
  showNoShowStat,
  peopleOnSite,
  outOfShift,
  repeatedDining,
  noShowFlight,
}: LiveOccupancyProps) {
  const {
    peopleOnSite: peopleOnSiteCount,
    peopleRepeatedSameDiningHallConsumption,
    peopleDidNotShowUpForFlight,
    peopleOutOfShiftAndNotRegisteredExit,
    isLoading,
  } = summary;

  return (
    <>
      <DashboardCard
        title="ESTADO EN FAENA"
        titleClassName="text-xl font-bold text-approved"
        contentClassName="flex flex-col items-center justify-between gap-6 mt-4 md:mt-8 lg:mt-12 xl:mt-16 flex-1 min-h-0 dashboard-card-content"
        className="col-span-1 p-4 rounded-3xl bg-main h-full flex flex-col"
      >
        <div
          className="w-full mx-auto flex-none flex flex-col cursor-pointer hover:opacity-80 transition-opacity pt-4"
          onClick={() => !isLoading && peopleOnSite.modal.setIsOpen(true)}
          title="Ver detalle de personas en faena"
        >
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[9rem] text-center text-approved font-anta leading-none people-onsite">
            {isLoading ? (
              <span className="flex justify-center items-center w-full h-full">
                <Skeleton width={120} height={80} className="mx-auto" />
              </span>
            ) : (
              peopleOnSiteCount
            )}
          </div>
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-white text-center mt-2 people-onsite-label">
            Personas en Faena
          </p>
        </div>
        <div className="rounded-3xl bg-main flex-none flex flex-col items-stretch justify-center gap-4 lg:gap-6 xl:gap-8 w-full mx-auto mb-2 statcards-container">
          <StatCard
            icon={faArrowRight}
            value={peopleOutOfShiftAndNotRegisteredExit}
            label="Personas fuera de turno y no han marcado salida"
            loading={isLoading}
            onClick={() => outOfShift.modal.setIsOpen(true)}
          />
          <StatCard
            icon={faUtensils}
            value={peopleRepeatedSameDiningHallConsumption}
            label="Personas han repetido un mismo consumo en casino"
            loading={isLoading}
            onClick={() => repeatedDining.modal.setIsOpen(true)}
          />
          {showNoShowStat ? (
            <StatCard
              icon={faPlaneDeparture}
              value={peopleDidNotShowUpForFlight}
              label="Personas no se presentaron al vuelo"
              loading={isLoading}
              onClick={() => noShowFlight.modal.setIsOpen(true)}
            />
          ) : null}
        </div>
      </DashboardCard>

      <LiveOccupancyModal
        isOpen={peopleOnSite.modal.isOpen}
        onClose={peopleOnSite.modal.handleClose}
        response={peopleOnSite.response}
        isLoading={peopleOnSite.isLoading}
        search={peopleOnSite.modal.search}
        onSearch={peopleOnSite.modal.handleSearch}
        sort={peopleOnSite.modal.sort}
        onSort={peopleOnSite.modal.handleSort}
        onPageChange={peopleOnSite.modal.setPage}
      />

      <DashboardModal
        isOpen={outOfShift.modal.isOpen}
        onClose={outOfShift.modal.handleClose}
        title={`Personas fuera de turno sin marcar salida (${outOfShift.response.meta.pagination.total})`}
        response={outOfShift.response}
        isLoading={outOfShift.isLoading}
        columns={OUT_OF_SHIFT_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={outOfShift.modal.search}
        onSearch={outOfShift.modal.handleSearch}
        sort={outOfShift.modal.sort}
        onSort={outOfShift.modal.handleSort}
        onPageChange={outOfShift.modal.setPage}
      />

      <DashboardModal
        isOpen={repeatedDining.modal.isOpen}
        onClose={repeatedDining.modal.handleClose}
        title={`Personas con consumo repetido en casino (${repeatedDining.response.meta.pagination.total})`}
        response={repeatedDining.response}
        isLoading={repeatedDining.isLoading}
        columns={REPEATED_DINING_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={repeatedDining.modal.search}
        onSearch={repeatedDining.modal.handleSearch}
        sort={repeatedDining.modal.sort}
        onSort={repeatedDining.modal.handleSort}
        onPageChange={repeatedDining.modal.setPage}
      />

      <DashboardModal
        isOpen={noShowFlight.modal.isOpen}
        onClose={noShowFlight.modal.handleClose}
        title={`Personas que no se presentaron al vuelo (${noShowFlight.response.meta.pagination.total})`}
        response={noShowFlight.response}
        isLoading={noShowFlight.isLoading}
        columns={NO_SHOW_FLIGHT_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={noShowFlight.modal.search}
        onSearch={noShowFlight.modal.handleSearch}
        sort={noShowFlight.modal.sort}
        onSort={noShowFlight.modal.handleSort}
        onPageChange={noShowFlight.modal.setPage}
      />
    </>
  );
}

export default LiveOccupancy;

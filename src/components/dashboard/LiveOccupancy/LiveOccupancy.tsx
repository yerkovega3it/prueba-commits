import {
  useLaborStatus,
  usePeopleOnSite,
  useOutOfShiftExitList,
  useRepeatedDiningHallList,
  useNoShowFlightList,
} from "@/hooks/useDashboardData";
import DashboardCard from "../shared/DashboardCard";
import StatCard from "../shared/StatCard";
import {
  faUtensils,
  faPlaneDeparture,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

import Skeleton from "@/components/shared/Skeleton";
import { useLocation } from "react-router-dom";
import LiveOccupancyModal from "./LiveOccupancyModal";
import DashboardModal from "@/components/dashboard/shared/DashboardModal";
import { useModalState } from "@/hooks/useModalState";
import {
  PAGE_SIZE,
  OUT_OF_SHIFT_COLUMNS,
  REPEATED_DINING_COLUMNS,
  NO_SHOW_FLIGHT_COLUMNS,
} from "./constants";

function LiveOccupancy({ companyName }: { companyName: string }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const peopleOnSiteModal = useModalState();
  const outOfShiftModal = useModalState();
  const repeatedDiningModal = useModalState();
  const noShowFlightModal = useModalState();

  const {
    peopleOnSite,
    peopleRepeatedSameDiningHallConsumption,
    peopleDidNotShowUpForFlight,
    peopleOutOfShiftAndNotRegisteredExit,
    isLoading,
  } = useLaborStatus(companyName);

  const { response: peopleOnSiteResponse, isLoading: isPeopleOnSiteLoading } =
    usePeopleOnSite({
      companyName,
      page: peopleOnSiteModal.page,
      size: PAGE_SIZE,
      search: peopleOnSiteModal.search,
      sortKey: peopleOnSiteModal.sort.key,
      sortDir: peopleOnSiteModal.sort.dir,
    });

  const { response: outOfShiftResponse, isLoading: isOutOfShiftLoading } =
    useOutOfShiftExitList({
      companyName,
      page: outOfShiftModal.page,
      size: PAGE_SIZE,
      search: outOfShiftModal.search,
      sortKey: outOfShiftModal.sort.key,
      sortDir: outOfShiftModal.sort.dir,
    });

  const {
    response: repeatedDiningResponse,
    isLoading: isRepeatedDiningLoading,
  } = useRepeatedDiningHallList({
    companyName,
    page: repeatedDiningModal.page,
    size: PAGE_SIZE,
    search: repeatedDiningModal.search,
    sortKey: repeatedDiningModal.sort.key,
    sortDir: repeatedDiningModal.sort.dir,
  });

  const { response: noShowFlightResponse, isLoading: isNoShowFlightLoading } =
    useNoShowFlightList({
      companyName,
      page: noShowFlightModal.page,
      size: PAGE_SIZE,
      search: noShowFlightModal.search,
      sortKey: noShowFlightModal.sort.key,
      sortDir: noShowFlightModal.sort.dir,
    });

  const normalizedPath = currentPath.toLowerCase();
  const showNoShowStat = ["/mlp", "/all"].includes(normalizedPath);

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
          onClick={() => !isLoading && peopleOnSiteModal.setIsOpen(true)}
          title="Ver detalle de personas en faena"
        >
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[9rem] text-center text-approved font-anta leading-none people-onsite">
            {isLoading ? (
              <span className="flex justify-center items-center w-full h-full">
                <Skeleton width={120} height={80} className="mx-auto" />
              </span>
            ) : (
              peopleOnSite
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
            onClick={() => outOfShiftModal.setIsOpen(true)}
          />
          <StatCard
            icon={faUtensils}
            value={peopleRepeatedSameDiningHallConsumption}
            label="Personas han repetido un mismo consumo en casino"
            loading={isLoading}
            onClick={() => repeatedDiningModal.setIsOpen(true)}
          />
          {showNoShowStat ? (
            <StatCard
              icon={faPlaneDeparture}
              value={peopleDidNotShowUpForFlight}
              label="Personas no se presentaron al vuelo"
              loading={isLoading}
              onClick={() => noShowFlightModal.setIsOpen(true)}
            />
          ) : null}
        </div>
      </DashboardCard>

      <LiveOccupancyModal
        isOpen={peopleOnSiteModal.isOpen}
        onClose={peopleOnSiteModal.handleClose}
        response={peopleOnSiteResponse}
        isLoading={isPeopleOnSiteLoading}
        search={peopleOnSiteModal.search}
        onSearch={peopleOnSiteModal.handleSearch}
        sort={peopleOnSiteModal.sort}
        onSort={peopleOnSiteModal.handleSort}
        onPageChange={peopleOnSiteModal.setPage}
      />

      <DashboardModal
        isOpen={outOfShiftModal.isOpen}
        onClose={outOfShiftModal.handleClose}
        title={`Personas fuera de turno sin marcar salida (${outOfShiftResponse.meta.pagination.total})`}
        response={outOfShiftResponse}
        isLoading={isOutOfShiftLoading}
        columns={OUT_OF_SHIFT_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={outOfShiftModal.search}
        onSearch={outOfShiftModal.handleSearch}
        sort={outOfShiftModal.sort}
        onSort={outOfShiftModal.handleSort}
        onPageChange={outOfShiftModal.setPage}
      />

      <DashboardModal
        isOpen={repeatedDiningModal.isOpen}
        onClose={repeatedDiningModal.handleClose}
        title={`Personas con consumo repetido en casino (${repeatedDiningResponse.meta.pagination.total})`}
        response={repeatedDiningResponse}
        isLoading={isRepeatedDiningLoading}
        columns={REPEATED_DINING_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={repeatedDiningModal.search}
        onSearch={repeatedDiningModal.handleSearch}
        sort={repeatedDiningModal.sort}
        onSort={repeatedDiningModal.handleSort}
        onPageChange={repeatedDiningModal.setPage}
      />

      <DashboardModal
        isOpen={noShowFlightModal.isOpen}
        onClose={noShowFlightModal.handleClose}
        title={`Personas que no se presentaron al vuelo (${noShowFlightResponse.meta.pagination.total})`}
        response={noShowFlightResponse}
        isLoading={isNoShowFlightLoading}
        columns={NO_SHOW_FLIGHT_COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por RUT"
        search={noShowFlightModal.search}
        onSearch={noShowFlightModal.handleSearch}
        sort={noShowFlightModal.sort}
        onSort={noShowFlightModal.handleSort}
        onPageChange={noShowFlightModal.setPage}
      />
    </>
  );
}

export default LiveOccupancy;

import { useLaborStatus } from "@/hooks/useDashboardData";
import DashboardCard from "../shared/DashboardCard";
import StatCard from "../shared/StatCard";
import {
  faUtensils,
  faPlaneDeparture,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

import Skeleton from "@/components/shared/Skeleton";

function LiveOccupancy({ companyName }: { companyName: string }) {
  const {
    peopleOnSite,
    peopleRepeatedSameDiningHallConsumption,
    peopleDidNotShowUpForFlight,
    peopleOutOfShiftAndNotRegisteredExit,
    isLoading,
  } = useLaborStatus(companyName);

  return (
    <DashboardCard
      title="ESTADO EN FAENA"
      titleClassName="text-3xl font-bold whitespace-nowrap text-approved"
      contentClassName="flex flex-col items-center gap-24 mt-12 lg:mt-14 xl:mt-16 h-full dashboard-card-content"
      className="col-span-1 p-4 rounded-3xl bg-main h-full"
    >
      <div className="w-full mx-auto flex-none flex flex-col">
        <p className="text-6xl md:text-8xl lg:text-[9rem] text-center text-approved font-anta leading-none people-onsite">
          {isLoading ? (
            <span className="flex justify-center items-center w-full h-full">
              <Skeleton width={120} height={80} className="mx-auto" />
            </span>
          ) : (
            peopleOnSite
          )}
        </p>
        <p className="text-xl md:text-2xl text-white text-center mt-2 people-onsite-label">
          Personas en Faena
        </p>
      </div>
      <div className="rounded-3xl bg-main flex-none flex flex-col items-stretch justify-center gap-6 lg:gap-8 w-full mx-auto mb-2 statcards-container">
        <StatCard
          icon={faArrowRight}
          value={peopleOutOfShiftAndNotRegisteredExit}
          label="Personas fuera de turno y no han marcado salida"
          loading={isLoading}
        />
        <StatCard
          icon={faUtensils}
          value={peopleRepeatedSameDiningHallConsumption}
          label="Personas han repetido un mismo consumo en casino"
          loading={isLoading}
        />
        <StatCard
          icon={faPlaneDeparture}
          value={peopleDidNotShowUpForFlight}
          label="Personas no se presentaron al vuelo"
          loading={isLoading}
        />
      </div>
    </DashboardCard>
  );
}

export default LiveOccupancy;

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
import { useLocation } from "react-router-dom";

function LiveOccupancy({ companyName }: { companyName: string }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const {
    peopleOnSite,
    peopleRepeatedSameDiningHallConsumption,
    peopleDidNotShowUpForFlight,
    peopleOutOfShiftAndNotRegisteredExit,
    isLoading,
  } = useLaborStatus(companyName);

  const normalizedPath = currentPath.toLowerCase();
  const showNoShowStat = ["/mlp", "/all"].includes(normalizedPath);

  return (
    <DashboardCard
      title="ESTADO EN FAENA"
      titleClassName="text-xl font-bold text-approved"
      contentClassName="flex flex-col items-center gap-8 md:gap-12 lg:gap-16 xl:gap-24 mt-4 md:mt-8 lg:mt-12 xl:mt-16 h-full dashboard-card-content"
      className="col-span-1 p-4 rounded-3xl bg-main h-full"
    >
      <div className="w-full mx-auto flex-none flex flex-col">
        <p className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[9rem] text-center text-approved font-anta leading-none people-onsite">
          {isLoading ? (
            <span className="flex justify-center items-center w-full h-full">
              <Skeleton width={120} height={80} className="mx-auto" />
            </span>
          ) : (
            peopleOnSite
          )}
        </p>
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
        />
        <StatCard
          icon={faUtensils}
          value={peopleRepeatedSameDiningHallConsumption}
          label="Personas han repetido un mismo consumo en casino"
          loading={isLoading}
        />
        {showNoShowStat ? (
          <StatCard
            icon={faPlaneDeparture}
            value={peopleDidNotShowUpForFlight}
            label="Personas no se presentaron al vuelo"
            loading={isLoading}
          />
        ) : null}
      </div>
    </DashboardCard>
  );
}

export default LiveOccupancy;

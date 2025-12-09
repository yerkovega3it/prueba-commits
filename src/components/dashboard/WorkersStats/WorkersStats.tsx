import {
  faUtensils,
  faArrowRight,
  faPlaneDeparture,
  faSync,
} from "@fortawesome/free-solid-svg-icons";
import { useLaborStatus } from "@/hooks/useDashboardData";
import StatCard from "./StatCard";

export default function WorkersStats() {
  const {
    peopleRepeatedSameDiningHallConsumption,
    peopleOutOfShift,
    peopleDidNotShowUpForFlight,
    peopleEnteredToday,
  } = useLaborStatus();

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-0 rounded-xl bg-main h-full flex flex-col justify-around gap-4 sm:gap-0">
      <StatCard
        icon={faUtensils}
        value={peopleRepeatedSameDiningHallConsumption}
        label="Han repetido un mismo consumo en casino"
      />
      <StatCard
        icon={faArrowRight}
        value={peopleOutOfShift}
        label="Fuera de turno"
      />
      <StatCard
        icon={faPlaneDeparture}
        value={peopleDidNotShowUpForFlight}
        label="No se presentaron al vuelo"
      />
      <StatCard
        icon={faSync}
        value={peopleEnteredToday}
        label="Entraron en el día"
      />
    </div>
  );
}

import { useLaborStatus } from "@/hooks/useDashboardData";
import DashboardCard from "../shared/DashboardCard";
import DoughnutChart from "@/components/charts/DoughnutChart/DoughnutChart";

function LiveOccupancy() {
  const { peopleOnSite, maxCapacity, occupancyPercentage } = useLaborStatus();

  return (
    <DashboardCard
      title="ESTADO EN FAENA"
      contentClassName="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 justify-between mt-3"
    >
      <div className="w-full sm:w-auto">
        <p className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-center text-approved">
          {peopleOnSite}
        </p>
        <p className="text-sm sm:text-base lg:text-lg text-white text-center mt-1">
          Personas en Faena
        </p>
      </div>
      <DoughnutChart
        percentage={occupancyPercentage}
        maxCapacity={maxCapacity}
        color="#53F7F6"
      />
    </DashboardCard>
  );
}

export default LiveOccupancy;

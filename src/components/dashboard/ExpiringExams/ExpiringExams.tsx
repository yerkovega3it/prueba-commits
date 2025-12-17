import DashboardCard from "../shared/DashboardCard";
import DashboardLineChart from "@/components/charts/LineChart/LineChart";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useExamsAboutToExpire } from "@/hooks/useDashboardData";

function ExpiringExams() {
  const { today, oneDay, threeDays, fiveDays } = useExamsAboutToExpire();
  return (
    <DashboardCard
      title="EXÁMENES POR VENCER"
      icon={faUser}
      titleClassName="text-lg text-approved"
      contentClassName="flex items-center gap-3 h-full"
    >
      <div className="shrink-0 w-auto max-w-32">
        <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-approved font-anta">
          {today}
        </p>
        <p className="text-sm md:text-lg text-white text-center mt-1">
          Exámenes vencen hoy
        </p>
      </div>
      <DashboardLineChart
        oneDay={oneDay}
        threeDays={threeDays}
        fiveDays={fiveDays}
      />
    </DashboardCard>
  );
}

export default ExpiringExams;

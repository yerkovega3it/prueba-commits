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
      contentClassName="flex flex-col sm:flex-row items-center gap-4 mt-3"
    >
      <div className="shrink-0 w-full sm:w-auto sm:max-w-32">
        <p className="text-5xl sm:text-6xl font-bold text-center text-approved">
          {today}
        </p>
        <p className="text-sm sm:text-base text-white text-center mt-1">
          Exámenes que vencen hoy
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

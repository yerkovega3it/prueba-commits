import DashboardCard from "../shared/DashboardCard";
import DashboardLineChart from "@/components/charts/LineChart/LineChart";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useExamsAboutToExpire } from "@/hooks/useDashboardData";
import Skeleton from "@/components/shared/Skeleton";

function ExpiringExams({ companyName }: { companyName: string }) {
  const { today, oneDay, threeDays, fiveDays, isLoading } =
    useExamsAboutToExpire(companyName);
  return (
    <DashboardCard
      title="EXÁMENES POR VENCER"
      icon={faUser}
      titleClassName="text-xl font-bold text-approved"
      contentClassName="flex flex-col md:flex-row items-center gap-3 h-full mt-3"
    >
      <div className="shrink-0 w-auto max-w-28 xl:max-w-32">
        <p className="text-5xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-center text-approved font-anta">
          {isLoading ? (
            <span className="flex justify-center items-center w-full h-full">
              <Skeleton width={60} height={40} className="mx-auto" />
            </span>
          ) : (
            today
          )}
        </p>
        <p className="text-xs md:text-sm lg:text-base xl:text-lg text-white text-center mt-1">
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

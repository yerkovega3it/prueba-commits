import DashboardCard from "../shared/DashboardCard";
import DashboardLineChart from "@/components/charts/LineChart/LineChart";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { useVehicleDocumentsAboutToExpire } from "@/hooks/useDashboardData";

function ExpiringLicenses() {
  const { today, oneDay, threeDays, fiveDays } =
    useVehicleDocumentsAboutToExpire();
  return (
    <DashboardCard
      title="VEHÍCULOS DOCUMENTOS POR VENCER"
      icon={faCar}
      contentClassName="flex flex-col sm:flex-row items-center gap-4 h-full"
    >
      <div className="shrink-0 w-full sm:w-auto sm:max-w-32">
        <p className="text-5xl sm:text-6xl font-bold text-center text-approved">
          {today}
        </p>
        <p className="text-sm sm:text-base text-white text-center mt-1">
          Vehículos con acreditación vencen hoy
        </p>
      </div>
      <DashboardLineChart
        oneDay={oneDay}
        threeDays={threeDays}
        fiveDays={fiveDays}
        chartId="expiring-licenses-chart"
      />
    </DashboardCard>
  );
}

export default ExpiringLicenses;

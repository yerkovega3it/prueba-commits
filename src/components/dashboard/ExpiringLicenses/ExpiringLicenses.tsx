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
      contentClassName="flex items-center gap-4 mt-3"
    >
      <div className="shrink-0 max-w-32">
        <p className="text-6xl font-bold text-center text-approved">{today}</p>
        <p className="text-md text-white text-center">
          Vehículos con acreditación que vence hoy
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

export default ExpiringLicenses;

import useDashboardData from "@/hooks/useDashboardData";
import CardTitle from "../shared/CardHeader";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import SecurityIndicator from "./SecurityIndicator";
import KpiChart from "./KpiChart";

function SecurityPerformance() {
  const { ispPercentage, ispGoal } = useDashboardData();

  return (
    <div className="p-6 rounded-xl bg-card flex flex-col gap-4">
      <CardTitle
        title="Índice de Performance de Seguridad (ISP)"
        icon={faChartPie}
        iconClassName="text-info"
      />
      <div className="h-fit grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-center">
        <KpiChart ispPercentage={ispPercentage} ispGoal={ispGoal} />
        <div className="space-y-2">
          <SecurityIndicator
            indicatorColor="#ff0055"
            label="A1. Alertas de Máximo Riesgo"
            value={7}
          />
          <SecurityIndicator
            indicatorColor="#ff9900"
            label="A2. Inhabilitación Documental"
            value={37}
          />
          <SecurityIndicator
            indicatorColor="#ff00ff"
            label="A3. Vehículos No Acreditados"
            value={5}
          />
        </div>
      </div>
    </div>
  );
}

export default SecurityPerformance;

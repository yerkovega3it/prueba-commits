import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LiveOccupancy from "@/components/dashboard/LiveOccupancy";
import CriticalAlerts from "@/components/dashboard/CriticalAlerts";
import ControlAccess from "@/components/dashboard/ControlAccess";
import ComplianceRisk from "@/components/dashboard/ComplianceRisk";
import SecurityPerformance from "@/components/dashboard/SecurityPerformance";

export default function HomePage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 sm:gap-4">
        <LiveOccupancy />
        <CriticalAlerts />
        <ControlAccess />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        <ComplianceRisk />
        <SecurityPerformance />
      </div>
    </DashboardLayout>
  );
}

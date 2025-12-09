import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LiveOccupancy from "@/components/dashboard/LiveOccupancy/LiveOccupancy";
import ExpiringExams from "@/components/dashboard/ExpiringExams/ExpiringExams";
import CrtiticAlert from "@/components/dashboard/CriticAlert/CrtiticAlert";
import ExpiringLicenses from "@/components/dashboard/ExpiringLicenses/ExpiringLicenses";
import MonthlyPassesChart from "@/components/dashboard/MonthlyPasses/MonthlyPasses";

export default function HomePage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="flex gap-4">
        <div className="max-w-md w-full">
          <LiveOccupancy />
        </div>
        <div className="flex flex-col gap-4 max-w-md w-full">
          <ExpiringExams />
          <ExpiringLicenses />
        </div>
        <CrtiticAlert />
      </div>
      <div className="flex w-full max-w-[calc(100%-27rem)]">
        <MonthlyPassesChart />
      </div>
    </DashboardLayout>
  );
}

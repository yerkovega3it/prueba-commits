import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LiveOccupancy from "@/components/dashboard/LiveOccupancy/LiveOccupancy";
import ExpiringExams from "@/components/dashboard/ExpiringExams/ExpiringExams";
import CriticAlert from "@/components/dashboard/CriticAlert/CriticAlert";
import ExpiringLicenses from "@/components/dashboard/ExpiringLicenses/ExpiringLicenses";
import MonthlyPassesChart from "@/components/dashboard/MonthlyPasses/MonthlyPasses";

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="flex-shrink-0" style={{ maxHeight: "12%" }}>
        <DashboardHeader />
      </div>
      <div
        className="relative flex gap-6 w-full overflow-hidden"
        style={{ height: "88%" }}
      >
        <div
          className="flex flex-col gap-6 overflow-hidden h-full"
          style={{ width: "73%" }}
        >
          <div className="flex gap-6 w-full" style={{ height: "60%" }}>
            <div className="w-1/2 h-full overflow-hidden">
              <LiveOccupancy />
            </div>
            <div className="flex flex-col gap-6 w-1/2 h-full overflow-hidden">
              <div className="h-1/2 overflow-hidden">
                <ExpiringExams />
              </div>
              <div className="h-1/2 overflow-hidden">
                <ExpiringLicenses />
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden" style={{ height: "40%" }}>
            <MonthlyPassesChart />
          </div>
        </div>
        <div
          className="absolute right-0 top-0 h-full overflow-hidden"
          style={{ width: "26%" }}
        >
          <CriticAlert />
        </div>
      </div>
    </DashboardLayout>
  );
}

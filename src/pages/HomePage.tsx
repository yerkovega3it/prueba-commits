import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LiveOccupancy from "@/components/dashboard/LiveOccupancy/LiveOccupancy";
import ExpiringExams from "@/components/dashboard/ExpiringExams/ExpiringExams";
import CrtiticAlert from "@/components/dashboard/CriticAlert/CrtiticAlert";
import ExpiringLicenses from "@/components/dashboard/ExpiringLicenses/ExpiringLicenses";
import WorkersStats from "@/components/dashboard/WorkersStats/WorkersStats";
import Map from "@/assets/map.svg";
import MonthlyPassesChart from "@/components/dashboard/MonthlyPasses/MonthlyPasses";
import VisitPasses from "@/components/dashboard/VisitPasses/VisitPasses";

export default function HomePage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_auto] gap-3 sm:gap-4">
        <LiveOccupancy />
        <ExpiringExams />
        <CrtiticAlert />
        <WorkersStats />
        <div className="lg:self-end">
          <ExpiringLicenses />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
        <MonthlyPassesChart />
        <VisitPasses />
        <img
          src={Map}
          alt="Map"
          className="w-full h-auto lg:h-full object-contain rounded-xl"
        />
      </div>
    </DashboardLayout>
  );
}

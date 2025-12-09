import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LiveOccupancy from "@/components/dashboard/LiveOccupancy/LiveOccupancy";
import ExpiringExams from "@/components/dashboard/ExpiringExams/ExpiringExams";
import CrtiticAlert from "@/components/dashboard/CriticAlert/CrtiticAlert";
import ExpiringLicenses from "@/components/dashboard/ExpiringLicenses/ExpiringLicenses";
import Map from "@/assets/map.svg";
import MonthlyPassesChart from "@/components/dashboard/MonthlyPasses/MonthlyPasses";
import VisitPasses from "@/components/dashboard/VisitPasses/VisitPasses";

export default function HomePage() {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-3 sm:gap-4">
        <div className="lg:row-span-2">
          <LiveOccupancy />
        </div>
        <ExpiringExams />
        <CrtiticAlert />
        <ExpiringLicenses />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="lg:col-span-2 bg-main rounded-3xl p-4 sm:p-5 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 h-full">
            <MonthlyPassesChart />
            <VisitPasses />
          </div>
        </div>
        <img
          src={Map}
          alt="Map"
          className="w-full h-auto lg:h-[300px] object-contain rounded-3xl"
        />
      </div>
    </DashboardLayout>
  );
}

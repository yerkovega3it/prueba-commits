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
      <DashboardHeader />
      <div className="relative flex flex-col xl:flex-row gap-4 w-full">
        <div className="flex flex-wrap gap-4 w-full xl:max-w-[calc(100%-28rem)] flex-shrink-0 justify-center xl:justify-start">
          <div className="w-full sm:w-[calc(50%-0.5rem)] xl:flex-1 xl:min-w-[400px]">
            <LiveOccupancy />
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-[calc(50%-0.5rem)] xl:flex-1 xl:min-w-[400px]">
            <ExpiringExams />
            <ExpiringLicenses />
          </div>
        </div>
        <div className="w-full xl:absolute xl:right-0 xl:top-0 xl:w-[26rem]">
          <CriticAlert />
        </div>
      </div>
      <div className="flex w-full xl:max-w-[calc(100%-28rem)]">
        <MonthlyPassesChart />
      </div>
    </DashboardLayout>
  );
}

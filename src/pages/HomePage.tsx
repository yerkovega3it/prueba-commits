import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LiveOccupancy from "@/components/dashboard/LiveOccupancy/LiveOccupancy";
import ExpiringExams from "@/components/dashboard/ExpiringExams/ExpiringExams";
import CriticAlert from "@/components/dashboard/CriticAlert/CriticAlert";
import ExpiringLicenses from "@/components/dashboard/ExpiringLicenses/ExpiringLicenses";
import MonthlyPassesChart from "@/components/dashboard/MonthlyPasses/MonthlyPasses";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { validateCompany } from "@/services/validateCompany.api";
import type { AxiosError } from "axios";
import { UnauthorizedPage } from "./UnauthorizedPage";
import { NotFoundPage } from "./NotFoundPage";

export default function HomePage() {
  const { pathParam } = useParams();
  const criticAlertRef = useRef<HTMLDivElement>(null);

  const { isLoading, isError, error } = useQuery({
    queryKey: ["company-validator", pathParam],
    queryFn: () => {
      return validateCompany(pathParam as string);
    },
    enabled: !!pathParam,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div className="bg-blue-500 h-full animate-pulse"></div>
      </div>
    );
  }
  if (isError) {
    console.log(error);
    if ((error as AxiosError)?.status === 401) {
      return <UnauthorizedPage />;
    } else {
      return <NotFoundPage />;
    }
  }

  return (
    <DashboardLayout>
      <div className="flex-shrink-0 xl:max-h-[12%]">
        <DashboardHeader
          companyName={pathParam as string}
          onScrollToAlert={() =>
            criticAlertRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </div>

      <div className="flex gap-6 w-full xl:h-[88%] xl:overflow-hidden flex-col xl:flex-row">
        <div className="flex flex-col min-h-0 gap-6 xl:w-[72%] w-full">
          <div className="flex gap-6 w-full flex-1 min-h-0 flex-col xl:flex-row">
            <div className="w-full xl:w-1/2 xl:h-full min-h-[220px]">
              <LiveOccupancy companyName={pathParam as string} />
            </div>
            <div className="flex flex-col gap-6 w-full xl:w-1/2 xl:h-full overflow-hidden">
              <div className="flex-1 xl:flex-none xl:h-1/2 min-h-[160px] overflow-hidden">
                <ExpiringExams companyName={pathParam as string} />
              </div>
              <div className="flex-1 xl:flex-none xl:h-1/2 min-h-[160px] overflow-hidden">
                <ExpiringLicenses companyName={pathParam as string} />
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden flex-shrink-0 min-h-[150px] xl:h-[30%]">
            <MonthlyPassesChart companyName={pathParam as string} />
          </div>
        </div>
        <div
          ref={criticAlertRef}
          className="xl:w-[28%] w-full xl:h-full xl:overflow-hidden"
        >
          <CriticAlert companyName={pathParam as string} />
        </div>
      </div>
    </DashboardLayout>
  );
}

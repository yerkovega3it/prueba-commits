import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import LiveOccupancy from "@/components/dashboard/LiveOccupancy/LiveOccupancy";
import ExpiringExams from "@/components/dashboard/ExpiringExams/ExpiringExams";
import CriticAlert from "@/components/dashboard/CriticAlert/CriticAlert";
import ExpiringLicenses from "@/components/dashboard/ExpiringLicenses/ExpiringLicenses";
import MonthlyPassesChart from "@/components/dashboard/MonthlyPasses/MonthlyPasses";
import { useQuery } from "@tanstack/react-query";
import { validateCompany } from "@/services/validateCompany.api";
import type { AxiosError } from "axios";
import { UnauthorizedPage } from "./UnauthorizedPage";
import { NotFoundPage } from "./NotFoundPage";

export default function HomePage() {
  const { pathParam } = useParams();

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
      <div className="flex-shrink-0" style={{ maxHeight: "12%" }}>
        <DashboardHeader companyName={pathParam as string} />
      </div>
      <div
        className="relative flex gap-6 w-full overflow-hidden"
        style={{ height: "88%" }}
      >
        <div
          className="flex flex-col h-full min-h-0 mr-6 gap-6"
          style={{ width: "72%" }}
        >
          <div className="flex gap-6 w-full flex-1 min-h-0">
            <div className="w-1/2 h-full overflow-hidden">
              <LiveOccupancy companyName={pathParam as string} />
            </div>
            <div className="flex flex-col gap-6 w-1/2 h-full overflow-hidden">
              <div className="h-1/2 overflow-hidden">
                <ExpiringExams companyName={pathParam as string} />
              </div>
              <div className="h-1/2 overflow-hidden">
                <ExpiringLicenses companyName={pathParam as string} />
              </div>
            </div>
          </div>
          <div
            className="w-full overflow-hidden flex-shrink-0"
            style={{ minHeight: "150px" }}
          >
            <MonthlyPassesChart companyName={pathParam as string} />
          </div>
        </div>
        <div
          className="absolute right-0 top-0 h-full overflow-hidden"
          style={{ width: "28%" }}
        >
          <CriticAlert companyName={pathParam as string} />
        </div>
      </div>
    </DashboardLayout>
  );
}

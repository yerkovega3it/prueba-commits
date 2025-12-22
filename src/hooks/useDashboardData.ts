import { useQuery } from "@tanstack/react-query";
import { getDashboardInformation } from "@/services/dashboard/dashboardInformation.api";
import { getLaborStatus } from "@/services/dashboard/laborStatus.api";
import { getMonthlyApprovedPasses } from "@/services/dashboard/monthlyApprovedPasses.api";
import { getExamsAboutToExpire } from "@/services/dashboard/examsAboutToExpire.api";
import { getVehicleDocumentsAboutToExpire } from "@/services/dashboard/documentsAboutToExpire.api";
import { getVisitorPass } from "@/services/dashboard/visitorPass.api";
import { getCriticalOperationalAlert } from "@/services/dashboard/criticalAlert.api";
import {
  DASHBOARD_REFETCH_INTERVAL_MS,
  DASHBOARD_STALE_TIME_MS,
  RETRY_DELAY_MS,
} from "@/constants";
export function useDashboardInfo(companyName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-info", companyName],
    queryFn: () => getDashboardInformation(companyName),
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    miningCompanyName: data?.miningCompanyName ?? "",
    lastUpdateSecondsAgo: data?.lastUpdateSecondsAgo ?? 0,
    isLoading,
  };
}

export function useLaborStatus(companyName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["labor-status", companyName],
    queryFn: () => getLaborStatus(companyName),
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    peopleOnSite: data?.peopleOnSite ?? "-",
    peopleRepeatedSameDiningHallConsumption:
      data?.peopleRepeatedSameDiningHallConsumption ?? "-",
    peopleDidNotShowUpForFlight: data?.peopleDidNotShowUpForFlight ?? "-",
    peopleOutOfShiftAndNotRegisteredExit:
      data?.peopleOutOfShiftAndNotRegisteredExit ?? "-",
    isLoading,
  };
}

export function useMonthlyApprovedPasses(companyName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["monthly-approved-passes", companyName],
    queryFn: () => getMonthlyApprovedPasses(companyName),
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    ...(data ?? {
      month01: "-",
      month02: "-",
      month03: "-",
      month04: "-",
      month05: "-",
      month06: "-",
      month07: "-",
      month08: "-",
      month09: "-",
      month10: "-",
      month11: "-",
      month12: "-",
    }),
    isLoading,
  };
}

export function useExamsAboutToExpire(companyName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["exams-about-to-expire", companyName],
    queryFn: () => getExamsAboutToExpire(companyName),
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    ...(data ?? { today: "-", oneDay: "-", threeDays: "-", fiveDays: "-" }),
    isLoading,
  };
}

export function useVehicleDocumentsAboutToExpire(companyName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["vehicle-documents-about-to-expire", companyName],
    queryFn: () => getVehicleDocumentsAboutToExpire(companyName),
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    ...(data ?? { today: "-", oneDay: "-", threeDays: "-", fiveDays: "-" }),
    isLoading,
  };
}

export function useVisitorPass(companyName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["visitor-pass", companyName],
    queryFn: () => getVisitorPass(companyName),
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    ...(data ?? {
      approvedPassesToday: "-",
      peopleWithPlusOneApprovedNext5Days: "-",
      approvedPassesNext7Days: "-",
    }),
    isLoading,
  };
}
export function useCriticalOperationalAlert(companyName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["critical-operational-alert", companyName],
    queryFn: () => getCriticalOperationalAlert(companyName),
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    ...(data ?? {
      peopleFinishedShiftNotCheckedOut: "-",
      peopleWithExpiredExams: "-",
      vehiclesWithExpiredAccreditation: "-",
      peopleNotRegisteredExit: "-",
      visitorsApprovedNotCheckedOut: "-",
      isCriticalOperationalAlertActive: true,
      peopleOutOfShiftNotCheckedOutWithDailyConsumption: "-",
    }),
    isLoading,
  };
}

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
export function useDashboardInfo() {
  const { data } = useQuery({
    queryKey: ["dashboard-info"],
    queryFn: getDashboardInformation,
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    miningCompanyName: data?.miningCompanyName ?? "",
    lastUpdateSecondsAgo: data?.lastUpdateSecondsAgo ?? 0,
  };
}

export function useLaborStatus() {
  const { data } = useQuery({
    queryKey: ["labor-status"],
    queryFn: getLaborStatus,
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
  };
}

export function useMonthlyApprovedPasses() {
  const { data } = useQuery({
    queryKey: ["monthly-approved-passes"],
    queryFn: getMonthlyApprovedPasses,
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return (
    data ?? {
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
    }
  );
}

export function useExamsAboutToExpire() {
  const { data } = useQuery({
    queryKey: ["exams-about-to-expire"],
    queryFn: getExamsAboutToExpire,
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return data ?? { today: "-", oneDay: "-", threeDays: "-", fiveDays: "-" };
}

export function useVehicleDocumentsAboutToExpire() {
  const { data } = useQuery({
    queryKey: ["vehicle-documents-about-to-expire"],
    queryFn: getVehicleDocumentsAboutToExpire,
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return data ?? { today: "-", oneDay: "-", threeDays: "-", fiveDays: "-" };
}

export function useVisitorPass() {
  const { data } = useQuery({
    queryKey: ["visitor-pass"],
    queryFn: getVisitorPass,
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return (
    data ?? {
      approvedPassesToday: "-",
      peopleWithPlusOneApprovedNext5Days: "-",
      approvedPassesNext7Days: "-",
    }
  );
}

export function useCriticalOperationalAlert() {
  const { data } = useQuery({
    queryKey: ["critical-operational-alert"],
    queryFn: getCriticalOperationalAlert,
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return (
    data ?? {
      peopleFinishedShiftNotCheckedOut: "-",
      peopleWithExpiredExams: "-",
      vehiclesWithExpiredAccreditation: "-",
      peopleNotRegisteredExit: "-",
      visitorsApprovedNotCheckedOut: "-",
      isCriticalOperationalAlertActive: true,
      peopleOutOfShiftNotCheckedOutWithDailyConsumption: "-",
    }
  );
}

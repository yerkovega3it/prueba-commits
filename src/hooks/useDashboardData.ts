import { useQuery } from "@tanstack/react-query";
import { dashboardMetricsApi } from "@/services/dashboard.api";
import {
  DASHBOARD_REFETCH_INTERVAL_MS,
  DASHBOARD_STALE_TIME_MS,
  RETRY_DELAY_MS,
} from "@/constants";

export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardMetricsApi,
    refetchInterval: DASHBOARD_REFETCH_INTERVAL_MS,
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
}

export function useDashboardInfo() {
  const { data } = useDashboardData();
  return {
    miningCompanyName: data?.miningCompanyName ?? "",
    lastUpdateSecondsAgo: data?.lastUpdateSecondsAgo ?? 0,
  };
}

export function useLaborStatus() {
  const { data } = useDashboardData();

  if (!data?.laborStatus) {
    return {
      peopleOnSite: 0,
      maxCapacity: 0,
      occupancyPercentage: 0,
      peopleRepeatedSameDiningHallConsumption: 0,
      peopleOutOfShift: 0,
      peopleDidNotShowUpForFlight: 0,
      peopleEnteredToday: 0,
      peopleOutOfShiftAndNotRegisteredExit: 0,
    };
  }

  return {
    peopleOnSite: data.laborStatus.peopleOnSite,
    peopleRepeatedSameDiningHallConsumption:
      data.laborStatus.peopleRepeatedSameDiningHallConsumption,
    peopleDidNotShowUpForFlight: data.laborStatus.peopleDidNotShowUpForFlight,
    peopleOutOfShiftAndNotRegisteredExit:
      data.laborStatus.peopleOutOfShiftAndNotRegisteredExit,
  };
}

export function useMonthlyApprovedPasses() {
  const { data } = useDashboardData();
  return data?.monthlyApprovedPasses ?? {};
}

export function useExamsAboutToExpire() {
  const { data } = useDashboardData();
  return (
    data?.examsAboutToExpire || {
      today: 0,
      oneDay: 0,
      threeDays: 0,
      fiveDays: 0,
    }
  );
}

export function useVehicleDocumentsAboutToExpire() {
  const { data } = useDashboardData();
  return (
    data?.vehicleDocumentsAboutToExpire ?? {
      today: 0,
      oneDay: 0,
      threeDays: 0,
      fiveDays: 0,
    }
  );
}

export function useVisitorPass() {
  const { data } = useDashboardData();
  return (
    data?.visitorPass ?? {
      approvedPassesToday: 0,
      peopleWithPlusOneApprovedNext5Days: 0,
      approvedPassesNext7Days: 0,
    }
  );
}

export function useCriticalOperationalAlert() {
  const { data } = useDashboardData();
  return (
    data?.criticalOperationalAlert ?? {
      peopleFinishedShiftNotCheckedOut: 0,
      peopleWithExpiredExams: 0,
      vehiclesWithExpiredAccreditation: 0,
      peopleNotRegisteredExit: 0,
      visitorsApprovedNotCheckedOut: 0,
      isCriticalOperationalAlertActive: false,
      peopleOutOfShiftNotCheckedOutWithDailyConsumption: 0,
    }
  );
}

export default useDashboardData;

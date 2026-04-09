import { useQuery } from "@tanstack/react-query";
import { getDashboardInformation } from "@/services/dashboard/dashboardInformation.api";
import { getLaborStatus } from "@/services/dashboard/liveOccupancy/laborStatus.api";
import { getPeopleOnSite } from "@/services/dashboard/liveOccupancy/peopleOnSite.api";
import { getOutOfShiftExitList } from "@/services/dashboard/liveOccupancy/outOfShiftExitList.api";
import { getRepeatedDiningHallList } from "@/services/dashboard/liveOccupancy/repeatedDiningHallList.api";
import { getNoShowFlightList } from "@/services/dashboard/liveOccupancy/noShowFlightList.api";
import { getExamsAboutToExpire } from "@/services/dashboard/expiringExams/examsAboutToExpire.api";
import { getExpiringExamsList } from "@/services/dashboard/expiringExams/expiringExamsList.api";
import { getVehicleDocumentsAboutToExpire } from "@/services/dashboard/expiringLicenses/documentsAboutToExpire.api";
import { getExpiringVehicleDocumentsList } from "@/services/dashboard/expiringLicenses/expiringVehicleDocumentsList.api";
import { getCriticalOperationalAlert } from "@/services/dashboard/criticAlert/criticalAlert.api";
import { getExpiredExamsList } from "@/services/dashboard/criticAlert/expiredExamsList.api";
import { getExpiredVehicleAccreditationList } from "@/services/dashboard/criticAlert/expiredVehicleAccreditationList.api";
import { getOutOfShiftDailyConsumptionList } from "@/services/dashboard/criticAlert/outOfShiftDailyConsumptionList.api";
import { getVisitorsNotCheckedOutList } from "@/services/dashboard/criticAlert/visitorsNotCheckedOutList.api";
import { getVisitorPass } from "@/services/dashboard/monthlyPasses/visitorPass.api";
import { getMonthlyApprovedPasses } from "@/services/dashboard/monthlyPasses/monthlyApprovedPasses.api";
import {
  DASHBOARD_REFETCH_INTERVAL_MS,
  DASHBOARD_STALE_TIME_MS,
  RETRY_DELAY_MS,
} from "@/constants";
import { DEV_BYPASS_DATA } from "@/constants/environments";
import {
  MOCK_DASHBOARD_INFO,
  MOCK_LABOR_STATUS,
  MOCK_MONTHLY_APPROVED_PASSES,
  MOCK_EXAMS_ABOUT_TO_EXPIRE,
  MOCK_VEHICLE_DOCUMENTS_ABOUT_TO_EXPIRE,
  MOCK_VISITOR_PASS,
  MOCK_CRITICAL_OPERATIONAL_ALERT,
  MOCK_PEOPLE_ON_SITE,
  MOCK_PEOPLE_OUT_OF_SHIFT_EXIT,
  MOCK_PEOPLE_REPEATED_DINING,
  MOCK_PEOPLE_NO_SHOW_FLIGHT,
  MOCK_EXPIRING_EXAMS_LIST,
  MOCK_EXPIRING_VEHICLE_DOCUMENTS,
  MOCK_PEOPLE_EXPIRED_EXAMS,
  MOCK_VEHICLES_EXPIRED_ACCREDITATION,
  MOCK_PEOPLE_OUT_OF_SHIFT_DAILY_CONSUMPTION,
  MOCK_VISITORS_NOT_CHECKED_OUT,
} from "@/constants/mockData";
import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";
import type {
  PersonOnSite,
  PersonOutOfShiftExit,
  PersonRepeatedDining,
  PersonNoShowFlight,
  PersonExpiringExam,
  VehicleExpiringDocument,
  PersonExpiredExam,
  VehicleExpiredAccreditation,
  PersonOutOfShiftDailyConsumption,
  VisitorNotCheckedOut,
} from "@/interfaces/dashboard/listEntities.interface";

// ── Shared paginated params ──────────────────────────────────────────────────

export interface UsePaginatedParams {
  companyName: string;
  page: number;
  size: number;
  search?: string;
  sortKey?: string | null;
  sortDir?: "asc" | "desc" | null;
}

function mockPaginate<T extends object>(
  allData: T[],
  { page, size, search, sortKey, sortDir }: UsePaginatedParams,
): PaginatedResponse<T> {
  const q = search?.trim().toLowerCase() ?? "";
  let filtered = q
    ? allData.filter((item) =>
        Object.values(item).some(
          (val) => typeof val === "string" && val.toLowerCase().includes(q),
        ),
      )
    : [...allData];

  if (sortKey && sortDir) {
    filtered.sort((a, b) => {
      const valA = String(
        (a as Record<string, unknown>)[sortKey] ?? "",
      ).toLowerCase();
      const valB = String(
        (b as Record<string, unknown>)[sortKey] ?? "",
      ).toLowerCase();
      const cmp = valA.localeCompare(valB, "es");
      return sortDir === "asc" ? cmp : -cmp;
    });
  }

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / size));
  const safePage = Math.min(Math.max(1, page), pageCount);
  return {
    data: filtered.slice((safePage - 1) * size, safePage * size),
    meta: { pagination: { page: safePage, size, total, pageCount } },
  };
}

function emptyResponse<T>(size: number): PaginatedResponse<T> {
  return {
    data: [],
    meta: { pagination: { page: 1, size, total: 0, pageCount: 0 } },
  };
}

export function useDashboardInfo(companyName: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-info", companyName],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(MOCK_DASHBOARD_INFO)
        : getDashboardInformation(companyName),
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
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(MOCK_LABOR_STATUS)
        : getLaborStatus(companyName),
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
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(MOCK_MONTHLY_APPROVED_PASSES)
        : getMonthlyApprovedPasses(companyName),
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
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(MOCK_EXAMS_ABOUT_TO_EXPIRE)
        : getExamsAboutToExpire(companyName),
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
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(MOCK_VEHICLE_DOCUMENTS_ABOUT_TO_EXPIRE)
        : getVehicleDocumentsAboutToExpire(companyName),
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
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(MOCK_VISITOR_PASS)
        : getVisitorPass(companyName),
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
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(MOCK_CRITICAL_OPERATIONAL_ALERT)
        : getCriticalOperationalAlert(companyName),
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

// ── Paginated list hooks ─────────────────────────────────────────────────────

export function usePeopleOnSite(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["people-on-site", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(mockPaginate(MOCK_PEOPLE_ON_SITE, params))
        : getPeopleOnSite(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response: data ?? emptyResponse<PersonOnSite>(params.size),
    isLoading,
  };
}

export function useOutOfShiftExitList(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["out-of-shift-exit-list", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(mockPaginate(MOCK_PEOPLE_OUT_OF_SHIFT_EXIT, params))
        : getOutOfShiftExitList(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response: data ?? emptyResponse<PersonOutOfShiftExit>(params.size),
    isLoading,
  };
}

export function useRepeatedDiningHallList(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["repeated-dining-hall-list", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(mockPaginate(MOCK_PEOPLE_REPEATED_DINING, params))
        : getRepeatedDiningHallList(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response: data ?? emptyResponse<PersonRepeatedDining>(params.size),
    isLoading,
  };
}

export function useNoShowFlightList(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["no-show-flight-list", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(mockPaginate(MOCK_PEOPLE_NO_SHOW_FLIGHT, params))
        : getNoShowFlightList(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response: data ?? emptyResponse<PersonNoShowFlight>(params.size),
    isLoading,
  };
}

export function useExpiringExamsList(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["expiring-exams-list", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(mockPaginate(MOCK_EXPIRING_EXAMS_LIST, params))
        : getExpiringExamsList(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response: data ?? emptyResponse<PersonExpiringExam>(params.size),
    isLoading,
  };
}

export function useExpiringVehicleDocumentsList(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["expiring-vehicle-documents-list", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(mockPaginate(MOCK_EXPIRING_VEHICLE_DOCUMENTS, params))
        : getExpiringVehicleDocumentsList(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response: data ?? emptyResponse<VehicleExpiringDocument>(params.size),
    isLoading,
  };
}

export function useExpiredExamsList(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["expired-exams-list", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(mockPaginate(MOCK_PEOPLE_EXPIRED_EXAMS, params))
        : getExpiredExamsList(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response: data ?? emptyResponse<PersonExpiredExam>(params.size),
    isLoading,
  };
}

export function useExpiredVehicleAccreditationList(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["expired-vehicle-accreditation-list", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(
            mockPaginate(MOCK_VEHICLES_EXPIRED_ACCREDITATION, params),
          )
        : getExpiredVehicleAccreditationList(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response: data ?? emptyResponse<VehicleExpiredAccreditation>(params.size),
    isLoading,
  };
}

export function useOutOfShiftDailyConsumptionList(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["out-of-shift-daily-consumption-list", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(
            mockPaginate(MOCK_PEOPLE_OUT_OF_SHIFT_DAILY_CONSUMPTION, params),
          )
        : getOutOfShiftDailyConsumptionList(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response:
      data ?? emptyResponse<PersonOutOfShiftDailyConsumption>(params.size),
    isLoading,
  };
}

export function useVisitorsNotCheckedOutList(params: UsePaginatedParams) {
  const { data, isLoading } = useQuery({
    queryKey: ["visitors-not-checked-out-list", ...Object.values(params)],
    queryFn: () =>
      DEV_BYPASS_DATA
        ? Promise.resolve(mockPaginate(MOCK_VISITORS_NOT_CHECKED_OUT, params))
        : getVisitorsNotCheckedOutList(params),
    staleTime: DASHBOARD_STALE_TIME_MS,
    retryDelay: RETRY_DELAY_MS,
  });
  return {
    response: data ?? emptyResponse<VisitorNotCheckedOut>(params.size),
    isLoading,
  };
}

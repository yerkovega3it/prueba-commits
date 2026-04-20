import {
  useDashboardInfo,
  useLaborStatus,
  usePeopleOnSite,
  useOutOfShiftExitList,
  useRepeatedDiningHallList,
  useNoShowFlightList,
  useMonthlyApprovedPasses,
  useVisitorPass,
  useCriticalOperationalAlert,
  useExpiredExamsList,
  useExpiredVehicleAccreditationList,
  useOutOfShiftDailyConsumptionList,
  useVisitorsNotCheckedOutList,
  useExamsAboutToExpire,
  useExpiringExamsList,
  useVehicleDocumentsAboutToExpire,
  useExpiringVehicleDocumentsList,
} from "@/hooks/useDashboardData";
import { useModalState } from "@/hooks/useModalState";

export function useHomeDashboard(companyName: string) {
  const dashboardInfo = useDashboardInfo(companyName);
  const laborStatus = useLaborStatus(companyName);
  const peopleOnSiteModal = useModalState();
  const outOfShiftModal = useModalState();
  const repeatedDiningModal = useModalState();
  const noShowFlightModal = useModalState();

  const { response: peopleOnSiteResponse, isLoading: isPeopleOnSiteLoading } =
    usePeopleOnSite({
      companyName,
      page: peopleOnSiteModal.page,

      search: peopleOnSiteModal.search,
      sortKey: peopleOnSiteModal.sort.key,
      sortDir: peopleOnSiteModal.sort.dir,
    });

  const { response: outOfShiftResponse, isLoading: isOutOfShiftLoading } =
    useOutOfShiftExitList({
      companyName,
      page: outOfShiftModal.page,

      search: outOfShiftModal.search,
      sortKey: outOfShiftModal.sort.key,
      sortDir: outOfShiftModal.sort.dir,
    });

  const {
    response: repeatedDiningResponse,
    isLoading: isRepeatedDiningLoading,
  } = useRepeatedDiningHallList({
    companyName,
    page: repeatedDiningModal.page,
    search: repeatedDiningModal.search,
    sortKey: repeatedDiningModal.sort.key,
    sortDir: repeatedDiningModal.sort.dir,
  });

  const { response: noShowFlightResponse, isLoading: isNoShowFlightLoading } =
    useNoShowFlightList({
      companyName,
      page: noShowFlightModal.page,

      search: noShowFlightModal.search,
      sortKey: noShowFlightModal.sort.key,
      sortDir: noShowFlightModal.sort.dir,
    });

  const monthlyData = useMonthlyApprovedPasses(companyName);
  const visitorPass = useVisitorPass(companyName);

  const criticalAlert = useCriticalOperationalAlert(companyName);
  const expiredExamsModal = useModalState();
  const expiredVehiclesModal = useModalState();
  const outOfShiftConsumptionModal = useModalState();
  const visitorsModal = useModalState();

  const { response: expiredExamsResponse, isLoading: isExpiredExamsLoading } =
    useExpiredExamsList({
      companyName,
      page: expiredExamsModal.page,

      search: expiredExamsModal.search,
      sortKey: expiredExamsModal.sort.key,
      sortDir: expiredExamsModal.sort.dir,
    });

  const {
    response: expiredVehiclesResponse,
    isLoading: isExpiredVehiclesLoading,
  } = useExpiredVehicleAccreditationList({
    companyName,
    page: expiredVehiclesModal.page,
    search: expiredVehiclesModal.search,
    sortKey: expiredVehiclesModal.sort.key,
    sortDir: expiredVehiclesModal.sort.dir,
  });

  const {
    response: outOfShiftConsumptionResponse,
    isLoading: isOutOfShiftConsumptionLoading,
  } = useOutOfShiftDailyConsumptionList({
    companyName,
    page: outOfShiftConsumptionModal.page,
    search: outOfShiftConsumptionModal.search,
    sortKey: outOfShiftConsumptionModal.sort.key,
    sortDir: outOfShiftConsumptionModal.sort.dir,
  });

  const { response: visitorsResponse, isLoading: isVisitorsLoading } =
    useVisitorsNotCheckedOutList({
      companyName,
      page: visitorsModal.page,

      search: visitorsModal.search,
      sortKey: visitorsModal.sort.key,
      sortDir: visitorsModal.sort.dir,
    });

  const examsModal = useModalState();
  const licensesModal = useModalState();
  const examsAboutToExpire = useExamsAboutToExpire(companyName);
  const { response: examsListResponse, isLoading: examsListLoading } =
    useExpiringExamsList({
      companyName,
      page: examsModal.page,

      search: examsModal.search,
      sortKey: examsModal.sort.key,
      sortDir: examsModal.sort.dir,
    });

  const vehicleDocsAboutToExpire =
    useVehicleDocumentsAboutToExpire(companyName);

  const { response: licensesListResponse, isLoading: licensesListLoading } =
    useExpiringVehicleDocumentsList({
      companyName,
      page: licensesModal.page,

      search: licensesModal.search,
      sortKey: licensesModal.sort.key,
      sortDir: licensesModal.sort.dir,
    });

  return {
    dashboardInfo,
    laborStatus,
    liveOccupancy: {
      peopleOnSite: {
        response: peopleOnSiteResponse,
        isLoading: isPeopleOnSiteLoading,
        modal: peopleOnSiteModal,
      },
      outOfShift: {
        response: outOfShiftResponse,
        isLoading: isOutOfShiftLoading,
        modal: outOfShiftModal,
      },
      repeatedDining: {
        response: repeatedDiningResponse,
        isLoading: isRepeatedDiningLoading,
        modal: repeatedDiningModal,
      },
      noShowFlight: {
        response: noShowFlightResponse,
        isLoading: isNoShowFlightLoading,
        modal: noShowFlightModal,
      },
    },
    monthlyData,
    visitorPass,
    criticalAlert,
    criticAlertLists: {
      expiredExams: {
        response: expiredExamsResponse,
        isLoading: isExpiredExamsLoading,
        modal: expiredExamsModal,
      },
      expiredVehicles: {
        response: expiredVehiclesResponse,
        isLoading: isExpiredVehiclesLoading,
        modal: expiredVehiclesModal,
      },
      outOfShiftConsumption: {
        response: outOfShiftConsumptionResponse,
        isLoading: isOutOfShiftConsumptionLoading,
        modal: outOfShiftConsumptionModal,
      },
      visitors: {
        response: visitorsResponse,
        isLoading: isVisitorsLoading,
        modal: visitorsModal,
      },
    },
    examsAboutToExpire,
    exams: {
      response: examsListResponse,
      isLoading: examsListLoading,
      modal: examsModal,
    },
    vehicleDocsAboutToExpire,
    licenses: {
      response: licensesListResponse,
      isLoading: licensesListLoading,
      modal: licensesModal,
    },
  };
}

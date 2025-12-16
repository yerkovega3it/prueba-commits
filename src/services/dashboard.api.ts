import { internalEndpoints } from "@shared/constants/internalEndpoints/internalEndpoints";
import type { Dashboard } from "@/interfaces/dashboard/dashboard.interface";
import { apiService } from "./api.service";

export const dashboardService = {
  async get(): Promise<Dashboard> {
    console.log("Fetching dashboard data...", apiService, internalEndpoints);
    // return apiService.get<Dashboard>({
    //   endpoint: internalEndpoints.DASHBOARD_GET.pathBase,
    // });
    // Mock data with random numbers for demonstration
    function randomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
      miningCompanyName: "Mock Mining Co.",
      lastUpdateSecondsAgo: randomInt(10, 3600),
      laborStatus: {
        peopleOnSite: randomInt(50, 200),
        peopleRepeatedSameDiningHallConsumption: randomInt(0, 10),
        peopleOutOfShiftAndNotRegisteredExit: randomInt(0, 5),
        peopleDidNotShowUpForFlight: randomInt(0, 3),
      },
      monthlyApprovedPasses: {
        month01: randomInt(0, 100),
        month02: randomInt(0, 100),
        month03: randomInt(0, 100),
        month04: randomInt(0, 100),
        month05: randomInt(0, 100),
        month06: randomInt(0, 100),
        month07: randomInt(0, 100),
        month08: randomInt(0, 100),
        month09: randomInt(0, 100),
        month10: randomInt(0, 100),
        month11: randomInt(0, 100),
        month12: randomInt(0, 100),
      },
      examsAboutToExpire: {
        today: randomInt(0, 10),
        oneDay: randomInt(0, 10),
        threeDays: randomInt(0, 10),
        fiveDays: randomInt(0, 10),
      },
      vehicleDocumentsAboutToExpire: {
        today: randomInt(0, 10),
        oneDay: randomInt(0, 10),
        threeDays: randomInt(0, 10),
        fiveDays: randomInt(0, 10),
      },
      visitorPass: {
        approvedPassesToday: randomInt(0, 20),
        peopleWithPlusOneApprovedNext5Days: randomInt(0, 10),
        approvedPassesNext7Days: randomInt(0, 30),
      },
      criticalOperationalAlert: {
        isCriticalOperationalAlertActive: Math.random() < 0.5,
        peopleFinishedShiftNotCheckedOut: randomInt(0, 10),
        peopleWithExpiredExams: randomInt(0, 5),
        vehiclesWithExpiredAccreditation: randomInt(0, 5),
        peopleOutOfShiftNotCheckedOutWithDailyConsumption: randomInt(0, 5),
        visitorsApprovedNotCheckedOut: randomInt(0, 5),
      },
    } as Dashboard;
  },
};

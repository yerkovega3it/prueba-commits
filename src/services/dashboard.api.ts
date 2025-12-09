//import { http } from "@/services/http";
import type { Dashboard } from "@/interfaces/dashboard/dashboard.interface";

export async function dashboardMetricsApi(): Promise<Dashboard> {
  // const { data } = await http.get<Dashboard>("/dashboard/get");
  // console.log("Fetched dashboard data:", data);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        miningCompanyName: "Minera El Teniente",
        lastUpdateSecondsAgo: 21600,
        laborStatus: {
          peopleOnSite: 985,
          peopleOnSitePercentage: 82,
          maxCapacityPeopleOnSite: 1200,
          peopleRepeatedSameDiningHallConsumption: 12,
          peopleOutOfShift: 5,
          peopleDidNotShowUpForFlight: 3,
          peopleEnteredToday: 120,
        },
        monthlyApprovedPasses: {
          month01: 15,
          month02: 11,
          month03: 23,
          month04: 22,
          month05: 31,
          month06: 25,
          month07: 25,
          month08: 27,
          month09: 31,
          month10: 25,
          month11: 28,
          month12: 35,
        },
        examsAboutToExpire: {
          today: 5,
          oneDay: 12,
          threeDays: 28,
          fiveDays: 45,
        },
        vehicleDocumentsAboutToExpire: {
          today: 2,
          oneDay: 8,
          threeDays: 44,
          fiveDays: 22,
        },
        visitorPass: {
          approvedPassesToday: 15,
          peopleWithPlusOneApprovedNext5Days: 8,
          approvedPassesNext7Days: 32,
        },
        criticalOperationalAlert: {
          peopleFinishedShiftNotCheckedOut: 4,
          peopleWithExpiredExams: 7,
          vehiclesWithExpiredAccreditation: 3,
          peopleNotRegisteredExit: 2,
          visitorsApprovedNotCheckedOut: 1,
        },
      });
    }, 500); // Simulate network delay
  });
}

export interface Dashboard {
  miningCompanyName: string;
  lastUpdateSecondsAgo: number;
  laborStatus: LaborStatus;
  monthlyApprovedPasses: { [key: string]: number };
  examsAboutToExpire: SAboutToExpire;
  vehicleDocumentsAboutToExpire: SAboutToExpire;
  visitorPass: VisitorPass;
  criticalOperationalAlert: CriticalOperationalAlert;
}

export interface ComplianceRisk {
  disabledPersonnel: number;
  expiredExamsIn30Days: number;
  expiredExamsPercentage: number;
  expiredOperationalLicenses: number;
  expiredOperationalLicensesPercentage: number;
  riskLevel: string;
  predictiveSuggestion: string;
}

export interface CriticalOperationalAlert {
  peopleFinishedShiftNotCheckedOut: number;
  peopleWithExpiredExams: number;
  vehiclesWithExpiredAccreditation: number;
  peopleNotRegisteredExit: number;
  visitorsApprovedNotCheckedOut: number;
}

export interface SAboutToExpire {
  today: number;
  oneDay: number;
  threeDays: number;
  fiveDays: number;
}

export interface LaborStatus {
  peopleOnSite: number;
  peopleOnSitePercentage: number;
  maxCapacityPeopleOnSite: number;
  peopleRepeatedSameDiningHallConsumption: number;
  peopleOutOfShift: number;
  peopleDidNotShowUpForFlight: number;
  peopleEnteredToday: number;
}

export interface VisitorPass {
  approvedPassesToday: number;
  peopleWithPlusOneApprovedNext5Days: number;
  approvedPassesNext7Days: number;
}

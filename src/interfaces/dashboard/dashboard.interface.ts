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

export interface CriticalOperationalAlert {
  isCriticalOperationalAlertActive: boolean;
  peopleFinishedShiftNotCheckedOut: number;
  peopleWithExpiredExams: number;
  vehiclesWithExpiredAccreditation: number;
  peopleOutOfShiftNotCheckedOutWithDailyConsumption: number;
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
  peopleRepeatedSameDiningHallConsumption: number;
  peopleOutOfShiftAndNotRegisteredExit: number;
  peopleDidNotShowUpForFlight: number;
}

export interface VisitorPass {
  approvedPassesToday: number;
  peopleWithPlusOneApprovedNext5Days: number;
  approvedPassesNext7Days: number;
}

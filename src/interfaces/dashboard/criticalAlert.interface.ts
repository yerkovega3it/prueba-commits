export interface CriticAlert {
  isCriticalOperationalAlertActive: boolean;
  peopleFinishedShiftNotCheckedOut: number;
  peopleWithExpiredExams: number;
  vehiclesWithExpiredAccreditation: number;
  peopleOutOfShiftNotCheckedOutWithDailyConsumption: number;
  visitorsApprovedNotCheckedOut: number;
}

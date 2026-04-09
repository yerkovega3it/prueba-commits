// ── LiveOccupancy StatCards ──────────────────────────────────────────────────

export interface PersonOutOfShiftExit {
  rut: string;
  name: string;
  siteEntryDate: string;
  expectedExit: string;
  currentStatus: string;
}

export interface PersonRepeatedDining {
  service: string;
  rut: string;
  name: string;
  date: string;
  consumptionCount: number;
}

export interface PersonNoShowFlight {
  rut: string;
  name: string;
}

// ── ExpiringExams ────────────────────────────────────────────────────────────

export interface PersonExpiringExam {
  rut: string;
  requirementType: string;
  startDate: string;
  expirationDate: string;
}

// ── ExpiringLicenses ─────────────────────────────────────────────────────────

export interface VehicleExpiringDocument {
  licensePlate: string;
  requirementType: string;
  startDate: string;
  expirationDate: string;
}

// ── CriticAlert ──────────────────────────────────────────────────────────────

export interface PersonExpiredExam {
  rut: string;
  requirementType: string;
  startDate: string;
  expirationDate: string;
}

export interface VehicleExpiredAccreditation {
  licensePlate: string;
  vehicleType: string;
  company: string;
  expirationDate: string;
}

export interface PersonOutOfShiftDailyConsumption {
  rut: string;
  name: string;
  siteEntryDate: string;
  expectedExit: string;
  currentStatus: string;
}

export interface VisitorNotCheckedOut {
  name: string;
  lastName: string;
  rut: string;
  company: string;
  visitType: string;
  entryDate: string;
}

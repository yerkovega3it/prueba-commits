// ── LiveOccupancy StatCards ──────────────────────────────────────────────────

export interface PersonOutOfShiftExit {
  nombre: string;
  apellido: string;
  rut: string;
  empresa: string;
  turno: string;
}

export interface PersonRepeatedDining {
  nombre: string;
  apellido: string;
  rut: string;
  empresa: string;
  cantidadConsumos: number;
}

export interface PersonNoShowFlight {
  nombre: string;
  apellido: string;
  rut: string;
  empresa: string;
  vuelo: string;
}

// ── ExpiringExams ────────────────────────────────────────────────────────────

export interface PersonExpiringExam {
  nombre: string;
  apellido: string;
  rut: string;
  empresa: string;
  examen: string;
  fechaVencimiento: string;
  diasRestantes: number;
}

// ── ExpiringLicenses ─────────────────────────────────────────────────────────

export interface VehicleExpiringDocument {
  patente: string;
  tipoVehiculo: string;
  empresa: string;
  documento: string;
  fechaVencimiento: string;
  diasRestantes: number;
}

// ── CriticAlert ──────────────────────────────────────────────────────────────

export interface PersonExpiredExam {
  nombre: string;
  apellido: string;
  rut: string;
  empresa: string;
  examen: string;
  fechaVencimiento: string;
}

export interface VehicleExpiredAccreditation {
  patente: string;
  tipoVehiculo: string;
  empresa: string;
  fechaVencimiento: string;
}

export interface PersonOutOfShiftDailyConsumption {
  nombre: string;
  apellido: string;
  rut: string;
  empresa: string;
  consumoEnCasino: string;
}

export interface VisitorNotCheckedOut {
  nombre: string;
  apellido: string;
  rut: string;
  empresa: string;
  fechaIngreso: string;
  tipoVisita: string;
}

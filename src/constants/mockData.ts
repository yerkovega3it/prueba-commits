export const MOCK_DASHBOARD_INFO = {
  miningCompanyName: "Minera Los Pelambres",
  lastUpdateSecondsAgo: 0,
};

export const MOCK_LABOR_STATUS = {
  peopleOnSite: 985,
  peopleOutOfShiftAndNotRegisteredExit: 11,
  peopleRepeatedSameDiningHallConsumption: 12,
  peopleDidNotShowUpForFlight: 6,
};

export const MOCK_MONTHLY_APPROVED_PASSES = {
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
};

export const MOCK_EXAMS_ABOUT_TO_EXPIRE = {
  today: 5,
  oneDay: 5,
  threeDays: 10,
  fiveDays: 4,
};

export const MOCK_VEHICLE_DOCUMENTS_ABOUT_TO_EXPIRE = {
  today: 12,
  oneDay: 5,
  threeDays: 10,
  fiveDays: 4,
};

export const MOCK_VISITOR_PASS = {
  approvedPassesToday: 23,
  peopleWithPlusOneApprovedNext5Days: 12,
  approvedPassesNext7Days: 45,
};

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

export type { PersonOnSite };

export const MOCK_PEOPLE_ON_SITE: PersonOnSite[] = [
  {
    rut: "12.345.678-9",
    name: "Juan Pérez Silva",
    entryDate: "07/04/2026",
  },
  {
    rut: "9.876.543-2",
    name: "María González Rojas",
    entryDate: "07/04/2026",
  },
  {
    rut: "15.234.567-K",
    name: "Carlos Muñoz Díaz",
    entryDate: "07/04/2026",
  },
  {
    rut: "11.987.654-3",
    name: "Ana Ramírez Torres",
    entryDate: "07/04/2026",
  },
  {
    rut: "13.456.789-1",
    name: "Luis Hernández Vega",
    entryDate: "07/04/2026",
  },
  {
    rut: "10.123.456-7",
    name: "Claudia López Araya",
    entryDate: "07/04/2026",
  },
  {
    rut: "14.567.890-2",
    name: "Roberto Flores Medina",
    entryDate: "07/04/2026",
  },
  {
    rut: "8.765.432-1",
    name: "Verónica Castro Pinto",
    entryDate: "07/04/2026",
  },
  {
    rut: "16.345.678-5",
    name: "Felipe Morales Soto",
    entryDate: "07/04/2026",
  },
  {
    rut: "12.876.543-0",
    name: "Daniela Ortiz Fuentes",
    entryDate: "07/04/2026",
  },
  {
    rut: "17.123.456-8",
    name: "Andrés Navarro Ríos",
    entryDate: "07/04/2026",
  },
  {
    rut: "9.234.567-4",
    name: "Camila Ramos Espinoza",
    entryDate: "07/04/2026",
  },
  {
    rut: "13.987.654-6",
    name: "Sebastián Torres Bravo",
    entryDate: "07/04/2026",
  },
  {
    rut: "11.345.678-3",
    name: "Valentina Vargas Mena",
    entryDate: "07/04/2026",
  },
  {
    rut: "15.876.543-9",
    name: "Diego Guzmán Parra",
    entryDate: "07/04/2026",
  },
  {
    rut: "10.567.890-K",
    name: "Patricia Rojas Cabrera",
    entryDate: "07/04/2026",
  },
  {
    rut: "14.234.567-7",
    name: "Marco Álvarez Leal",
    entryDate: "07/04/2026",
  },
  {
    rut: "8.987.654-5",
    name: "Isabel Sánchez Vera",
    entryDate: "07/04/2026",
  },
  {
    rut: "16.789.012-3",
    name: "Ricardo Fuentes Moya",
    entryDate: "07/04/2026",
  },
  {
    rut: "12.111.222-4",
    name: "Fernanda Aguilera Cruz",
    entryDate: "07/04/2026",
  },
  {
    rut: "7.654.321-0",
    name: "Pablo Contreras Núñez",
    entryDate: "07/04/2026",
  },
  {
    rut: "13.222.333-5",
    name: "Lorena Espinoza Herrera",
    entryDate: "07/04/2026",
  },
  {
    rut: "18.333.444-6",
    name: "Tomás Reyes Salazar",
    entryDate: "07/04/2026",
  },
  {
    rut: "11.444.555-7",
    name: "Natalia Bustos Campos",
    entryDate: "07/04/2026",
  },
  {
    rut: "14.555.666-8",
    name: "Héctor Vidal Paredes",
    entryDate: "07/04/2026",
  },
  {
    rut: "16.234.567-8",
    name: "Rodrigo Pinto Saavedra",
    entryDate: "07/04/2026",
  },
  {
    rut: "13.567.890-2",
    name: "Catalina Muñoz Lagos",
    entryDate: "07/04/2026",
  },
  {
    rut: "11.890.123-4",
    name: "Eduardo Vega Cisternas",
    entryDate: "07/04/2026",
  },
  {
    rut: "14.123.456-6",
    name: "Javiera Soto Méndez",
    entryDate: "07/04/2026",
  },
  {
    rut: "9.456.789-0",
    name: "Mauricio Araya Sandoval",
    entryDate: "07/04/2026",
  },
  {
    rut: "15.789.012-1",
    name: "Francisca Herrera Núñez",
    entryDate: "07/04/2026",
  },
  {
    rut: "12.012.345-3",
    name: "Gonzalo Rojas Espinoza",
    entryDate: "07/04/2026",
  },
  {
    rut: "10.345.678-5",
    name: "Alejandra Contreras Vera",
    entryDate: "07/04/2026",
  },
  {
    rut: "17.678.901-7",
    name: "Cristóbal Fuentes Padilla",
    entryDate: "07/04/2026",
  },
  {
    rut: "8.901.234-9",
    name: "Pamela Salazar Briones",
    entryDate: "07/04/2026",
  },
  {
    rut: "13.234.567-K",
    name: "Ignacio Mena Figueroa",
    entryDate: "07/04/2026",
  },
  {
    rut: "16.890.123-5",
    name: "Sofía Carrasco Ibáñez",
    entryDate: "07/04/2026",
  },
  {
    rut: "11.123.456-2",
    name: "Matías Sepúlveda Olea",
    entryDate: "07/04/2026",
  },
  {
    rut: "14.456.789-4",
    name: "Bárbara Molina Acuña",
    entryDate: "07/04/2026",
  },
  {
    rut: "9.789.012-6",
    name: "Nicolás Peña Lara",
    entryDate: "07/04/2026",
  },
  {
    rut: "15.012.345-8",
    name: "Carolina Ibarra Palma",
    entryDate: "07/04/2026",
  },
  {
    rut: "12.345.679-1",
    name: "Esteban Cárdenas Uribe",
    entryDate: "07/04/2026",
  },
  {
    rut: "10.678.901-3",
    name: "Marcela Olivares Jara",
    entryDate: "07/04/2026",
  },
  {
    rut: "17.901.234-5",
    name: "Álvaro Figueroa Sandoval",
    entryDate: "07/04/2026",
  },
  {
    rut: "8.234.567-7",
    name: "Pilar Mendoza Tapia",
    entryDate: "07/04/2026",
  },
  {
    rut: "13.567.891-9",
    name: "Javier Leal Becerra",
    entryDate: "07/04/2026",
  },
  {
    rut: "16.901.234-K",
    name: "Constanza Vergara Ríos",
    entryDate: "07/04/2026",
  },
  {
    rut: "11.234.568-2",
    name: "Maximiliano Urrutia Caro",
    entryDate: "07/04/2026",
  },
  {
    rut: "14.567.891-4",
    name: "Gabriela Pizarro Daza",
    entryDate: "07/04/2026",
  },
  {
    rut: "9.890.123-6",
    name: "Claudio Tapia Gallegos",
    entryDate: "07/04/2026",
  },
  {
    rut: "15.123.456-8",
    name: "Andrea Briones Salgado",
    entryDate: "07/04/2026",
  },
  {
    rut: "12.456.790-0",
    name: "Rodrigo Campos Núñez",
    entryDate: "07/04/2026",
  },
  {
    rut: "10.789.012-2",
    name: "Sandra Arce Valdebenito",
    entryDate: "07/04/2026",
  },
  {
    rut: "18.012.345-4",
    name: "Jorge Poblete Riffo",
    entryDate: "07/04/2026",
  },
  {
    rut: "8.345.678-6",
    name: "Ximena Donoso Cerda",
    entryDate: "07/04/2026",
  },
  {
    rut: "13.678.901-8",
    name: "Renato Cáceres Alvarado",
    entryDate: "07/04/2026",
  },
  {
    rut: "16.012.345-0",
    name: "Yasna Quezada Moreno",
    entryDate: "07/04/2026",
  },
  {
    rut: "11.345.679-2",
    name: "Waldo Baeza Cornejo",
    entryDate: "07/04/2026",
  },
  {
    rut: "14.678.902-4",
    name: "Elisa Cortez Villarroel",
    entryDate: "07/04/2026",
  },
];

export const MOCK_PEOPLE_ON_SITE_RESPONSE: PaginatedResponse<PersonOnSite> = {
  data: MOCK_PEOPLE_ON_SITE.slice(0, 10),
  meta: {
    pagination: {
      page: 1,
      size: 10,
      total: MOCK_PEOPLE_ON_SITE.length,
      pageCount: Math.ceil(MOCK_PEOPLE_ON_SITE.length / 10),
    },
  },
};

// ── LiveOccupancy StatCard mocks ─────────────────────────────────────────────

export const MOCK_PEOPLE_OUT_OF_SHIFT_EXIT: PersonOutOfShiftExit[] = [
  {
    rut: "10.123.456-7",
    name: "Claudia López Araya",
    siteEntryDate: "06/04/2026",
    expectedExit: "07/04/2026",
    currentStatus: { id: 1, name: "Fuera de turno" },
  },
  {
    rut: "9.876.543-2",
    name: "María González Rojas",
    siteEntryDate: "06/04/2026",
    expectedExit: "07/04/2026",
    currentStatus: { id: 2, name: "En faena" },
  },
  {
    rut: "12.876.543-0",
    name: "Daniela Ortiz Fuentes",
    siteEntryDate: "06/04/2026",
    expectedExit: "07/04/2026",
    currentStatus: { id: 1, name: "Fuera de turno" },
  },
  {
    rut: "11.345.678-3",
    name: "Valentina Vargas Mena",
    siteEntryDate: "06/04/2026",
    expectedExit: "07/04/2026",
    currentStatus: { id: 2, name: "En faena" },
  },
  {
    rut: "12.111.222-4",
    name: "Fernanda Aguilera Cruz",
    siteEntryDate: "06/04/2026",
    expectedExit: "07/04/2026",
    currentStatus: { id: 1, name: "Fuera de turno" },
  },
  {
    rut: "11.444.555-7",
    name: "Natalia Bustos Campos",
    siteEntryDate: "06/04/2026",
    expectedExit: "07/04/2026",
    currentStatus: { id: 2, name: "En faena" },
  },
  {
    rut: "12.345.678-9",
    name: "Juan Pérez Silva",
    siteEntryDate: "05/04/2026",
    expectedExit: "06/04/2026",
    currentStatus: { id: 1, name: "Fuera de turno" },
  },
  {
    rut: "15.234.567-K",
    name: "Carlos Muñoz Díaz",
    siteEntryDate: "05/04/2026",
    expectedExit: "06/04/2026",
    currentStatus: { id: 2, name: "En faena" },
  },
  {
    rut: "13.456.789-1",
    name: "Luis Hernández Vega",
    siteEntryDate: "05/04/2026",
    expectedExit: "06/04/2026",
    currentStatus: { id: 1, name: "Fuera de turno" },
  },
  {
    rut: "14.567.890-2",
    name: "Roberto Flores Medina",
    siteEntryDate: "05/04/2026",
    expectedExit: "06/04/2026",
    currentStatus: { id: 2, name: "En faena" },
  },
  {
    rut: "16.345.678-5",
    name: "Felipe Morales Soto",
    siteEntryDate: "05/04/2026",
    expectedExit: "06/04/2026",
    currentStatus: { id: 1, name: "Fuera de turno" },
  },
];

export const MOCK_PEOPLE_REPEATED_DINING: PersonRepeatedDining[] = [
  {
    service: "Casino Principal",
    rut: "17.123.456-8",
    name: "Andrés Navarro Ríos",
    date: "09/04/2026",
    consumptionCount: 3,
  },
  {
    service: "Casino Principal",
    rut: "9.234.567-4",
    name: "Camila Ramos Espinoza",
    date: "09/04/2026",
    consumptionCount: 2,
  },
  {
    service: "Comedor Norte",
    rut: "13.987.654-6",
    name: "Sebastián Torres Bravo",
    date: "09/04/2026",
    consumptionCount: 2,
  },
  {
    service: "Casino Principal",
    rut: "15.876.543-9",
    name: "Diego Guzmán Parra",
    date: "09/04/2026",
    consumptionCount: 3,
  },
  {
    service: "Comedor Norte",
    rut: "10.567.890-K",
    name: "Patricia Rojas Cabrera",
    date: "09/04/2026",
    consumptionCount: 2,
  },
  {
    service: "Casino Sur",
    rut: "14.234.567-7",
    name: "Marco Álvarez Leal",
    date: "09/04/2026",
    consumptionCount: 2,
  },
  {
    service: "Casino Principal",
    rut: "8.987.654-5",
    name: "Isabel Sánchez Vera",
    date: "09/04/2026",
    consumptionCount: 3,
  },
  {
    service: "Casino Sur",
    rut: "16.789.012-3",
    name: "Ricardo Fuentes Moya",
    date: "09/04/2026",
    consumptionCount: 2,
  },
  {
    service: "Comedor Norte",
    rut: "7.654.321-0",
    name: "Pablo Contreras Núñez",
    date: "09/04/2026",
    consumptionCount: 2,
  },
  {
    service: "Casino Principal",
    rut: "13.222.333-5",
    name: "Lorena Espinoza Herrera",
    date: "09/04/2026",
    consumptionCount: 3,
  },
  {
    service: "Casino Sur",
    rut: "18.333.444-6",
    name: "Tomás Reyes Salazar",
    date: "09/04/2026",
    consumptionCount: 2,
  },
  {
    service: "Comedor Norte",
    rut: "14.555.666-8",
    name: "Héctor Vidal Paredes",
    date: "09/04/2026",
    consumptionCount: 2,
  },
];

export const MOCK_PEOPLE_NO_SHOW_FLIGHT: PersonNoShowFlight[] = [
  { rut: "11.987.654-3", name: "Ana Ramírez Torres" },
  { rut: "8.765.432-1", name: "Verónica Castro Pinto" },
  { rut: "13.222.333-5", name: "Lorena Espinoza Herrera" },
  { rut: "18.333.444-6", name: "Tomás Reyes Salazar" },
  { rut: "14.555.666-8", name: "Héctor Vidal Paredes" },
  { rut: "7.654.321-0", name: "Pablo Contreras Núñez" },
];

// ── ExpiringExams mocks ──────────────────────────────────────────────────────

export const MOCK_EXPIRING_EXAMS_LIST: PersonExpiringExam[] = [
  {
    rut: "12.345.678-9",
    requirementType: "Certificado de Altura Física",
    startDate: "08/04/2025",
    expirationDate: "08/04/2026",
  },
  {
    rut: "15.234.567-K",
    requirementType: "Psicosensométrico",
    startDate: "09/04/2025",
    expirationDate: "09/04/2026",
  },
  {
    rut: "11.987.654-3",
    requirementType: "Certificado de Altura Física",
    startDate: "09/04/2025",
    expirationDate: "09/04/2026",
  },
  {
    rut: "17.123.456-8",
    requirementType: "Certificado Salud y Examen de Altura",
    startDate: "11/04/2025",
    expirationDate: "11/04/2026",
  },
  {
    rut: "9.234.567-4",
    requirementType: "Psicosensométrico",
    startDate: "11/04/2025",
    expirationDate: "11/04/2026",
  },
  {
    rut: "15.876.543-9",
    requirementType: "Certificado de Altura Física",
    startDate: "13/04/2025",
    expirationDate: "13/04/2026",
  },
  {
    rut: "10.567.890-K",
    requirementType: "Psicosensométrico",
    startDate: "13/04/2025",
    expirationDate: "13/04/2026",
  },
  {
    rut: "14.234.567-7",
    requirementType: "Certificado Salud y Examen de Altura",
    startDate: "13/04/2025",
    expirationDate: "13/04/2026",
  },
];

// ── ExpiringLicenses mocks ───────────────────────────────────────────────────

export const MOCK_EXPIRING_VEHICLE_DOCUMENTS: VehicleExpiringDocument[] = [
  {
    licensePlate: "BBGJ-45",
    requirementType: "Revisión Técnica",
    startDate: "08/04/2025",
    expirationDate: "08/04/2026",
  },
  {
    licensePlate: "FHKM-23",
    requirementType: "Seguro Obligatorio",
    startDate: "08/04/2025",
    expirationDate: "08/04/2026",
  },
  {
    licensePlate: "CLRT-78",
    requirementType: "Revisión Técnica",
    startDate: "08/04/2025",
    expirationDate: "08/04/2026",
  },
  {
    licensePlate: "WXPQ-12",
    requirementType: "Revisión Técnica",
    startDate: "09/04/2025",
    expirationDate: "09/04/2026",
  },
  {
    licensePlate: "AMNT-56",
    requirementType: "Permiso de Circulación",
    startDate: "09/04/2025",
    expirationDate: "09/04/2026",
  },
  {
    licensePlate: "DRYZ-89",
    requirementType: "Revisión Técnica",
    startDate: "11/04/2025",
    expirationDate: "11/04/2026",
  },
  {
    licensePlate: "JKVB-34",
    requirementType: "Seguro Obligatorio",
    startDate: "11/04/2025",
    expirationDate: "11/04/2026",
  },
  {
    licensePlate: "PLSW-67",
    requirementType: "Revisión Técnica",
    startDate: "13/04/2025",
    expirationDate: "13/04/2026",
  },
  {
    licensePlate: "TGFC-21",
    requirementType: "Permiso de Circulación",
    startDate: "13/04/2025",
    expirationDate: "13/04/2026",
  },
  {
    licensePlate: "NHQE-48",
    requirementType: "Revisión Técnica",
    startDate: "13/04/2025",
    expirationDate: "13/04/2026",
  },
  {
    licensePlate: "UXMO-93",
    requirementType: "Seguro Obligatorio",
    startDate: "13/04/2025",
    expirationDate: "13/04/2026",
  },
  {
    licensePlate: "ZKRV-15",
    requirementType: "Revisión Técnica",
    startDate: "13/04/2025",
    expirationDate: "13/04/2026",
  },
];

// ── CriticAlert mocks ────────────────────────────────────────────────────────

export const MOCK_PEOPLE_EXPIRED_EXAMS: PersonExpiredExam[] = [
  {
    rut: "10.123.456-7",
    requirementType: "Psicosensométrico",
    startDate: "01/03/2025",
    expirationDate: "01/03/2026",
  },
  {
    rut: "9.876.543-2",
    requirementType: "Certificado de Altura Física",
    startDate: "15/02/2025",
    expirationDate: "15/02/2026",
  },
  {
    rut: "11.345.678-3",
    requirementType: "Certificado Salud y Examen de Altura",
    startDate: "20/01/2025",
    expirationDate: "20/01/2026",
  },
  {
    rut: "12.111.222-4",
    requirementType: "Psicosensométrico",
    startDate: "05/03/2025",
    expirationDate: "05/03/2026",
  },
  {
    rut: "11.444.555-7",
    requirementType: "Certificado de Altura Física",
    startDate: "28/02/2025",
    expirationDate: "28/02/2026",
  },
];

export const MOCK_VEHICLES_EXPIRED_ACCREDITATION: VehicleExpiredAccreditation[] =
  [
    {
      licensePlate: "BBGJ-45",
      vehicleType: "Camión",
      company: "Transportes del Norte",
      expirationDate: "10/03/2026",
    },
    {
      licensePlate: "FHKM-23",
      vehicleType: "Camioneta",
      company: "Minera Los Pelambres",
      expirationDate: "01/02/2026",
    },
    {
      licensePlate: "CLRT-78",
      vehicleType: "Bus",
      company: "Contratista ABC",
      expirationDate: "15/03/2026",
    },
    {
      licensePlate: "WXPQ-12",
      vehicleType: "Jeep",
      company: "Servicios XYZ",
      expirationDate: "20/01/2026",
    },
    {
      licensePlate: "AMNT-56",
      vehicleType: "Camión",
      company: "Transportes del Norte",
      expirationDate: "05/03/2026",
    },
    {
      licensePlate: "DRYZ-89",
      vehicleType: "Retroexcavadora",
      company: "Minera Los Pelambres",
      expirationDate: "28/02/2026",
    },
    {
      licensePlate: "JKVB-34",
      vehicleType: "Grúa",
      company: "Contratista ABC",
      expirationDate: "12/03/2026",
    },
    {
      licensePlate: "PLSW-67",
      vehicleType: "Camioneta",
      company: "Servicios XYZ",
      expirationDate: "08/03/2026",
    },
    {
      licensePlate: "TGFC-21",
      vehicleType: "Bus",
      company: "Transportes del Norte",
      expirationDate: "14/02/2026",
    },
    {
      licensePlate: "NHQE-48",
      vehicleType: "Camión",
      company: "Minera Los Pelambres",
      expirationDate: "22/03/2026",
    },
    {
      licensePlate: "UXMO-93",
      vehicleType: "Camioneta",
      company: "Contratista ABC",
      expirationDate: "03/03/2026",
    },
    {
      licensePlate: "ZKRV-15",
      vehicleType: "Jeep",
      company: "Servicios XYZ",
      expirationDate: "18/02/2026",
    },
  ];

export const MOCK_PEOPLE_OUT_OF_SHIFT_DAILY_CONSUMPTION: PersonOutOfShiftDailyConsumption[] =
  [
    {
      rut: "10.123.456-7",
      name: "Claudia López Araya",
      siteEntryDate: "06/04/2026",
      expectedExit: "07/04/2026",
      currentStatus: { id: 1, name: "Fuera de turno" },
    },
    {
      rut: "12.876.543-0",
      name: "Daniela Ortiz Fuentes",
      siteEntryDate: "06/04/2026",
      expectedExit: "07/04/2026",
      currentStatus: { id: 2, name: "En faena" },
    },
    {
      rut: "9.876.543-2",
      name: "María González Rojas",
      siteEntryDate: "06/04/2026",
      expectedExit: "07/04/2026",
      currentStatus: { id: 1, name: "Fuera de turno" },
    },
    {
      rut: "11.345.678-3",
      name: "Valentina Vargas Mena",
      siteEntryDate: "06/04/2026",
      expectedExit: "07/04/2026",
      currentStatus: { id: 2, name: "En faena" },
    },
    {
      rut: "12.111.222-4",
      name: "Fernanda Aguilera Cruz",
      siteEntryDate: "06/04/2026",
      expectedExit: "07/04/2026",
      currentStatus: { id: 1, name: "Fuera de turno" },
    },
    {
      rut: "11.444.555-7",
      name: "Natalia Bustos Campos",
      siteEntryDate: "06/04/2026",
      expectedExit: "07/04/2026",
      currentStatus: { id: 2, name: "En faena" },
    },
  ];

export const MOCK_VISITORS_NOT_CHECKED_OUT: VisitorNotCheckedOut[] = [
  {
    name: "Rodrigo",
    lastName: "Pinto Saavedra",
    rut: "16.234.567-8",
    company: "Empresa Visitante A",
    visitType: "Proveedor",
    entryDate: "07/04/2026",
  },
  {
    name: "Catalina",
    lastName: "Muñoz Lagos",
    rut: "13.567.890-2",
    company: "Empresa Visitante B",
    visitType: "Inspector",
    entryDate: "07/04/2026",
  },
  {
    name: "Eduardo",
    lastName: "Vega Cisternas",
    rut: "11.890.123-4",
    company: "Empresa Visitante C",
    visitType: "Proveedor",
    entryDate: "08/04/2026",
  },
  {
    name: "Javiera",
    lastName: "Soto Méndez",
    rut: "14.123.456-6",
    company: "Empresa Visitante A",
    visitType: "Auditor",
    entryDate: "08/04/2026",
  },
  {
    name: "Mauricio",
    lastName: "Araya Sandoval",
    rut: "9.456.789-0",
    company: "Empresa Visitante D",
    visitType: "Inspector",
    entryDate: "08/04/2026",
  },
  {
    name: "Francisca",
    lastName: "Herrera Núñez",
    rut: "15.789.012-1",
    company: "Empresa Visitante B",
    visitType: "Proveedor",
    entryDate: "08/04/2026",
  },
  {
    name: "Gonzalo",
    lastName: "Rojas Espinoza",
    rut: "12.012.345-3",
    company: "Empresa Visitante C",
    visitType: "Inspector",
    entryDate: "08/04/2026",
  },
  {
    name: "Alejandra",
    lastName: "Contreras Vera",
    rut: "10.345.678-5",
    company: "Empresa Visitante D",
    visitType: "Proveedor",
    entryDate: "08/04/2026",
  },
  {
    name: "Cristóbal",
    lastName: "Fuentes Padilla",
    rut: "17.678.901-7",
    company: "Empresa Visitante A",
    visitType: "Auditor",
    entryDate: "08/04/2026",
  },
  {
    name: "Pamela",
    lastName: "Salazar Briones",
    rut: "8.901.234-9",
    company: "Empresa Visitante B",
    visitType: "Inspector",
    entryDate: "08/04/2026",
  },
  {
    name: "Ignacio",
    lastName: "Mena Figueroa",
    rut: "13.234.567-K",
    company: "Empresa Visitante C",
    visitType: "Proveedor",
    entryDate: "08/04/2026",
  },
];

export const MOCK_CRITICAL_OPERATIONAL_ALERT = {
  isCriticalOperationalAlertActive: true,
  peopleFinishedShiftNotCheckedOut: 3,
  peopleWithExpiredExams: 5,
  vehiclesWithExpiredAccreditation: 12,
  peopleOutOfShiftNotCheckedOutWithDailyConsumption: 6,
  visitorsApprovedNotCheckedOut: 11,
  peopleNotRegisteredExit: 11,
};

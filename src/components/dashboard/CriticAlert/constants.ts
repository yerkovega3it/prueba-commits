import type { ColumnDef } from "@/interfaces/dashboard/dashboardModal.interface";
import type {
  PersonExpiredExam,
  VehicleExpiredAccreditation,
  PersonOutOfShiftDailyConsumption,
  VisitorNotCheckedOut,
} from "@/interfaces/dashboard/listEntities.interface";
import { colorRenderStatus } from "@/utils/colorRenderStatus";

export const EXPIRED_EXAMS_COLUMNS: ColumnDef<PersonExpiredExam>[] = [
  { key: "rut", label: "RUT", sortable: true },
  { key: "requirementType", label: "Tipo de requisito", sortable: true },
  { key: "startDate", label: "Fecha de inicio", sortable: true },
  { key: "expirationDate", label: "Fecha de vencimiento", sortable: true },
];

export const EXPIRED_VEHICLES_COLUMNS: ColumnDef<VehicleExpiredAccreditation>[] =
  [
    { key: "licensePlate", label: "Patente", sortable: true },
    { key: "vehicleType", label: "Tipo", sortable: true },
    { key: "company", label: "Empresa", sortable: true },
    { key: "expirationDate", label: "Venció", sortable: true },
  ];

export const OUT_OF_SHIFT_CONSUMPTION_COLUMNS: ColumnDef<PersonOutOfShiftDailyConsumption>[] =
  [
    { key: "rut", label: "RUT", sortable: true },
    { key: "name", label: "Nombre", sortable: true },
    { key: "siteEntryDate", label: "Fecha de entrada a faena", sortable: true },
    { key: "expectedExit", label: "Salida esperada", sortable: true },
    {
      key: "currentStatus",
      label: "Estado actual",
      sortable: false,
      render: (row) => colorRenderStatus(row.currentStatus),
    },
  ];

export const VISITORS_NOT_CHECKED_OUT_COLUMNS: ColumnDef<VisitorNotCheckedOut>[] =
  [
    { key: "name", label: "Nombre", sortable: true },
    { key: "lastName", label: "Apellido", sortable: true },
    { key: "rut", label: "RUT", sortable: true },
    { key: "company", label: "Empresa", sortable: true },
    { key: "visitType", label: "Tipo visita", sortable: true },
    { key: "entryDate", label: "Ingresó", sortable: true },
  ];

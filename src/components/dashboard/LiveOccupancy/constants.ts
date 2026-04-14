import type { ColumnDef } from "@/interfaces/dashboard/dashboardModal.interface";
import type {
  PersonOutOfShiftExit,
  PersonRepeatedDining,
  PersonNoShowFlight,
} from "@/interfaces/dashboard/listEntities.interface";
import type { PersonOnSite } from "@/constants/mockData";
import { colorRenderStatus } from "@/utils/colorRenderStatus";

export const PAGE_SIZE = 10;

export const PEOPLE_ON_SITE_COLUMNS: ColumnDef<PersonOnSite>[] = [
  { key: "rut", label: "RUT", sortable: true },
  { key: "name", label: "Nombre", sortable: true },
  { key: "entryDate", label: "Fecha de entrada", sortable: true },
];

export const OUT_OF_SHIFT_COLUMNS: ColumnDef<PersonOutOfShiftExit>[] = [
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

export const REPEATED_DINING_COLUMNS: ColumnDef<PersonRepeatedDining>[] = [
  { key: "service", label: "Servicio", sortable: true },
  { key: "rut", label: "RUT", sortable: true },
  { key: "name", label: "Nombre", sortable: true },
  { key: "date", label: "Fecha", sortable: true },
  { key: "consumptionCount", label: "Cantidad de consumos", sortable: true },
];

export const NO_SHOW_FLIGHT_COLUMNS: ColumnDef<PersonNoShowFlight>[] = [
  { key: "rut", label: "RUT", sortable: true },
  { key: "name", label: "Nombre", sortable: true },
];

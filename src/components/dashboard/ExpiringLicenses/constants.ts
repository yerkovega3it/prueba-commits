import type { ColumnDef } from "@/interfaces/dashboard/dashboardModal.interface";
import type { VehicleExpiringDocument } from "@/interfaces/dashboard/listEntities.interface";

export const PAGE_SIZE = 10;

export const COLUMNS: ColumnDef<VehicleExpiringDocument>[] = [
  { key: "licensePlate", label: "Patente", sortable: true },
  { key: "requirementType", label: "Tipo de requisito", sortable: true },
  { key: "startDate", label: "Fecha de inicio", sortable: true },
  { key: "expirationDate", label: "Fecha de vencimiento", sortable: true },
];

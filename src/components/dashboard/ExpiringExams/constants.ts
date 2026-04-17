import type { ColumnDef } from "@/interfaces/dashboard/dashboardModal.interface";
import type { PersonExpiringExam } from "@/interfaces/dashboard/listEntities.interface";

export const COLUMNS: ColumnDef<PersonExpiringExam>[] = [
  { key: "rut", label: "RUT", sortable: true },
  { key: "requirementType", label: "Tipo de requisito", sortable: true },
  { key: "startDate", label: "Fecha de inicio", sortable: true },
  { key: "expirationDate", label: "Fecha de vencimiento", sortable: true },
];

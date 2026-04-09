import { useState } from "react";
import DashboardCard from "../shared/DashboardCard";
import DashboardLineChart from "@/components/charts/LineChart/LineChart";
import DashboardModal, {
  type ColumnDef,
  type DashboardModalSortState,
} from "@/components/dashboard/shared/DashboardModal";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useExamsAboutToExpire, useExpiringExamsList } from "@/hooks/useDashboardData";
import Skeleton from "@/components/shared/Skeleton";
import type { PersonExpiringExam } from "@/interfaces/dashboard/listEntities.interface";

const PAGE_SIZE = 10;

const COLUMNS: ColumnDef<PersonExpiringExam>[] = [
  { key: "nombre", label: "Nombre", sortable: true },
  { key: "apellido", label: "Apellido", sortable: true },
  { key: "rut", label: "RUT", sortable: true },
  { key: "empresa", label: "Empresa", sortable: true },
  { key: "examen", label: "Examen", sortable: true },
  { key: "fechaVencimiento", label: "Vence", sortable: true },
  {
    key: "diasRestantes",
    label: "Días",
    sortable: true,
    render: (row) => (
      <span
        className={
          row.diasRestantes === 0
            ? "text-critic font-bold"
            : row.diasRestantes <= 1
              ? "text-alert font-bold"
              : "text-white"
        }
      >
        {row.diasRestantes === 0 ? "Hoy" : `${row.diasRestantes}d`}
      </span>
    ),
  },
];

function ExpiringExams({ companyName }: { companyName: string }) {
  const { today, oneDay, threeDays, fiveDays, isLoading } =
    useExamsAboutToExpire(companyName);

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<DashboardModalSortState>({ key: null, dir: null });

  const { response, isLoading: isListLoading } = useExpiringExamsList({
    companyName,
    page,
    size: PAGE_SIZE,
    search,
    sortKey: sort.key,
    sortDir: sort.dir,
  });

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }
  function handleSort(key: string) {
    setSort((prev) => {
      if (prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return { key: null, dir: null };
    });
    setPage(1);
  }
  function handleClose() {
    setIsOpen(false);
    setPage(1);
    setSearch("");
    setSort({ key: null, dir: null });
  }

  return (
    <>
      <DashboardCard
        title="EXÁMENES POR VENCER"
        icon={faUser}
        titleClassName="text-xl font-bold text-approved"
        contentClassName="flex flex-col md:flex-row items-center gap-3 h-full mt-3"
      >
        <div
          className="shrink-0 w-auto max-w-28 xl:max-w-32 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => !isLoading && setIsOpen(true)}
          title="Ver detalle de exámenes por vencer"
        >
          <p className="text-5xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-center text-approved font-anta">
            {isLoading ? (
              <span className="flex justify-center items-center w-full h-full">
                <Skeleton width={60} height={40} className="mx-auto" />
              </span>
            ) : (
              today
            )}
          </p>
          <p className="text-sm md:text-sm lg:text-base xl:text-lg text-white text-center mt-1">
            Exámenes vencen hoy
          </p>
        </div>
        <DashboardLineChart
          oneDay={oneDay}
          threeDays={threeDays}
          fiveDays={fiveDays}
        />
      </DashboardCard>

      <DashboardModal
        isOpen={isOpen}
        onClose={handleClose}
        title={`Exámenes por vencer (${response.meta.pagination.total})`}
        response={response}
        isLoading={isListLoading}
        columns={COLUMNS}
        entityLabel="personas"
        searchPlaceholder="Buscar por nombre, RUT o examen"
        search={search}
        onSearch={handleSearch}
        sort={sort}
        onSort={handleSort}
        onPageChange={setPage}
      />
    </>
  );
}

export default ExpiringExams;

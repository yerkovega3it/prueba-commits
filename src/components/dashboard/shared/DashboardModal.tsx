import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSliders,
  faFileArrowDown,
  faSort,
  faSortUp,
  faSortDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { PaginatedResponse } from "@/interfaces/dashboard/paginatedResponse.interface";

export interface DashboardModalSortState {
  key: string | null;
  dir: "asc" | "desc" | null;
}

export interface ColumnDef<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DashboardModalProps<T extends object> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  response: PaginatedResponse<T>;
  isLoading?: boolean;
  columns: ColumnDef<T>[];
  entityLabel?: string;
  searchPlaceholder?: string;
  search: string;
  onSearch: (value: string) => void;
  sort: DashboardModalSortState;
  onSort: (key: string) => void;
  onPageChange: (page: number) => void;
}

function SortIcon({
  colKey,
  sort,
}: {
  colKey: string;
  sort: DashboardModalSortState;
}) {
  if (sort.key !== colKey)
    return (
      <FontAwesomeIcon
        icon={faSort}
        className="text-white/40 text-[10px] ml-1"
      />
    );
  if (sort.dir === "asc")
    return (
      <FontAwesomeIcon
        icon={faSortUp}
        className="text-approved text-[10px] ml-1"
      />
    );
  return (
    <FontAwesomeIcon
      icon={faSortDown}
      className="text-approved text-[10px] ml-1"
    />
  );
}

function getPageNumbers(page: number, pageCount: number): (number | "...")[] {
  // For small page counts, show all pages with no ellipsis
  if (pageCount <= 5) return Array.from({ length: pageCount }, (_, i) => i + 1);

  // Always show: first, last, current, and its immediate neighbours
  // so the user can always advance or go back one step by clicking
  const alwaysShow = new Set([1, pageCount, page, page - 1, page + 1].filter(
    (p) => p >= 1 && p <= pageCount,
  ));

  const sorted = Array.from(alwaysShow).sort((a, b) => a - b);

  // Insert "..." wherever consecutive pages are not adjacent
  return sorted.reduce<(number | "...")[]>((acc, p, i) => {
    if (i > 0 && p - (sorted[i - 1]) > 1) acc.push("...");
    acc.push(p);
    return acc;
  }, []);
}

function DashboardModal<T extends object>({
  isOpen,
  onClose,
  title,
  response,
  isLoading,
  columns,
  entityLabel = "registros",
  searchPlaceholder = "Buscar...",
  search,
  onSearch,
  sort,
  onSort,
  onPageChange,
}: DashboardModalProps<T>) {
  const { data: rows, meta } = response;
  const { page, total, pageCount } = meta.pagination;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-3xl xl:max-w-6xl rounded-3xl flex flex-col bg-main border border-approved py-3 px-3 sm:py-4 sm:px-6 h-[90vh] md:h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="px-3 pt-4 pb-3 sm:px-8 sm:pt-7 sm:pb-5 shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl md:text-[32px] font-normal text-approved leading-none font-aldrich">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white text-4xl leading-none transition-colors -mt-1 cursor-pointer"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
              <div className="flex items-center gap-2 rounded-full px-2 py-2.5 border border-white flex-1">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => onSearch(e.target.value)}
                  className="bg-transparent text-white placeholder-[#707070] text-sm outline-none w-full"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-white text-sm shrink-0"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-white text-sm text-white whitespace-nowrap hover:border-approved transition-colors cursor-pointer">
                <FontAwesomeIcon icon={faSliders} className="text-white" />
                Filtros
              </button>
            </div>
            <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[10px] border border-white text-sm text-white w-full md:w-auto hover:border-approved transition-colors cursor-pointer">
              <FontAwesomeIcon icon={faFileArrowDown} className="text-white" />
              Exportar a Excel
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="overflow-y-auto flex-1">
          <div className="overflow-x-auto min-w-0">
          <table className="w-full min-w-[600px] border-collapse">
            <thead className="sticky top-0 bg-main border-b border-white">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-3 py-2 sm:px-8 sm:py-3 text-left text-sm sm:text-[18px] font-bold text-white transition-colors ${
                      col.sortable
                        ? "cursor-pointer select-none hover:text-approved"
                        : ""
                    }`}
                    onClick={col.sortable ? () => onSort(col.key) : undefined}
                  >
                    {col.label}
                    {col.sortable && <SortIcon colKey={col.key} sort={sort} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-12 text-white/40 text-sm"
                  >
                    Cargando...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-12 text-white/40 text-sm"
                  >
                    No se encontraron resultados
                  </td>
                </tr>
              ) : (
                rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/[0.10] hover:bg-white/[0.04] transition-colors xl:h-14"
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 py-2 sm:px-6 sm:py-3 text-sm sm:text-base text-white"
                      >
                        {col.render
                          ? col.render(row)
                          : String(
                              (row as Record<string, unknown>)[col.key] ?? "",
                            )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>

        {/* ── Pagination ── */}
        <div className="px-3 py-3 sm:px-8 sm:py-5 shrink-0 border-t border-approved/20">
          <p className="text-center text-[#888b8d] text-base mb-3">
            Mostrando{" "}
            <span className="font-bold text-[#fbfbfb]">{rows.length}</span> de{" "}
            <span className="font-bold text-[#fbfbfb]">{total}</span>{" "}
            {entityLabel}
          </p>

          <div className="flex items-center justify-center gap-[11px]">
            <button
              onClick={() => onPageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-25 transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
            </button>

            {getPageNumbers(page, pageCount).map((p, i) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-7 h-7 flex items-center justify-center text-white text-base font-aldrich"
                >
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => onPageChange(p as number)}
                  className={`w-7 h-7 flex items-center justify-center rounded-[4px] text-base font-aldrich bg-black/40 transition-colors cursor-pointer ${
                    page === p
                      ? "text-approved"
                      : "text-white hover:text-approved"
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              onClick={() => onPageChange(Math.min(pageCount, page + 1))}
              disabled={page === pageCount}
              className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-25 transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default DashboardModal;

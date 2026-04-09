import { useState } from "react";
import type { DashboardModalSortState } from "@/interfaces/dashboard/dashboardModal.interface";

export function useModalState() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<DashboardModalSortState>({
    key: null,
    dir: null,
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

  return {
    isOpen,
    setIsOpen,
    page,
    setPage,
    search,
    sort,
    handleSearch,
    handleSort,
    handleClose,
  };
}

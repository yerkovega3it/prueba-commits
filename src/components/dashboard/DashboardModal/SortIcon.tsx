import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import type { DashboardModalSortState } from "@/interfaces/dashboard/dashboardModal.interface";

export function SortIcon({
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

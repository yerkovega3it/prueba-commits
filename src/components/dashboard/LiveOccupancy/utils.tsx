import type { StatusValue } from "@/interfaces/dashboard/listEntities.interface";

export function renderStatus(status: StatusValue) {
  const color = status.id === 2 ? "text-success" : "text-critic";
  return (
    <span className={`flex items-center gap-1.5 ${color}`}>
      <span className="w-2 h-2 rounded-full bg-current shrink-0" />
      {status.name}
    </span>
  );
}

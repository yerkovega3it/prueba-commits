import type { ReactNode } from "react";
import CardTitle from "./CardHeader";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface DashboardCardProps {
  title: string;
  icon?: IconDefinition;
  titleClassName?: string;
  iconClassName?: string;
  children: ReactNode;
  contentClassName?: string;
}

export default function DashboardCard({
  title,
  icon,
  titleClassName = "text-base sm:text-lg lg:text-xl text-approved",
  iconClassName = "text-approved mb-1.5",
  children,
  contentClassName = "flex items-end gap-6 justify-between mt-3",
}: DashboardCardProps) {
  return (
    <div className="col-span-1 p-4 sm:p-5 lg:p-6 rounded-xl bg-main min-h-[200px] sm:h-auto lg:h-[255px]">
      <CardTitle
        title={title}
        icon={icon}
        titleClassName={titleClassName}
        iconClassName={iconClassName}
      />
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

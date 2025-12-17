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
  className?: string;
}

export default function DashboardCard({
  title,
  icon,
  titleClassName = "text-lg md:text-lg text-approved",
  iconClassName = "text-approved mb-1 text-lg md:text-xl lg:text-2xl",
  children,
  contentClassName = "flex items-end gap-8 justify-between mt-2",
  className = "col-span-1 p-4 rounded-3xl bg-main h-full flex flex-col",
}: DashboardCardProps) {
  return (
    <div className={className}>
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

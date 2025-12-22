import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "@/components/shared/Skeleton";

function StatCard({
  value,
  label,
  icon,
  iconClassName = "text-approved text-2xl md:text-3xl lg:text-3xl",
  valueClassName = "text-3xl md:text-4xl lg:text-5xl w-20",
  labelClassName = "text-lg md:text-lg lg:text-lg",
  loading = false,
}: {
  value: number | string;
  label: string;
  icon: IconDefinition;
  iconClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
  loading?: boolean;
}) {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center justify-center w-14 h-14 shrink-0">
        <FontAwesomeIcon icon={icon} className={iconClassName} />
      </div>
      <span
        className={`text-center shrink-0 font-normal leading-none font-anta ${valueClassName}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <Skeleton width={60} height={40} className="mx-auto" />
        ) : (
          value
        )}
      </span>
      <p className={`${labelClassName} leading-tight font-medium`}>{label}</p>
    </div>
  );
}

export default StatCard;

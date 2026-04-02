import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "@/components/shared/Skeleton";

function StatCard({
  value,
  label,
  icon,
  iconClassName = "text-approved text-xl md:text-2xl lg:text-3xl",
  valueClassName = "text-2xl md:text-3xl lg:text-4xl xl:text-5xl w-12 md:w-16 xl:w-20",
  labelClassName = "text-sm md:text-base lg:text-lg",
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
      <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 shrink-0">
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

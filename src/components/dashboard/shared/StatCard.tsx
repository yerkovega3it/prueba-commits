import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StatCard({
  value,
  label,
  icon,
}: {
  value: number | string;
  label: string;
  icon: IconDefinition;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 shrink-0">
        <FontAwesomeIcon icon={icon} className="text-approved text-lg" />
      </div>
      <span className="mt-2 text-3xl sm:text-4xl w-16 sm:w-20 text-center shrink-0 font-normal leading-none">
        {value}
      </span>
      <p className="mt-1 text-xs sm:text-sm opacity-90 leading-none font-medium">
        {label}
      </p>
    </div>
  );
}

export default StatCard;

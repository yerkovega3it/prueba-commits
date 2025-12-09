import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StatCard({
  value,
  label,
  icon,
}: {
  value: number;
  label: string;
  icon: IconDefinition;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-approved/15 shadow-[0_0_12px_var(--tw-approved)] shrink-0">
        <FontAwesomeIcon
          icon={icon}
          className="text-approved text-lg sm:text-xl"
        />
      </div>
      <span className="text-3xl sm:text-4xl font-bold w-16 sm:w-20 text-center shrink-0">{value}</span>
      <div className="flex flex-col">
        <span className="text-xs sm:text-sm opacity-60">Personas</span>
        <p className="text-xs sm:text-sm opacity-90 leading-tight">
          {label}
        </p>
      </div>
    </div>
  );
}

export default StatCard;

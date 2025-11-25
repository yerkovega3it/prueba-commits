import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface AlertCardProps {
  icon: IconDefinition;
  value: number;
  label: string;
}

function AlertCard({ icon, value, label }: AlertCardProps) {
  return (
    <div className="px-6 py-3.5 rounded-lg bg-critical-light transition-shadow flex items-center gap-4 h-16">
      <div className="h-9 w-9 flex items-center justify-center bg-critical rounded-sm">
        <FontAwesomeIcon icon={icon} height={16} width={16} />
      </div>
      <div className="text-left flex gap-2 items-center">
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
          {value}
        </p>
        <p className="text-xs text-white">{label}</p>
      </div>
    </div>
  );
}

export default AlertCard;

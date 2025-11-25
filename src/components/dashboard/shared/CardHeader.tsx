import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardTitle({
  icon,
  iconClassName,
  title,
  subtitle,
}: {
  icon?: IconProp;
  iconClassName?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold flex items-center gap-2">
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={`text-sm sm:text-base lg:text-lg" ${iconClassName}`}
          />
        )}
        {title}
      </h2>
      <p className="text-xs">{subtitle}</p>
    </div>
  );
}

export default CardTitle;

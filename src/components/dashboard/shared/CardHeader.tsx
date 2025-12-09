import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardTitle({
  icon,
  iconClassName,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
}: {
  icon?: IconProp;
  iconClassName?: string;
  title: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
}) {
  return (
    <div>
      <h2
        className={`text-base font-semibold flex items-center gap-2 ${titleClassName}`}
      >
        {icon && <FontAwesomeIcon icon={icon} className={iconClassName} />}
        {title}
      </h2>
      <p className={subtitleClassName}>{subtitle}</p>
    </div>
  );
}

export default CardTitle;

import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FitText from "@/components/shared/FitText";

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
    <div className="flex gap-2">
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={
            iconClassName ?? `text-alert text-xl md:text-2xl lg:text-3xl`
          }
        />
      )}
      <FitText className="inline-block" maxFontSizePx={16} minFontSizePx={12}>
        <h2
          className={`text-lg md:text-xl font-bold flex items-center gap-2 whitespace-nowrap ${titleClassName}`}
        >
          {title}
        </h2>
      </FitText>
      <p className={subtitleClassName}>{subtitle}</p>
    </div>
  );
}

export default CardTitle;

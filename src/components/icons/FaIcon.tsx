import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icons } from '@/components/icons'

interface FaIconProps {
  name: keyof typeof icons
  className?: string
}

export function FaIcon({ name, className, ...rest }: FaIconProps) {
  return <FontAwesomeIcon icon={icons[name]} className={className} {...rest} />
}
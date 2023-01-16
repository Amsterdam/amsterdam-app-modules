import {IconName, IconPath} from 'components/ui/media/iconPath'
import {IconSize} from 'components/ui/media/types'
import './Icon.css'

export type IconProps = {
  color?: 'error' | 'inverse' | 'muted'
  /**
   * The name of the icon to display.
   */
  name: IconName
  /**
   * The size of the icon.
   */
  size?: keyof typeof IconSize
}

const Icon = ({color, name, size = 'md'}: IconProps) => {
  const svgSize = IconSize[size]

  return (
    <svg
      className="Icon"
      data-color={color}
      data-spinner={name === 'spinner'}
      fillRule="evenodd"
      height={svgSize}
      viewBox="0 0 32 32"
      width={svgSize}>
      <path d={IconPath[name]} />
    </svg>
  )
}

export default Icon

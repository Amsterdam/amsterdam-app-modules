import './Icon.css'
import {IconName, IconPath} from './iconPath'
import {IconSize} from './types'

export type IconProps = {
  fill?: 'default' | 'error' | 'inverse' | 'muted'
  /**
   * The name of the icon to display.
   */
  name: IconName
  /**
   * The size of the icon.
   */
  size?: keyof typeof IconSize
}

const Icon = ({fill, name, size = 'md'}: IconProps) => {
  const svgSize = IconSize[size]

  return (
    <svg
      className="Icon"
      data-fill={fill}
      fillRule="evenodd"
      height={svgSize}
      viewBox="0 0 32 32"
      width={svgSize}>
      <path d={IconPath[name]} />
    </svg>
  )
}

export default Icon

import {MouseEventHandler, ReactNode} from 'react'
import Row from '../layout/Row'
import './Button.css'

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
}

type Props = {
  flex?: boolean
  icon?: ReactNode
  isDisabled?: boolean
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: keyof typeof ButtonVariant
}

const Button = ({
  flex,
  icon,
  isDisabled,
  label,
  onClick,
  variant = 'primary',
}: Props) => (
  <button
    onClick={onClick}
    className="Button"
    data-flex={flex}
    disabled={isDisabled}
    data-variant={variant}
    type="button">
    <Row gutter="sm" valign="center">
      {icon}
      <span className="ButtonLabel" data-font="body" data-ellipsize>
        {label}
      </span>
    </Row>
  </button>
)

export default Button

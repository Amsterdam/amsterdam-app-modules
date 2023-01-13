import {MouseEventHandler, ReactNode} from 'react'
import Row from '../layout/Row'
import './Button.css'

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
}

type Props = {
  disabled?: boolean
  flex?: boolean
  icon?: ReactNode
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: keyof typeof ButtonVariant
}

const Button = ({
  disabled,
  flex,
  icon,
  label,
  onClick,
  variant = 'primary',
}: Props) => (
  <button
    className="Button"
    data-flex={flex}
    data-variant={variant}
    disabled={disabled}
    onClick={onClick}
    type="button">
    <Row gutter="sm" valign="center">
      {icon}
      <span className="ButtonLabel" data-ellipsize data-font="body">
        {label}
      </span>
    </Row>
  </button>
)

export default Button

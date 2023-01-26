import {ButtonHTMLAttributes, ReactNode} from 'react'
import Row from 'components/ui/layout/Row'
import './Button.css'

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
}

export type ButtonProps = {
  disabled?: boolean
  flex?: boolean
  icon?: ReactNode
  label: string
  variant?: keyof typeof ButtonVariant
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  disabled,
  flex,
  icon,
  label,
  type = 'button',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) => (
  <button
    className="Button"
    data-flex={flex}
    data-variant={variant}
    disabled={disabled}
    // eslint-disable-next-line react/button-has-type
    type={type}
    {...buttonProps}>
    <Row gutter="sm" valign="center">
      {icon}
      <span className="ButtonLabel" data-ellipsize data-font="body">
        {label}
      </span>
    </Row>
  </button>
)

export default Button

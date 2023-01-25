import {ButtonHTMLAttributes, MouseEventHandler, ReactNode} from 'react'
import Row from 'components/ui/layout/Row'
import './Button.css'

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
}

type Props = {
  disabled?: boolean
  flex?: boolean
  icon?: ReactNode
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: keyof typeof ButtonVariant
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  disabled,
  flex,
  icon,
  label,
  onClick,
  type = 'button',
  variant = 'primary',
}: Props) => (
  <button
    className="Button"
    data-flex={flex}
    data-variant={variant}
    disabled={disabled}
    onClick={onClick}
    // eslint-disable-next-line react/button-has-type
    type={type}>
    <Row gutter="sm" valign="center">
      {icon}
      <span className="ButtonLabel" data-ellipsize data-font="body">
        {label}
      </span>
    </Row>
  </button>
)

export default Button

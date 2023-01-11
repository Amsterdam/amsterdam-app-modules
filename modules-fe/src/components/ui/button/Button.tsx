import {MouseEventHandler} from 'react'
import './Button.css'

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
}

type Props = {
  flex?: boolean
  isDisabled?: boolean
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: keyof typeof ButtonVariant
}

const Button = ({
  flex,
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
    <span className="ButtonLabel" data-font="body" data-ellipsize>
      {label}
    </span>
  </button>
)

export default Button

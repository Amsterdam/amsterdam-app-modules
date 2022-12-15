import {MouseEventHandler} from 'react'
import './Button.css'

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
}

type Props = {
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: keyof typeof ButtonVariant
}

const Button = ({label, onClick, variant = 'primary'}: Props) => (
  <button
    onClick={onClick}
    className="Button"
    data-variant={variant}
    type="button">
    <span className="ButtonLabel" data-font="body" data-ellipsize>
      {label}
    </span>
  </button>
)

export default Button

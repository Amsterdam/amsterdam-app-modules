import {MouseEventHandler} from 'react'
import './Button.css'
import Phrase from '../text/Phrase'

type Props = {
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  variant?: 'secondary'
}

const Button = ({label, onClick, variant}: Props) => (
  <button
    onClick={onClick}
    className="Button"
    data-variant={variant}
    type="button">
    <Phrase>{label}</Phrase>
  </button>
)

export default Button

import {MouseEventHandler} from 'react'
import './Button.css'
import Phrase from '../text/Phrase'

type Props = {
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button = ({label, onClick}: Props) => {
  return (
    <button onClick={onClick} className="Button" type="button">
      <Phrase color="inverse">{label}</Phrase>
    </button>
  )
}

export default Button

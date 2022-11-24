import {ReactNode, MouseEventHandler} from 'react'
import './Button.css'

type Props = {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}

const Button = ({children, onClick}: Props) => {
  return (
    <button onClick={onClick} className="Button" type="button">
      {children}
    </button>
  )
}

export default Button

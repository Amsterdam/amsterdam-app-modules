import {ReactNode} from 'react'
import './Phrase.css'

type Props = {
  children: ReactNode
  color?: 'default' | 'error' | 'inverse'
}

const Phrase = ({children, color = 'default'}: Props) => (
  <span className="Phrase" data-color={color} data-font="body">
    {children}
  </span>
)

export default Phrase

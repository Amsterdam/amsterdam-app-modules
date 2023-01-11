import {ReactNode} from 'react'
import './Phrase.css'

type Props = {
  children: ReactNode
  color?: 'default' | 'error' | 'inverse' | 'muted'
}

const Phrase = ({children, color}: Props) => (
  <span className="Phrase" data-color={color} data-font="body">
    {children}
  </span>
)

export default Phrase

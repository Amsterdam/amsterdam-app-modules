import {ReactNode} from 'react'
import './Phrase.css'

type Props = {
  children: ReactNode
  color?: 'error' | 'default'
}

const Phrase = ({children, color = 'default'}: Props) => (
  <span className="Phrase" data-color={color}>
    {children}
  </span>
)

export default Phrase

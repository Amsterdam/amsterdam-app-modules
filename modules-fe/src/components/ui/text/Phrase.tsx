import {ReactNode} from 'react'
import './Phrase.css'

type Props = {
  children: ReactNode
  color?: 'error' | 'inverse' | 'muted'
  emphasis?: 'strong'
}

const Phrase = ({children, color, emphasis}: PhraseProps) => (
  <span
    className="Phrase"
    data-color={color}
    data-emphasis={emphasis}
    data-font="body">
    {children}
  </span>
)

export default Phrase

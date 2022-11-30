import {ReactNode} from 'react'
import './Phrase.css'

type Props = {
  children: ReactNode
}

const Phrase = ({children}: Props) => <span className="Phrase">{children}</span>

export default Phrase

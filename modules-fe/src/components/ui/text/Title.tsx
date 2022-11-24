import {ReactNode} from 'react'
import './Title.css'

type Props = {
  children: ReactNode
}

const Title = ({children}: Props) => <h1 className="Title">{children}</h1>

export default Title

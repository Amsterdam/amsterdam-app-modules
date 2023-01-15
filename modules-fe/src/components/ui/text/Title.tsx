import {ReactNode} from 'react'
import './Title.css'

type Props = {
  children: ReactNode
  level?: 1 | 2 | 3
}

const Title = ({children, level = 1}: Props) => (
  <h1 className="Title" data-font="title" data-level={level}>
    {children}
  </h1>
)

export default Title

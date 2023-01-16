import {ReactNode} from 'react'
import './Title.css'

type Props = {
  children: ReactNode
  level?: 1 | 2 | 3
}

const Title = ({children, level = 1}: Props) => {
  const Heading = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Heading className="Title" data-font="title" data-level={level}>
      {children}
    </Heading>
  )
}

export default Title

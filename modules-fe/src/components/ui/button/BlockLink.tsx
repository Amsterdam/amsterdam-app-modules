import {ReactNode} from 'react'
import './BlockLink.css'
import {Link} from 'react-router-dom'

type Props = {
  children: ReactNode
  to: string
}

const BlockLink = ({children, to}: Props) => (
  <Link className="BlockLink" to={to}>
    {children}
  </Link>
)

export default BlockLink

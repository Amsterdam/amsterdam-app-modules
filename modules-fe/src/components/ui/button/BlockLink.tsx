import {ReactNode} from 'react'
import './BlockLink.css'
import {Link, LinkProps} from 'react-router-dom'

type Props = {
  children: ReactNode
  to: LinkProps['to']
}

const BlockLink = ({children, to}: Props) => (
  <Link className="BlockLink" to={to}>
    {children}
  </Link>
)

export default BlockLink

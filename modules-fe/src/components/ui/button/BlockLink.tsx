import {ReactNode} from 'react'
import './BlockLink.css'

type Props = {
  children: ReactNode
  href: string
}

const BlockLink = ({children, href}: Props) => (
  <a className="BlockLink" href={href}>
    {children}
  </a>
)

export default BlockLink

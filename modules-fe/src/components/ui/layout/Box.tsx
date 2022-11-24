import {ReactNode} from 'react'
import {SpacingToken} from './types'
import './inset.css'

type Props = {
  children: ReactNode
  /**
   * The amount of inner whitespace.
   */
  inset?: keyof typeof SpacingToken
}

const Box = ({children, inset = 'md'}: Props) => (
  <div className="Box" data-inset={inset}>
    {children}
  </div>
)

export default Box

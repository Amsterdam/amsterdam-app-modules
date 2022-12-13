import {ReactNode} from 'react'
import {SpacingToken} from './types'
import './inset.css'

type Props = {
  children: ReactNode
  /**
   * The amount of inner whitespace.
   */
  inset?: keyof typeof SpacingToken
  /**
   * The amount of horizontal inner whitespace.
   */
  insetHorizontal?: keyof typeof SpacingToken
  /**
   * The amount of vertical inner whitespace.
   */
  insetVertical?: keyof typeof SpacingToken
}

const Box = ({
  children,
  inset = 'md',
  insetHorizontal,
  insetVertical,
}: Props) => (
  <div
    className="Box"
    data-inset={inset}
    data-inset-horizontal={insetHorizontal}
    data-inset-vertical={insetVertical}>
    {children}
  </div>
)

export default Box

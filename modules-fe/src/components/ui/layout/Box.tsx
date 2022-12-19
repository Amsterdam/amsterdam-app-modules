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
  /**
   * The amount of horizontal negative whitespace.
   */
  negativeInsetHorizontal?: keyof typeof SpacingToken
}

const Box = ({
  children,
  inset = 'md',
  insetHorizontal,
  insetVertical,
  negativeInsetHorizontal,
}: Props) => (
  <div
    className="Box"
    data-inset={inset}
    data-inset-horizontal={insetHorizontal}
    data-inset-vertical={insetVertical}
    data-negative-inset-horizontal={negativeInsetHorizontal}>
    {children}
  </div>
)

export default Box

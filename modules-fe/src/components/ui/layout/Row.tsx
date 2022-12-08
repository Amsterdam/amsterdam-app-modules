import {ReactNode} from 'react'
import './Row.css'
import './gutter.css'
import {CrossAxisAlignment, MainAxisAlignment, SpacingToken} from './types'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof typeof SpacingToken
  valign?: CrossAxisAlignment
}

const Row = ({align, children, gutter, valign}: Props) => {
  return (
    <div
      className="Row"
      data-gutter={gutter}
      data-align={align}
      data-valign={valign}>
      {children}
    </div>
  )
}

export default Row

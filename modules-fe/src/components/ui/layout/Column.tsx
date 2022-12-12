import {ReactNode} from 'react'
import './Column.css'
import './gutter.css'
import {CrossAxisAlignment, MainAxisAlignment, SpacingToken} from './types'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof typeof SpacingToken
  halign?: CrossAxisAlignment
}

const Column = ({align, children, gutter, halign}: Props) => {
  return (
    <div
      className="Column"
      data-align={align}
      data-gutter={gutter}
      data-halign={halign}>
      {children}
    </div>
  )
}

export default Column

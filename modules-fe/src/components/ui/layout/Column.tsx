import {ReactNode} from 'react'
import {
  CrossAxisAlignment,
  MainAxisAlignment,
  SpacingToken,
} from 'components/ui/layout/types'
import './Column.css'
import './gutter.css'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof typeof SpacingToken
  halign?: CrossAxisAlignment
}

const Column = ({align, children, gutter, halign}: Props) => (
  <div
    className="Column"
    data-align={align}
    data-gutter={gutter}
    data-halign={halign}>
    {children}
  </div>
)

export default Column

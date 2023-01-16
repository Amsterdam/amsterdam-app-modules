import {ReactNode} from 'react'
import {
  CrossAxisAlignment,
  MainAxisAlignment,
  SpacingToken,
} from 'components/ui/layout/types'
import './gutter.css'
import './Row.css'

type Props = {
  align?: MainAxisAlignment
  children: ReactNode
  gutter?: keyof typeof SpacingToken
  valign?: CrossAxisAlignment
}

const Row = ({align, children, gutter, valign}: Props) => (
  <div
    className="Row"
    data-gutter={gutter}
    data-align={align}
    data-valign={valign}>
    {children}
  </div>
)

export default Row

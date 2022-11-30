import {ReactNode} from 'react'
import './Screen.css'

type Props = {
  children: ReactNode
}

const Screen = ({children}: Props) => (
  <div className="Screen">
    <div className="Container">{children}</div>
  </div>
)

export default Screen

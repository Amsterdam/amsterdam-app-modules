import {ReactNode} from 'react'
import './Screen.css'
import Header from '../../features/Header'

type Props = {
  children: ReactNode
}

const Screen = ({children}: Props) => (
  <div className="Screen">
    <div className="Container">
      <Header />
      {children}
    </div>
  </div>
)

export default Screen

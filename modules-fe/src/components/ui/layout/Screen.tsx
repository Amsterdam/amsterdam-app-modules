import {ReactNode} from 'react'
import './Screen.css'
import Logo from '../media/Logo'
import Column from './Column'

type Props = {
  children: ReactNode
}

const Screen = ({children}: Props) => (
  <div className="Screen">
    <div className="Container">
      <Column gutter="xl">
        <Logo />
        <div>{children}</div>
      </Column>
    </div>
  </div>
)

export default Screen

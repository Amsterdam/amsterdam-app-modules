import {ReactNode} from 'react'
import Column from 'components/ui/layout/Column'
import Logo from 'components/ui/media/Logo'
import './Screen.css'

type Props = {
  children: ReactNode
}

const Screen = ({children}: Props) => (
  <div className="Screen">
    <div className="Container">
      <Column gutter="xl">
        <header>
          <Logo />
        </header>
        <main>{children}</main>
      </Column>
    </div>
  </div>
)

export default Screen

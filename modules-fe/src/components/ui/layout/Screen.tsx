import {ReactNode} from 'react'
import {useLocation} from 'react-router-dom'
import LogoutButton from 'components/features/LogoutButton'
import Column from 'components/ui/layout/Column'
import Logo from 'components/ui/media/Logo'
import './Screen.css'
import {useAuthorization} from 'hooks/useAuthorization'
import Row from './Row'

type Props = {
  children: ReactNode
}

const Screen = ({children}: Props) => {
  useAuthorization()
  const location = useLocation()

  const isLoginPage = location.pathname === '/login'

  return (
    <div className="Screen">
      <div className="Container">
        <Column gutter="xl">
          <header>
            <Row align="between" valign="start">
              <Logo />
              {!isLoginPage && <LogoutButton />}
            </Row>
          </header>
          <main>{children}</main>
        </Column>
      </div>
    </div>
  )
}

export default Screen

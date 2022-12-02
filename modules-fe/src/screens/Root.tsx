import {Outlet} from 'react-router-dom'
import Header from '../components/features/Header'
import Screen from '../components/ui/layout/Screen'

export const Root = () => (
  <Screen>
    <Header />
    <Outlet />
  </Screen>
)

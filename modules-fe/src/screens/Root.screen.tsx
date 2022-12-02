import {Outlet} from 'react-router-dom'
import Header from '../components/features/Header'
import Screen from '../components/ui/layout/Screen'

const RootScreen = () => (
  <Screen>
    <Header />
    <Outlet />
  </Screen>
)

export default RootScreen

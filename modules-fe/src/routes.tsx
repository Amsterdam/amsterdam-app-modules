import {RouteObject} from 'react-router-dom'
import ErrorScreen from './screens/Error.screen'
import ModuleScreen from './screens/Module.screen'
import ModulesScreen from './screens/Modules.screen'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <ModulesScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: '/modules/:slug',
    element: <ModuleScreen />,
  },
]

import {RouteObject} from 'react-router-dom'
import HomeScreen from 'screens/Home.screen'
import ReleasesScreen from 'screens/Releases.screen'
import CreateModuleVersionScreen from './screens/CreateModuleVersion.screen'
import EditModuleScreen from './screens/EditModule.screen'
import ErrorScreen from './screens/Error.screen'
import ModuleScreen from './screens/Module.screen'
import ModulesScreen from './screens/Modules.screen'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/modules',
    element: <ModulesScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: '/modules/:slug',
    element: <ModuleScreen />,
  },
  {
    path: '/modules/:slug/create',
    element: <CreateModuleVersionScreen />,
  },
  {
    path: '/modules/:slug/:version/edit',
    element: <EditModuleScreen />,
  },
  {
    path: '/releases',
    element: <ReleasesScreen />,
  },
]

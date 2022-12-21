import {RouteObject} from 'react-router-dom'
import CreateModuleScreen from './screens/CreateModule.screen'
import CreateReleaseScreen from './screens/CreateRelease'
import EditModuleScreen from './screens/EditModule.screen'
import ErrorScreen from './screens/Error.screen'
import HomeScreen from './screens/Home.screen'
import ModuleScreen from './screens/Module.screen'
import ModulesScreen from './screens/Modules.screen'
import ReleaseScreen from './screens/Release.screen'
import ReleasesScreen from './screens/Releases.screen'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeScreen />,
    errorElement: <ErrorScreen />,
  },
  {
    path: '/modules',
    element: <ModulesScreen />,
  },
  {
    path: '/modules/:slug',
    element: <ModuleScreen />,
  },
  {
    path: '/modules/:slug/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/modules/:slug/:version/edit',
    element: <EditModuleScreen />,
  },
  {
    path: '/releases',
    element: <ReleasesScreen />,
  },
  {
    path: '/releases/:version',
    element: <ReleaseScreen />,
  },
  {
    path: '/release/create',
    element: <CreateReleaseScreen />,
  },
]

import {RouteObject} from 'react-router-dom'
import EditModuleVersionStatusScreen from 'screens/EditModuleVersionStatus.screen'
import CreateModuleScreen from './screens/CreateModule.screen'
import CreateReleaseScreen from './screens/CreateRelease.screen'
import EditModuleVersionScreen from './screens/EditModuleVersion.screen'
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
    path: '/module/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/module/:slug',
    element: <ModuleScreen />,
  },
  {
    path: '/module/:slug/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/module/:slug/:version',
    element: <EditModuleVersionScreen />,
  },
  {
    path: '/module/:slug/:version/status',
    element: <EditModuleVersionStatusScreen />,
  },
  {
    path: '/releases',
    element: <ReleasesScreen />,
  },
  {
    path: '/release/create',
    element: <CreateReleaseScreen />,
  },
  {
    path: '/release/:version',
    element: <ReleaseScreen />,
  },
]

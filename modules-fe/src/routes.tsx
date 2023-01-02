import {RouteObject} from 'react-router-dom'
import CreateModuleScreen from './screens/CreateModule.screen'
import CreateReleaseScreen from './screens/CreateRelease.screen'
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
    path: '/module/:slug',
    element: <ModuleScreen />,
  },
  {
    path: '/module/:slug/create',
    element: <CreateModuleScreen />,
  },
  {
    path: '/module/:slug/:version',
    element: <EditModuleScreen />,
  },
  {
    path: '/releases',
    element: <ReleasesScreen />,
  },
  {
    path: '/release/:version',
    element: <ReleaseScreen />,
  },
  {
    path: '/release/create',
    element: <CreateReleaseScreen />,
  },
]

import {Provider as StoreProvider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {routes} from './routes'
import {store} from './store/store'

const router = createBrowserRouter(routes)

const App = () => (
  <StoreProvider store={store}>
    <RouterProvider router={router} />
  </StoreProvider>
)

export default App

import {StrictMode} from 'react'
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {routes} from './routes'
import {store} from './store/store'

const router = createBrowserRouter(routes)

const App = () => (
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)

export default App

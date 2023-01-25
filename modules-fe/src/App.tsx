import {Provider as StoreProvider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import {routes} from 'routes'
import {store} from 'store/store'

const router = createBrowserRouter(routes)
const persistor = persistStore(store)

const App = () => (
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </StoreProvider>
)

export default App

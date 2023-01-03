import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {modulesApi} from '../services/modules'
import {releaseSlice} from '../slices/release.slice'

export const store = configureStore({
  reducer: {
    [modulesApi.reducerPath]: modulesApi.reducer,
    release: releaseSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(modulesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

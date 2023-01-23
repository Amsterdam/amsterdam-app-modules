import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {modulesApi} from 'services/modules'
import {authorizationSlice} from 'slices/authorization.slice'
import {releaseSlice} from 'slices/release.slice'

const authPersistConfig = {
  key: 'authorization',
  storage,
}

const rootReducer = combineReducers({
  [modulesApi.reducerPath]: modulesApi.reducer,
  authorization: persistReducer(authPersistConfig, authorizationSlice.reducer),
  release: releaseSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(modulesApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

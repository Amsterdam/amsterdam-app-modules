import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { modulesApi } from '../services/modules';

export const store = configureStore({
    reducer: {
        [modulesApi.reducerPath]: modulesApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(modulesApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

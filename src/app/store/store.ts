import { configureStore } from '@reduxjs/toolkit';
import { ramApi } from '../ramApi/ramApi';

export const store = configureStore({
  reducer: {
    [ramApi.reducerPath]: ramApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ramApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // catalog: catalogReducer,
    // [ramApi.reducerPath]: ramApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(/*ramApi.middleware&*/),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

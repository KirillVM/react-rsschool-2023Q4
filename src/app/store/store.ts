import { configureStore } from '@reduxjs/toolkit';
import { ramApi } from '../ramApi/ram-api';
import catalogReducer from '@app/redusers/catalog-slice';
import { createWrapper } from 'next-redux-wrapper';
import { setupListeners } from '@reduxjs/toolkit/query';
export const makeStore = () => configureStore({
  reducer: {
    catalog: catalogReducer,
    [ramApi.reducerPath]: ramApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ramApi.middleware),
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true})
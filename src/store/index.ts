import { configureStore } from "@reduxjs/toolkit";

import globalReducer from "./global";
import { api } from "./services/core";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

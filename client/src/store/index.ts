import authReducer from "@/features/auth/authSlice";
import { apiService } from "@/services/api";
import { configureStore } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [apiService.reducerPath]: apiService.reducer,
    },
    middleware: (gDM) => gDM().concat(apiService.middleware),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

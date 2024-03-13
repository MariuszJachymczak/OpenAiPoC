import { configureStore } from "@reduxjs/toolkit";
import imageGeneratorSlice from "../redux/slices/imageGeneratorSlice";
import loadingSlice from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    imageGenerator: imageGeneratorSlice,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

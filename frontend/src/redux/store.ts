import { configureStore } from "@reduxjs/toolkit";
import imageGeneratorSlice from "../redux/slices/imageGeneratorSlice";
import loadingSlice from "./slices/loadingSlice";
import answerGeneratorSlice from "./slices/answerGeneratorSlice";

export const store = configureStore({
  reducer: {
    imageGenerator: imageGeneratorSlice,
    loading: loadingSlice,
    answerGenerator: answerGeneratorSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

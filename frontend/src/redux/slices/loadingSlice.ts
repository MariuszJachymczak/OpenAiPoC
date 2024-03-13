import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingStart: (state) => {
      state.isLoading = true;
    },
    setLoadingEnd: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoadingStart, setLoadingEnd } = loadingSlice.actions;
export default loadingSlice.reducer;

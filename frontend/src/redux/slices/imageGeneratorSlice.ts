import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageGeneratorState {
  input: string;
  image: string | null;
}

const initialState: ImageGeneratorState = {
  input: "",
  image: null,
};
const imageGeneratorSlice = createSlice({
  name: "imageGenerator",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
    },
    setImage: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },
  },
});

export const { setInput, setImage } = imageGeneratorSlice.actions;
export default imageGeneratorSlice.reducer;

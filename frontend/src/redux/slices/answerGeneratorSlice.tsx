import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AnswerGeneratorState {
  conversationInput: string;
  conversationAnswer: string | null;
}

const initialState: AnswerGeneratorState = {
  conversationInput: "",
  conversationAnswer: null,
};

const anserGeneratorSlice = createSlice({
  name: "answerGenerator",
  initialState,
  reducers: {
    setConversationInput: (state, action: PayloadAction<string>) => {
      state.conversationInput = action.payload;
    },
    setAnswer: (state, action: PayloadAction<string | null>) => {
      state.conversationAnswer = action.payload;
    },
  },
});

export const { setConversationInput, setAnswer } = anserGeneratorSlice.actions;
export default anserGeneratorSlice.reducer;

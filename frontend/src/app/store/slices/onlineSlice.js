import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    onlineTranscription : ""
}

const onlineSlice = createSlice({
  name: 'onlineSlice',
  initialState,
  reducers: {
    setOnlineTranscription: (state, action) => {
      state.onlineTranscription = action.payload;
    },
    addTranscription: (state, action) => {
      state.onlineTranscription += action.payload
    },
  },
  selectors: {
    selectOnlineTranscription : (state) => state.onlineTranscription,
  }
})

export const { addTranscription, setOnlineTranscription } = onlineSlice.actions;
export const { selectOnlineTranscription } = onlineSlice.selectors;
export const onlineReducer = onlineSlice.reducer;
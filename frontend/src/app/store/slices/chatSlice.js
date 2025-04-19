import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendMessageRoute } from 'src/app/routes/apiRoutes';
import axios from 'axios';


const initialState = {
  onlineChatMessages: [],
  isShowChatSetupModal: false,
  isActiveIncludeTranscriptionToggle: false
};

export const sendMessage = createAsyncThunk(
  'chatSlice/sendMessage',
  async function (sendData, { rejectWithValue }) {
    try {
      const data = {
        'message': sendData.message,
        'transcriptions': sendData.transcriptions,
        'isIncludeTranscription': sendData.isIncludeTranscription,
        'author': 'user',
      }
      const response = await axios.post(sendMessageRoute, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
)

const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    closeChatSetupModal: (state) => {
      state.isShowChatSetupModal = false
    },
    setIsShowChatSetupModal: (state, action) => {
      state.isShowChatSetupModal = action.payload;
    },
    setIsActiveIncludeTranscriptionToggle: (state, action) => {
      state.isActiveIncludeTranscriptionToggle = action.payload;
    },
  },
  selectors: {
    selectOnlineMessages: (state) => state.onlineChatMessages,
    selectIsShowChatSetupModal: (state) => state.isShowChatSetupModal,
    selectIsActiveIncludeTranscriptionToggle: (state) => state.isActiveIncludeTranscriptionToggle
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.onlineChatMessages.push({
          'message': action.meta.arg.message,
          'author': action.meta.arg.author,
        })
        state.onlineChatMessages.push({
          'message': 'Ожидайте, Ваш запрос был передан модели',
          'author': 'chatbot',
        })
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.onlineChatMessages.pop()
        state.onlineChatMessages.push(action.payload)
      })
  }
});

export const { closeChatSetupModal, setIsShowChatSetupModal, setIsActiveIncludeTranscriptionToggle } = chatSlice.actions;
export const { selectOnlineMessages, selectIsShowChatSetupModal, selectIsActiveIncludeTranscriptionToggle } = chatSlice.selectors;
export const chatReducer = chatSlice.reducer;
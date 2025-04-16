import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { sendMessageRoute } from 'src/app/routes/apiRoutes';


const initialState = {
  onlineChatMessages: [],
  onlineTranscription: [],
  isShowChatSetupModal: false
};

export const sendMessage = createAsyncThunk(
  'chatSlice/sendMessage',
  async function (sendData, { rejectWithValue }) {
    try {
      const data = {
        'message': sendData.message,
        'transcriptions': sendData.transcriptions,
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
    addTranscription: (state, action) => {
      state.onlineTranscription = [...state.onlineTranscription, action.payload]
    },
    closeChatSetupModal: (state) => {
      state.isShowChatSetupModal = false
    },
    setIsShowChatSetupModal: (state, action) => {
      state.isShowChatSetupModal = action.payload;
    },
  },
  selectors: {
    selectOnlineMessages: (state) => state.onlineChatMessages,
    selectOnlineTranscription: (state) => state.onlineTranscription,
    selectIsShowChatSetupModal: (state) => state.isShowChatSetupModal
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

export const { addTranscription, closeChatSetupModal, setIsShowChatSetupModal } = chatSlice.actions;
export const { selectOnlineMessages, selectOnlineTranscription, selectIsShowChatSetupModal } = chatSlice.selectors;
export const chatReducer = chatSlice.reducer;
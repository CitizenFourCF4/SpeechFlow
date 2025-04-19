import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { media_upload_url } from 'src/app/routes/apiRoutes';
import axios from 'axios';

export const sendAudio = createAsyncThunk(
  'waveSurferSlice/sendAudio',
  async function({selectedFile}, {rejectWithValue, dispatch}) {
    try {
      const data = new FormData();
      data.append('media', selectedFile)
      const response = await axios.post(media_upload_url, data);
      dispatch(setTranscriptions(response.data.asr_model_output))
      dispatch(setAudioUrl(response.data.audio_url))
      dispatch(setIsShowOfflineWidget(true))
      
    } catch (error) {
        return rejectWithValue(error.response);
    }
  }
)

const initialState = {
  audioUrl: '',
  transcriptions: [],
  isShowOfflineWidget: false,
  isLoading: false,
  selectedFile: null,
};

const waveSurferSlice = createSlice({
  name: 'waveSurferSlice',
  initialState,
  reducers: {
    setAudioUrl: (state, action) => {
      state.audioUrl = action.payload;
    },
    setTranscriptions: (state, action) => {
      state.transcriptions = action.payload;
    },
    setIsShowOfflineWidget: (state, action) => {
      state.isShowOfflineWidget = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    closeWhisperModal: (state) => {
      state.isShowOfflineWidget = false
    }, 
    addTranscription: (state, action) => {
      state.transcriptions = [...state.transcriptions, action.payload]
    },
  },
  selectors: {
    selectAudioUrl: (state) => state.audioUrl,
    selectTranscribation: (state) => state.transcriptions,
    selectIsShowOfflineWidget: (state) => state.isShowOfflineWidget,
    selectIsLoading: (state) => state.isLoading,
    selectSelectedFile: (state) => state.selectedFile
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendAudio.rejected, (state, action) => {
        alert(action.payload.data.message)
        state.selectedFile = null
        state.isLoading = false
      })
      .addCase(sendAudio.pending, (state) => {
        state.isLoading = true
      })
      .addCase(sendAudio.fulfilled, (state) => {
        state.isLoading = false
        state.selectedFile = null
      })
      
  }
});

export const { setAudioUrl, setTranscriptions, setIsShowOfflineWidget, setIsLoading, closeWhisperModal, setSelectedFile, addTranscription } = waveSurferSlice.actions;
export const { selectAudioUrl, selectTranscribation, selectIsShowOfflineWidget, selectIsLoading, selectSelectedFile } = waveSurferSlice.selectors;
export const waveSurferReducer = waveSurferSlice.reducer;
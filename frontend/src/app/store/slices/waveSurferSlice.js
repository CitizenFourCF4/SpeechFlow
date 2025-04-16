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
      dispatch(setTranscribation(response.data.asr_model_output))
      dispatch(setAudioUrl(response.data.audio_url))
      dispatch(setIsShowWhisperModal(true))
      
    } catch (error) {
        return rejectWithValue(error.response);
    }
  }
)

const initialState = {
  audioUrl: '',
  transcribation: [],
  isShowWhisperModal: false,
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
    setTranscribation: (state, action) => {
      state.transcribation = action.payload;
    },
    setIsShowWhisperModal: (state, action) => {
      state.isShowWhisperModal = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    closeWhisperModal: (state) => {
      state.isShowWhisperModal = false
    }
  },
  selectors: {
    selectAudioUrl: (state) => state.audioUrl,
    selectTranscribation: (state) => state.transcribation,
    selectIsShowWhisperModal: (state) => state.isShowWhisperModal,
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

export const { setAudioUrl, setTranscribation, setIsShowWhisperModal, setIsLoading, closeWhisperModal, setSelectedFile } = waveSurferSlice.actions;
export const { selectAudioUrl, selectTranscribation, selectIsShowWhisperModal, selectIsLoading, selectSelectedFile } = waveSurferSlice.selectors;
export const waveSurferReducer = waveSurferSlice.reducer;
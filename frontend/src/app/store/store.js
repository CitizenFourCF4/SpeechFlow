import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { waveSurferReducer } from './slices/waveSurferSlice';
import { chatReducer } from './slices/chatSlice';
import { onlineReducer } from './slices/onlineSlice';

export const rootReducer = combineReducers({
  waveSurferSlice: waveSurferReducer, 
  chatSlice: chatReducer,
  onlineSlice: onlineReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
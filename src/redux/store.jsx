import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postsReducer from './slices/postsSlice';
import reelsSlice from './slices/reelsSlice';
import chatsSlice from './slices/chatsSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    reels: reelsSlice,
    chats: chatsSlice
  },
});

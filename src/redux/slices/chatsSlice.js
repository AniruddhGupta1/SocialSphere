import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: ['User1', 'User2', 'User3'], // List of users
  currentChat: 'User1', // Initially selected user
  chats: {
    User1: [
      { id: 1, user: 'User1', message: 'Hi there! How can I help you today?' },
      { id: 2, user: 'You', message: 'I am just checking out this chat app!' },
    ],
    User2: [
      { id: 1, user: 'User2', message: 'Hello! Long time no see.' },
      { id: 2, user: 'You', message: 'Yeah, it’s been a while! How are you?' },
    ],
  },
};

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const { user, message } = action.payload;
      const newMessage = { id: Date.now(), user: 'You', message };
      if (state.chats[user]) {
        state.chats[user].push(newMessage);
      } else {
        state.chats[user] = [newMessage];
      }
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { sendMessage, setCurrentChat } = chatsSlice.actions;
export default chatsSlice.reducer;

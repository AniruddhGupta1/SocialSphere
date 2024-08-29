// src/redux/slices/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import profile from '../../assets/profile.png'
const initialState = [
  {
    id: 1,
    username: "MrBeast",
    profile: `${profile}`,
    content: 'It’s my 26th birthday, so I am giving away 26 Teslas to my followers! Like and Comment on this post tagging 2 friends to enter! Make sure you’re FOLLOWING so I can dm you if you win a Tesla! Winners will be announced in 7 days, share this to your story and help your friends win a Tesla lol\n\nTerms and conditions apply, see official rules: http://Bit.ly/beastgaway',
    image: `${img1}`,
    likes: 50,
    dislikes: 5,
    comments: [
      { username: 'User1', text: 'Nice post!' },
      { username: 'User2', text: 'Interesting content!' }
    ],
    liked: false,
    disliked: false
  },
  {
    id: 2,
    username: 'MrBeast',
    content: 'Just uploaded, gave two people $500,000 if they lived in a bunker for 100 days!',
    profile: `${profile}`,
    image: `${img2}`,
    likes: 80,
    dislikes: 8,
    comments: [
      { username: 'User3', text: 'Great job!' },
      { username: 'User4', text: 'I love it!' }
    ],
    liked: false,
    disliked: false
  }
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    likePost: (state, action) => {
      const post = state.find((post) => post.id === action.payload);
      if (post) {
        post.likes += post.liked ? -1 : 1;
        if (post.disliked) post.dislikes -= 1;
        post.liked = !post.liked;
        post.disliked = false;
      }
    },
    dislikePost: (state, action) => {
      const post = state.find((post) => post.id === action.payload);
      if (post) {
        post.dislikes += post.disliked ? -1 : 1;
        if (post.liked) post.likes -= 1;
        post.disliked = !post.disliked;
        post.liked = false;
      }
    },
    addComment: (state, action) => {
      console.log("Action",action);
      const post = state.find((post) => post.id === action.payload.postId);
      if (post) {
        post.comments.push({
          username: 'You',
          text: action.payload.comment,
        });
      }
    },
  },
});

export const { likePost, dislikePost, addComment } = postsSlice.actions;
export default postsSlice.reducer;

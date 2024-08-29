import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    videoUrl: "https://scontent-lhr8-1.cdninstagram.com/o1/v/t16/f2/m69/An80ycfEEDJ8Cng9mZ_u3xC4q1MAE9ng7JzZc9xwf_Vc1Oqx8QoiDTaMPP8Von1pVzcwfG4QuqoO6vnIfadMKzbo.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLmMyLjEwODAuYmFzZWxpbmUifQ&_nc_cat=109&vs=775750971300595_2499870823&_nc_vs=HBksFQIYOnBhc3N0aHJvdWdoX2V2ZXJzdG9yZS9HR0dLQmhPemZFUnkwQ1lGQU9ILWdKRWg4TGNEYnBSMUFBQUYVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dEMy02aG9ZekplZ0FzSUJBS0NneFVzbkg5RU1icV9FQUFBRhUCAsgBACgAGAAbABUAACaGzPLYotTjPxUCKAJDMywXQCx3S8an754YFmRhc2hfYmFzZWxpbmVfMTA4MHBfdjERAHX%2BBwA%3D&_nc_rid=86e1cfabf1&ccb=9-4&oh=00_AYBN4Bm-fBec5nx2JqerCAZwL-RSCLKFKyQzhggY0_eC_g&oe=66D2169C&_nc_sid=c024bc",
    likes: 120,
    dislikes: 5,
    comments: [
      { username: "User1", text: "Great video!" },
      { username: "User2", text: "Amazing content!" },
    ],
    hasLiked: false,
    hasDisliked: false,
  },
  {
    id: 2,
    videoUrl: "https://scontent-lhr8-1.cdninstagram.com/o1/v/t16/f1/m86/A84D4AB563A7778A3945AFB27DC3F093_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLmMyLjcyMC5iYXNlbGluZSJ9&_nc_cat=101&vs=1363742988364402_2351571071&_nc_vs=HBksFQIYUmlnX3hwdl9yZWVsc19wZXJtYW5lbnRfc3JfcHJvZC9BODRENEFCNTYzQTc3NzhBMzk0NUFGQjI3REMzRjA5M192aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dMeWwyaHFKaTBwcU1VME5BR21zblRESllFNWdicV9FQUFBRhUCAsgBACgAGAAbABUAACau5e2H%2FfjQPxUCKAJDMywXQDlu2RaHKwIYEmRhc2hfYmFzZWxpbmVfMV92MREAdf4HAA%3D%3D&_nc_rid=86e1cbbe1a&ccb=9-4&oh=00_AYDUnWRT0YNQzkaguMLTq58YngQ0hqUc0Ry1ThZHvXnd1A&oe=66D2041D&_nc_sid=c024bc",
    likes: 85,
    dislikes: 10,
    comments: [
      { username: "Antony", text: "I love it!" },
      { username: "Dhillon", text: "Keep it up!" },
    ],
    hasLiked: false,
    hasDisliked: false,
  },
];

const reelsSlice = createSlice({
  name: 'reels',
  initialState,
  reducers: {
    likeReel: (state, action) => {
      const reel = state.find((r) => r.id === action.payload);
      if (reel) {
        reel.likes += reel.hasLiked ? -1 : 1;
        if(reel.hasDisliked) reel.dislikes -= 1;
        reel.hasLiked = !reel.hasLiked;
        reel.hasDisliked = false;
      }
    },
    dislikeReel: (state, action) => {
      const reel = state.find((r) => r.id === action.payload);
      if (reel) {
        reel.dislikes += reel.hasDisliked ? -1 : 1;
        if (reel.hasliked) reel.likes -= 1;
        reel.hasDisliked = !reel.hasDisliked;
        reel.hasLiked = false;
      }
    },
    addCommentToReel: (state, action) => {
      const reel = state.find((r) => r.id === action.payload.reelId);
      if (reel) {
        reel.comments.push({
          username: 'You',
          text: action.payload.comment,
        });
      }
    },
  },
});

export const { likeReel, dislikeReel, addCommentToReel } = reelsSlice.actions;
export default reelsSlice.reducer;

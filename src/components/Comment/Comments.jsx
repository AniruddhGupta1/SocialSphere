import React, { useState, useEffect } from 'react';
import './Comments.css';
import { MdOutlineSend } from 'react-icons/md';
import  { addComment } from '../../redux/slices/postsSlice';
import { useDispatch } from 'react-redux';


const Comments = ({ post, onClose }) => {
  // const posts = useSelector((state) => state.posts); // Access posts from Redux state
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({postId: post.id, comment: newComment})); // Pass post.id to addComment function
      setNewComment('');
    }
  };

  useEffect(() => {
    setNewComment(''); // Clear input field when post changes
  }, [post]);

  return (
    <div className="comments-section">
      <div style={{boxShadow:'none', overflowY:'auto', width: ''}}>
      <span >{post.content}</span>
      <img src={post.image} alt="Post" className="comment-image" />
      <div className="comments-list">
        {post.comments.map((comment, index) => (
          <div key={index} className="comment">
            <img src="https://via.placeholder.com/40" alt="Profile" className="profile-icon" />
            <div className="comment-details">
              <strong>{comment.username}</strong>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="comment-input">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>
        <MdOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default Comments;

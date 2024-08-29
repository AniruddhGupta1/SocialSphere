import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaThumbsUp, FaThumbsDown, FaComment } from 'react-icons/fa';
import { likePost, dislikePost, addComment } from '../../redux/slices/postsSlice';
import './Posts.css';
import Comments from '../Comment/Comments';
import Modal from '../Modal/Modal';

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [activePost, setActivePost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLike = (id) => {
    dispatch(likePost(id));
  };

  const handleDislike = (id) => {
    dispatch(dislikePost(id));
  };

  const handleOpenComments = (post) => {
    setActivePost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setActivePost(null);
  };

  const handleAddComment = (postId, comment) => {
    dispatch(addComment({ postId, comment }));
  };

  // Update the activePost whenever the posts array changes
  useEffect(() => {
    if (activePost) {
      const updatedPost = posts.find((post) => post.id === activePost.id);
      if (updatedPost) {
        setActivePost(updatedPost);
      }
    }
  }, [posts, activePost]);

  return (
    <>
      <h2>Posts</h2>
     { posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className='profile'>
          <img src={post.profile} alt="User" className='profile-pic'></img>
          <span style={{marginLeft: '8px', marginTop: '10px'}}>{post.username}</span>
          </div>
          <div  className="post-content">
           {post.content}
          </div>
          <img src={post.image} alt="Post" className="post-image" />
          <div className="post-actions">
            <div className="action-item">
              <button
                style={{ background: 'none', width: 'fit-content' }}
                onClick={() => handleLike(post.id)}
              >
                <FaThumbsUp className="icon" style={{ color: post.liked ? '#007bff' : '' }} />
                <span>{post.likes} Likes</span>
              </button>
            </div>
            <div className="action-item">
              <button
                style={{ background: 'none', width: 'fit-content' }}
                onClick={() => handleDislike(post.id)}
              >
                <FaThumbsDown className="icon" style={{ color: post.disliked ? '#007bff' : '' }} />
                <span>{post.dislikes} Dislikes</span>
              </button>
            </div>
            <div className="action-item">
              <button
                style={{ background: 'none', width: 'fit-content' }}
                onClick={() => handleOpenComments(post)}
              >
                <FaComment className="icon" />
                <span>{post.comments.length} Comments</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {showModal && activePost && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <Comments post={activePost} addComment={handleAddComment} onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};

export default Posts;

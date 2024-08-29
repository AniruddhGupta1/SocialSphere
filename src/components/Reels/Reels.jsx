import React, { useState, useEffect, useRef } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaThumbsDown,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { LiaCommentSolid } from "react-icons/lia";
import { useDispatch, useSelector } from 'react-redux';
import { likeReel, dislikeReel, addCommentToReel } from '../../redux/slices/reelsSlice';
import "./Reels.css";

const Reels = () => {
  const reels = useSelector((state) => state.reels);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [activeReel, setActiveReel] = useState(null);
  const [newComment, setNewComment] = useState("");
  const reelRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target.querySelector('video');
          if (entry.isIntersecting) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.7 } // Adjust threshold to control when the video should start playing
    );

    reelRefs.current.forEach(ref => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      reelRefs.current.forEach(ref => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [reels]);

  useEffect(() => {
    if (activeReel) {
      const updatedReel = reels.find((reel) => reel.id === activeReel.id);
      setActiveReel(updatedReel);
    }
  }, [reels, activeReel]);

  const handleLike = (id) => {
    dispatch(likeReel(id));
  };

  const handleDislike = (id) => {
    dispatch(dislikeReel(id));
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    dispatch(addCommentToReel({ reelId: activeReel.id, comment: newComment }));
    setNewComment("");
  };

  const handleCommentClick = (id) => {
    setActiveReel(reels.find((reel) => reel.id === id));
    setShowComments(true);
  };

  const onClose = () => {
    setShowComments(false);
  };

  return (
    <div className="reels-container">
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          className={`reel ${
            showComments && activeReel && activeReel.id === reel.id
              ? "shift-left"
              : ""
          }`}
          ref={el => reelRefs.current[index] = el}
        >
          <video className="reel-video">
            <source src={reel.videoUrl} type="video/mp4" />
          </video>
          <div className="reel-actions">
            <button
              onClick={() => handleLike(reel.id)}
              className="reaction-button-style"
            >
              {reel.hasLiked ? (
                <FaHeart
                  className="liked icon-style"
                  style={{ color: "red" }}
                />
              ) : (
                <FaRegHeart className="icon-style" />
              )}
            </button>
            <span>{reel.likes}</span>
            <button
              className="reaction-button-style"
              onClick={() => handleDislike(reel.id)}
            >
              <FaThumbsDown className="disliked icon-style" />
            </button>
            <span>{reel.dislikes}</span>
            <button
              className="reaction-button-style"
              onClick={() => handleCommentClick(reel.id)}
            >
              <LiaCommentSolid className="icon-style" />
            </button>
          </div>

          {showComments && activeReel && activeReel.id === reel.id && (
            <div className="comments-box">
              <FaTimes
                style={{
                  alignSelf: "flex-end",
                  fontSize: "24px",
                  fontFamily: "serif",
                }}
                onClick={onClose}
              />
              <h3 style={{ alignSelf: "flex-start", marginLeft: "20px" }}>
                Comments <span>{reel.comments.length}</span>
              </h3>
              <div className="comments-list">
                {activeReel.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <FaUserCircle className="profile-icon" />
                    <div className="comment-details">
                      <strong>{comment.username}</strong>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="comment-area">
                <FaUserCircle className="profile-icon" />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="comment-button" onClick={handleAddComment}>
                  Comment
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reels;

import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaPhone, FaUserCircle, FaVideo } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, setCurrentChat } from '../../redux/slices/chatsSlice';
import './Chat.css';

const Chat = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.chats.users);
  const currentChat = useSelector((state) => state.chats.currentChat);
  const chats = useSelector((state) => state.chats.chats);

  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const chatBoxRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage({ user: currentChat, message }));
      setMessage('');
    }
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chats, currentChat]);

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-container">
      <div className="user-list">
        <h2 style={{ marginLeft: 0 }}>Chats</h2>
        <input
          type="text"
          placeholder="Search in Chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {filteredUsers.map((user) => (
          <div
            key={user}
            className={`user-item ${user === currentChat ? 'active' : ''}`}
            onClick={() => dispatch(setCurrentChat(user))}
          >
            <FaUserCircle className="profile-icon" />
            {user}
          </div>
        ))}
      </div>

      <div className="chat-section">
        <div className="chat-action">
          <FaUserCircle className="profile-icon" />
          <h3>{currentChat}</h3>
          <div className="chat-icons">
            <FaVideo className="action-icon" />
            <FaPhone className="action-icon" />
          </div>
        </div>

        <div className="chat-box" ref={chatBoxRef}>
          {(chats[currentChat] || []).map((chat) => (
            <div
              key={chat.id}
              className={`chat-message ${chat.user === 'You' ? 'align-right' : 'align-left'}`}
            >
              <strong>{chat.user === 'You' ? 'You' : chat.user}:</strong>
              <p>{chat.message}</p>
            </div>
          ))}
        </div>

        <div className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <FaPaperPlane onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;

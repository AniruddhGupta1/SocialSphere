import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaPhone, FaUserCircle, FaVideo } from 'react-icons/fa';
import './Chat.css';

const Chat = () => {
  const [users] = useState(['User1', 'User2', 'User3']); // Dynamic list of users
  const [currentChat, setCurrentChat] = useState(users[0]); // Initially selected user
  const [message, setMessage] = useState(''); // Current message input
  const [searchTerm, setSearchTerm] = useState(''); // State to track the search input
  
  // Initialize chat state with default messages for User1 and User2
  const [chats, setChats] = useState({
    User1: [
      { id: 1, user: 'User1', message: 'Hi there! How can I help you today?' },
      { id: 2, user: 'You', message: 'I am just checking out this chat app!' }
    ],
    User2: [
      { id: 1, user: 'User2', message: 'Hello! Long time no see.' },
      { id: 2, user: 'You', message: 'Yeah, it’s been a while! How are you?' }
    ],
  });
  
  // Ref to keep track of the chat box DOM element
  const chatBoxRef = useRef(null);

  // Handle sending new message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'You', // Mark user as "You" for the sender
        message: message,
      };
      
      // Update the chat history for the current user
      setChats((prevChats) => ({
        ...prevChats,
        [currentChat]: [...(prevChats[currentChat] || []), newMessage], // Append the new message
      }));
      
      setMessage(''); // Clear the input field
    }
  };

  // UseEffect to scroll to the bottom of the chat box whenever chats or currentChat changes
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chats, currentChat]);

  // Filtered users based on search term
  const filteredUsers = users.filter(user =>
    user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-container">
      {/* Users List */}
      <div className="user-list">
        <h2 style={{ marginLeft: 0 }}>Chats</h2>
        <input
          type="text"
          placeholder="Search in Chat"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {/* Display filtered users */}
        {filteredUsers.map((user) => (
          <div
            key={user}
            className={`user-item ${user === currentChat ? 'active' : ''}`}
            onClick={() => setCurrentChat(user)} // Set currentChat to the selected user
          >
            <FaUserCircle className="profile-icon" />
            {user}
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <div className='chat-action'>
          <FaUserCircle className="profile-icon" />
          <h3>{currentChat}</h3> {/* Display current user name */}
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
              <strong>{chat.user === 'You' ? 'You' : chat.user}:</strong> {/* Show "You" for current user */}
              <p>{chat.message}</p>
            </div>
          ))}
        </div>

        {/* Message Input */}
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

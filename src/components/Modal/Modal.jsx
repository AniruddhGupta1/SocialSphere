import React from 'react';
import { FaTimes } from 'react-icons/fa'; 
import './Modal.css'; 

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" >
      <div className="modal-content">
      <div className="modal-header">
          <FaTimes className="modal-close-icon" onClick={onClose} />
    
        </div>
        {children}
      </div>
    </div>
  );
};
export default Modal;
import React from 'react';
import { FaTimes } from 'react-icons/fa'; // Import the close icon from Font Awesome
import './Modal.css'; // Import CSS styles specific to the Modal component

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
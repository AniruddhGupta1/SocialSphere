// src/components/Button.js
import React from 'react';
import './Button.css'; // Importing the CSS file for button styling

const Button = ({ label, onClick, type = 'button', style, disabled = false }) => {
    return (
        <button
            className="custom-button"
            onClick={onClick}
            type={type}
            style={style}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;

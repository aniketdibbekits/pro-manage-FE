// SuccessPopup.js
import React from 'react';
 import "./Successpopup.css";  

function SuccessPopup({ email, onClose }) {
  return (
    <div className="success-popup">
      <div className="success-popup-content">
        <p className='success-popup-email'> {email} added to  board </p>
        <button className='close-button' onClick={onClose}>okay got it</button>
      </div>
    </div>
  );
}

export default SuccessPopup;

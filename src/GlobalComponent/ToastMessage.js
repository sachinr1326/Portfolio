import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import "./ToastMessage.css"

function ToastMessage({ show, onClose, title, message }) {

  return (

    <Toast show={show} className=" custom-style-toast" onClose={onClose}  delay={3000} autohide>
      <Toast.Header closeButton={false} className='header-toast' >
        {/* <i class="fa-solid fa-circle-info text-primary"></i> */}
        {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
        <strong className="me-auto text-light title">{title}</strong>
    
      </Toast.Header>
      <Toast.Body className='body-text'>{message}</Toast.Body>
      <span className='demo-select-option-edit-close-btn-toast' onClick={onClose} aria-label="Close" style={{ position: "absolute", top: "5px", right: "5px" }}><i class="fa-solid fa-xmark"></i></span>
    </Toast>
 
  );
}

export default ToastMessage;
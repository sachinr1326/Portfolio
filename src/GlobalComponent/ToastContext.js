// ToastContext.js
import React, { createContext, useState, useContext } from 'react';
import ToastMessage from './ToastMessage'; // assuming you have a Toast component
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastContext = createContext();

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (title, message) => {
    const id = new Date().getTime();
    setToasts([...toasts, { id, title, message }]);
  };

  const closeToast = (id) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      <div
    // aria-live="polite"
    // aria-atomic="true";
    style={{ position: "fixed", top: "10%", right: "10px",width:"100%",zIndex:1100 }}
  >
    <ToastContainer position="top-end" className="p-3" >
        {toasts.map(toast => (
          <ToastMessage
            key={toast.id}
            show={true}
            onClose={() => closeToast(toast.id)}
            title={toast.title}
            message={toast.message}
          />
        ))}
   </ToastContainer>
</div>    </ToastContext.Provider>
  );
};

import React from "react";

const Message = ({ title = "", message = "", type = "normal"}) => {
  return (
    <div className="d-flex w-100 justify-content-center py-4">
      <div className={`app-message w-50 ${type}`}>
        <h3 className="title">{title}</h3>
        <p className="message">{message}</p>
      </div>
    </div>
  );
};

export default Message;
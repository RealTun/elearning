import React from "react";
import "./Chatbot.css";
import Header from "../../Header/Header";

const Chatbot = () => {
  return (
    // <div className={`chatbot`}>
    //   <h1>Đây là Component Chatbot</h1>
    // </div>
    <div className="chatbot">
      <Header 
        username="HuongPTA" 
        title="Chatbot"  
        >
      </Header>
      {/* Nội dung khác */}
    </div>
  );
};

export default Chatbot;

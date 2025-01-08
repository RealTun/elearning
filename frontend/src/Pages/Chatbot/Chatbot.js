import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import Header from "../../layouts/Header/Header";

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { text: "Tôi có thể giúp gì cho bạn?", sender: "Bot", time: new Date().toLocaleTimeString() },
  ]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  // Lấy lịch sử chat từ localStorage khi tải lại trang
  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Lưu tin nhắn vào localStorage mỗi khi messages thay đổi
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Send message
  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: "You",
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInput("");

      // Tạo một phản hồi bot giả lập
      setTimeout(() => {
        const botReply = {
          text: "Đây là phản hồi của bot.",
          sender: "Bot",
          time: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, botReply]);
        scrollToBottom(); // Tự động cuộn xuống cuối khi có phản hồi
      }, 1000);
    }
  };

  return (
    <div>
      <Header username="HuongPTA" title="Chatbot" />
      <div className="chat-container">
        <ChatMain
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          messageEndRef={messageEndRef}
        />
      </div>
    </div>
  );
};

const ChatMain = ({ messages, input, setInput, sendMessage, messageEndRef }) => (
  <div className="chat-main">
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.sender === "You" ? "outgoing" : "incoming"}`}
        >
          <div className="chat-bubble">
            <p>{msg.text}</p>
            <span className="chat-time">{msg.time}</span>
          </div>
        </div>
      ))}
      <div ref={messageEndRef} /> {/* Auto-scroll target */}
    </div>
    <div className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  </div>
);

export default ChatApp;

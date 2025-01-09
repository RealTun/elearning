import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import Header from "../../layouts/Header/Header";
import API_URL from "../../config/API_URL.js";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);


  // Lấy lịch sử chat
  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`${API_URL}/openai/chat/history`, {
          headers: {
            Authorization: token,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const conversations = data.data.conversations;

          // Chuyển đổi `conversations` thành định dạng `messages`
          const formattedMessages = conversations.flatMap((conversation) => [
            {
              text: conversation.question,
              sender: "You",
              time: new Date(conversation.timestamp).toLocaleTimeString(),
            },
            {
              text: conversation.answer,
              sender: "Bot",
              time: new Date(conversation.timestamp).toLocaleTimeString(),
            },
          ]);

          setMessages((prev) => [...prev, ...formattedMessages]); // Gộp lịch sử vào messages
        } else {
          console.error("Failed to fetch chat history:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, []);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Send message
  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: "You",
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInput("");

      setIsTyping(true);

      try {
        // Gửi yêu cầu đến API
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/openai/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ message: input }),
        });

        if (response.ok) {
          const data = await response.json();

          // Thêm phản hồi của bot vào danh sách
          const botReply = {
            text: data.answer, // API trả về câu trả lời
            sender: "Bot",
            time: new Date().toLocaleTimeString(),
          };
          setMessages((prev) => [...prev, botReply]);
        } else {
          console.error("Failed to fetch bot response:", response.statusText);
          const errorReply = {
            text: "Bot không thể trả lời ngay lúc này. Vui lòng thử lại sau.",
            sender: "Bot",
            time: new Date().toLocaleTimeString(),
          };
          setMessages((prev) => [...prev, errorReply]);
        }
      } catch (error) {
        console.error("Error fetching bot response:", error);
        const errorReply = {
          text: "Có lỗi xảy ra. Vui lòng thử lại sau.",
          sender: "Bot",
          time: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, errorReply]);
      } finally {
        setIsTyping(false);
        scrollToBottom(); // Tự động cuộn xuống cuối khi có phản hồi
      }
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

const ChatMain = ({
  messages,
  input,
  setInput,
  sendMessage,
  messageEndRef,
  isTyping
}) => (
  <div className="chat-main">
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message mb-4 ${msg.sender === "You" ? "outgoing" : "incoming"}`}
        >
          <div className={`chat-bubble ${msg.sender === "You" ? "outgoing" : "incoming"}`}>
            <p>{msg.text}</p>
            <span className="chat-time">{msg.time}</span>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="chat-message incoming">
          <div className="chat-bubble incoming">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}

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

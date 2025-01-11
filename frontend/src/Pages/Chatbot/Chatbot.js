import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Chatbot.css";
import Header from "../../layouts/Header/Header";
import API_URL from "../../config/API_URL.js";
import { toast, ToastContainer } from "react-toastify";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);

  // Lấy lịch sử chat
  useEffect(() => {
    const fetchChatHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_URL}/openai/chat/history`, {
          headers: { Authorization: token },
        });
        if (response.ok) {
          const data = await response.json();
          const conversations = data.data.conversations;

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

          setMessages((prev) => [...prev, ...formattedMessages]);
        } else {
          toast.error("Không thể tải lịch sử chat");
        }
      } catch (error) {
        toast.error("Lỗi khi tải lịch sử chat");
      }
    };

    fetchChatHistory();
  }, []);

  // Cuộn xuống cuối cùng
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const checkMembership = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/user/checkMembershipStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      return data.isPaidMember === true;
    } catch (error) {
      return false;
    }
  };

  // Gửi tin nhắn
  const sendMessage = async () => {
    if (!input.trim()) return;

    if (!(await checkMembership())) {
      toast.error("Vui lòng nâng cấp gói thành viên để sử dụng!");
      return;
    }

    const userMessage = {
      text: input,
      sender: "You",
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
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
        const botMessage = {
          text: data.answer,
          sender: "Bot",
          time: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Bot không thể trả lời ngay lúc này. Vui lòng thử lại sau.", sender: "Bot", time: new Date().toLocaleTimeString() },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Có lỗi xảy ra. Vui lòng thử lại sau.", sender: "Bot", time: new Date().toLocaleTimeString() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div>
      <Header username="HuongPTA" title="Chatbot" />
      <ToastContainer />
      <div className="chat-container">
        <ChatMain
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          messageEndRef={messageEndRef}
          isTyping={isTyping}
        />
      </div>
    </div>
  );
};

const ChatMain = ({ messages, input, setInput, sendMessage, messageEndRef, isTyping }) => (
  <div className="chat-main">
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.sender === "You" ? "outgoing" : "incoming"}`}>
          <div className={`chat-bubble ${msg.sender === "You" ? "outgoing" : "incoming"}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
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
      <div ref={messageEndRef} />
    </div>
    <div className="chat-input">
      <textarea
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) { // Kiểm tra nếu chỉ nhấn Enter mà không nhấn Shift
            e.preventDefault(); // Ngăn xuống dòng
            sendMessage(); // Gọi hàm gửi tin nhắn
          }
        }}
        placeholder="Nhập câu hỏi..."
      />
      <button onClick={sendMessage}>Gửi</button>
    </div>
  </div>
);

export default ChatApp;

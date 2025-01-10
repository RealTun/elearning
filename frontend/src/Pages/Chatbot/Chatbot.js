import React, { useState, useRef, useEffect } from "react";
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
    const token = localStorage.getItem("token");
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

  // Cuộn xuống cuối khi có tin nhắn mới hoặc khi load lịch sử chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cuộn xuống cuối
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const checkMembership = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/user/checkMembershipStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isPaidMember === true) {
          return true;
        }
      }

      return false;
    } catch (error) {
      // console.error("Error checkMembership:", error);
      return false;
    }
  }

  // Gửi tin nhắn
  const sendMessage = async () => {

    const isPaidMember = await checkMembership();

    if (!isPaidMember) {
      toast.error("Vui lòng nâng cấp gói thành viên để sử dụng!", { autoClose: 2000 });
      return;
    }

    if (input.trim()) {
      const newMessage = {
        text: input,
        sender: "You",
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInput("");

      setIsTyping(true); // Hiển thị trạng thái đang gõ

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

          // Thêm phản hồi của bot
          const botReply = {
            text: data.answer,
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
        setIsTyping(false); // Ẩn trạng thái đang gõ
        scrollToBottom(); // Cuộn xuống cuối
      }
    }
  };

  return (
    <div>
      <Header username="HuongPTA" title="Chatbot" />
      <ToastContainer></ToastContainer>
      <div className="chat-container">
        <ChatMain
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          messageEndRef={messageEndRef}
          isTyping={isTyping} // Truyền trạng thái isTyping
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
  isTyping,
}) => (
  <div className="chat-main">
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message mb-4 ${msg.sender === "You" ? "outgoing" : "incoming"
            }`}
        >
          <div
            className={`chat-bubble ${msg.sender === "You" ? "outgoing" : "incoming"
              }`}
          >
            <p>{msg.text}</p>
            <span className="chat-time">{msg.time}</span>
          </div>
        </div>
      ))}
      {isTyping && ( // Hiển thị trạng thái "Bot đang trả lời..."
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
        placeholder="Nhập câu hỏi...."
      />
      <button onClick={sendMessage}>Gửi</button>
    </div>
  </div>
);

export default ChatApp;

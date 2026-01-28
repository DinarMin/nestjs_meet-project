import "./chat.css";
import React, { useState, useEffect, useRef } from "react";

export function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // Автоматический скролл вниз при новых сообщениях
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="app-layout">
      {/* ЛЕВАЯ ПАНЕЛЬ */}
      <aside className="sidebar">
        <div className="sidebar-search">
          <input type="text" placeholder="Поиск контактов..." />
        </div>

        <div className="chats-list">
          <div className="chat-item active">
            <div className="avatar">JD</div>
            <div className="chat-details">
              <div className="chat-top">
                <span className="name">John Doe</span>
                <span className="time">12:45</span>
              </div>
              <p className="last-msg">Как там бэкенд на NestJS?</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ОКНО ЧАТА */}
      <section className="main-chat">
        <header className="chat-header">
          <div className="header-info">
            <h4>John Doe</h4>
            <span className="status">в сети</span>
          </div>
          <div className="header-actions">
            <button className="icon-btn">📞</button>
            <button className="icon-btn">⋮</button>
          </div>
        </header>

        <div className="messages-container">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`message-row ${m.senderId === "me" ? "sent" : "received"}`}
            >
              <div className="bubble">
                <p>{m.text}</p>
                <span className="msg-time">{m.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <footer className="chat-input-bar">
          <button className="attach-btn">📎</button>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напишите сообщение..."
          />
          <button
            className="send-btn"
            onClick={() => console.log("Send:", inputValue)}
          >
            ➤
          </button>
        </footer>
      </section>
    </div>
  );
}

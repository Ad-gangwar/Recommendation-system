"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from './chatbot.module.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const initialMessages: Message[] = [
  { sender: 'bot', text: 'Hello! How can I help you today?' },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');
  };

  return (
    <>
      <button
        className={styles.stickyButton}
        onClick={() => setOpen(true)}
        aria-label="Open chatbot"
        style={{ display: open ? 'none' : 'flex' }}
      >
        💬
      </button>
      {open && (
        <div className={styles.dialogOverlay} onClick={() => setOpen(false)}>
          <div
            className={styles.chatbotPopup}
            onClick={e => e.stopPropagation()}
          >
            <div className={styles.chatbotHeader}>
              Chatbot
              <button
                style={{ float: 'right', background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
            <div className={styles.messagesArea}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    styles.message + ' ' + (msg.sender === 'user' ? styles.userMessage : styles.botMessage)
                  }
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className={styles.inputArea} onSubmit={handleSend}>
              <input
                className={styles.input}
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button className={styles.sendButton} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 
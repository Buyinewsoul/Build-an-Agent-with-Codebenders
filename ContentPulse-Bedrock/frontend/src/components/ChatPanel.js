import React, { useState } from 'react';
import '../styles/ChatPanel.css';

function ChatPanel({ messages, onSendMessage }) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    const userMessage = inputValue;
    setInputValue('');

    await onSendMessage(userMessage);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h2>💬 Chat with ContentPulse AI</h2>
        <p>Ask questions about your content performance</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-welcome">
            <div className="welcome-icon">🤖</div>
            <h3>Welcome to ContentPulse AI Assistant</h3>
            <p>Ask me questions about your content analytics, performance trends, or get recommendations.</p>
            <div className="example-questions">
              <p>Try asking:</p>
              <ul>
                <li>What are my top performing topics?</li>
                <li>How can I improve engagement?</li>
                <li>What content should I focus on?</li>
              </ul>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.role}`}>
              <div className="message-avatar">
                {msg.role === 'user' ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question here..."
          disabled={isLoading}
          rows="3"
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? '⏳ Sending...' : '📤 Send'}
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;

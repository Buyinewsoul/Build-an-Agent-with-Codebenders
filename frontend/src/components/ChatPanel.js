import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatPanel.css';

function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hi! I\'m ContentPulse AI. I can help you understand your content performance, answer questions about your analytics, and provide recommendations. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(`session-${Date.now()}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          sessionId,
        }),
      });

      const data = await response.json();

      const assistantMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your message. Please check that the backend server is running.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    'What\'s our top performing topic?',
    'Generate insights on AI content',
    'How\'s engagement trending this week?',
    'Which topics need improvement?',
  ];

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h1>💬 ContentPulse Chat</h1>
        <p className="chat-subtitle">Ask me anything about your content analytics</p>
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <div key={msg.id} className={`message message-${msg.role}`}>
            <div className="message-avatar">
              {msg.role === 'user' ? '👤' : '🤖'}
            </div>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="message message-assistant">
            <div className="message-avatar">🤖</div>
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="suggested-questions">
          <p className="suggestion-label">Try asking:</p>
          <div className="suggestion-buttons">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="suggestion-btn"
                onClick={() => {
                  setInput(question);
                }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="input-area">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about content performance, topics, engagement, or anything else..."
          className="message-input"
          rows="2"
          disabled={loading}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !input.trim()}
          className={`send-button ${loading ? 'loading' : ''}`}
        >
          {loading ? '⏳' : '📤'}
        </button>
      </div>
    </div>
  );
}

export default ChatPanel;

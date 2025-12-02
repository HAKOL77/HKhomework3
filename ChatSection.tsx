import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  user: string;
  text: string;
  time: string;
}

export const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'sans', text: '안녕하세요! 같이 공부해요.', time: '10:00' },
    { id: 2, user: 'jerry', text: '좋아요! 오늘 목표는 3시간입니다.', time: '10:02' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now(),
      user: 'Me',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-[600px] lg:h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-600/50 mb-0">
        <button className="px-4 py-2 text-sm font-medium text-blue-400 border-b-2 border-blue-500 focus:outline-none">
          채팅
        </button>
        <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-200 focus:outline-none">
          공지사항
        </button>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-gray-700/30 border border-t-0 border-gray-600/50 rounded-b-lg rounded-tr-lg p-4 flex flex-col gap-4 overflow-hidden">
        <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 pr-2">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.user === 'Me' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-bold text-gray-300">{msg.user}</span>
                <span className="text-[10px] text-gray-500">{msg.time}</span>
              </div>
              <div className={`px-3 py-2 rounded-lg text-sm max-w-[85%] break-words ${
                msg.user === 'Me' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-600 text-gray-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-2 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              className="w-full bg-gray-700 border border-gray-500 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-10 placeholder-gray-400"
              placeholder="텍스트 입력..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={handleSend}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

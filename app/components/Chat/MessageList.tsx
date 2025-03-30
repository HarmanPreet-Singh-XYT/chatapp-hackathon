import { Check } from 'lucide-react';
import React, { useRef, useEffect } from 'react';

const MessageList = ({ messages, chatBgClass, messageBgSent, messageBgReceived, subtleColor, darkMode }) => {
  const messageEndRef = useRef(null);
  
  useEffect(() => {
    // Scroll to bottom of messages
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'delivered':
        return <div className="flex"><Check size={14} className="text-gray-400" /><Check size={14} className="text-gray-400 -ml-1" /></div>;
      case 'read':
        return <div className="flex"><Check size={14} className="text-blue-500" /><Check size={14} className="text-blue-500 -ml-1" /></div>;
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={`flex-1 overflow-y-auto p-4 ${chatBgClass}`}
      style={{ 
        backgroundImage: darkMode 
          ? 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z" fill="%23ffffff" fill-opacity="0.02" fill-rule="evenodd"/%3E%3C/svg%3E")' 
          : 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z" fill="%23000000" fill-opacity="0.02" fill-rule="evenodd"/%3E%3C/svg%3E")'
      }}
    >
      <div className="space-y-3">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 0 ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              max-w-xs md:max-w-md lg:max-w-lg px-4 py-2.5 rounded-2xl shadow-sm flex flex-col
              ${msg.sender === 0
                ? `${messageBgSent} text-white rounded-tr-none`
                : `${messageBgReceived} rounded-tl-none`
              }
            `}>
              <div className="text-sm">{msg.text}</div>
              <div className={`text-xs mt-1 flex justify-end items-center ${msg.sender === 0 ? 'text-blue-100' : subtleColor}`}>
                {msg.time}
                {msg.sender === 0 && (
                  <span className="ml-1">
                    {getStatusIcon(msg.status)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
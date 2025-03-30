import React from 'react';
import { MessageCircle } from 'lucide-react';

const WelcomeScreen = ({ accentColor, subtleColor, gradientButton,startConv }) => {
  return (
    <div className="text-center p-8 max-w-md">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
        <MessageCircle size={40} className={`${accentColor}`} />
      </div>
      <h1 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Welcome to ChatFlow</h1>
      <p className={`${subtleColor} mb-6`}>Select a conversation to start chatting or create a new one</p>
      <button onClick={startConv}
        className={`px-6 py-3 rounded-lg ${gradientButton} text-white shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex items-center justify-center mx-auto`}
      >
        <MessageCircle size={18} className="mr-2" />
        Start new conversation
      </button>
    </div>
  );
};

export default WelcomeScreen;
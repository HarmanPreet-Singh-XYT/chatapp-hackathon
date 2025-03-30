import React from 'react';
import { Phone, Video, MoreVertical, Users, ArrowLeft } from 'lucide-react';

const ChatHeader = ({ 
  currentChat, 
  iconColor, 
  buttonHighlight,
  handleAudioCall, 
  handleVideoCall, 
  setShowProfiles, 
  showProfiles,
  setCurrentChat
}) => {
  return (
    <div className={`px-4 py-3 border-b flex justify-between items-center shadow-md z-10 relative`}>
      <div className="flex items-center">
        <button 
          onClick={()=>setCurrentChat(null)}
          className={`p-2 mr-2 rounded-full sm:hidden ${buttonHighlight} transition-colors duration-200 shadow-sm`}
          aria-label="Go back"
        >
          <ArrowLeft size={18} className={iconColor} />
        </button>
        <div className="relative">
          <img 
            src={currentChat.avatar} 
            alt={currentChat.name} 
            className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-opacity-10 ring-white dark:ring-gray-700" 
          />
          {currentChat.online && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
          )}
          {currentChat.isGroup && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 border-2 border-white dark:border-gray-800 rounded-full flex items-center justify-center">
              <Users size={8} className="text-white" />
            </div>
          )}
        </div>
        <div className="ml-3">
          <div className="font-semibold">{currentChat.name}</div>
          <div className="text-xs text-gray-500">
            {currentChat.online 
              ? currentChat.typing 
                ? 'typing...' 
                : 'Online'
              : `Last seen ${currentChat.lastSeen || 'recently'}`
            }
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <button 
          className={`p-2 rounded-full ${buttonHighlight} transition-colors duration-200 shadow-sm`}
          aria-label="Voice call"
          onClick={handleAudioCall}
        >
          <Phone size={18} className={iconColor} />
        </button>
        <button 
          onClick={handleVideoCall}
          className={`p-2 rounded-full ${buttonHighlight} transition-colors duration-200 shadow-sm`}
          aria-label="Video call"
        >
          <Video size={18} className={iconColor} />
        </button>
        <button 
          className={`p-2 rounded-full ${buttonHighlight} transition-colors duration-200 shadow-sm`}
          aria-label="More options"
          onClick={() => {setShowProfiles(true)}}
        >
          <MoreVertical size={18} className={iconColor} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
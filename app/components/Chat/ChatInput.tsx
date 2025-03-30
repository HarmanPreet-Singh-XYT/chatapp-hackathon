import React, { useRef, useEffect, useState } from 'react';
import { Smile, Paperclip, Send, Mic, X, Image,File as FileIcon, Volume2 } from 'lucide-react';

const ChatInput = ({
  message,
  setMessage,
  handleSendMessage,
  glassClass,
  inputClass,
  buttonHighlight,
  iconColor,
  gradientButton,
  darkMode
}) => {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingTimer, setRecordingTimer] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [permissionError, setPermissionError] = useState(null);
  
  // Expanded emoji set categorized
  const emojiCategories = {
    'Frequently Used': ['😊', '👍', '❤️', '😂', '🙏', '😍', '🔥', '👏', '😭', '🎉'],
    'Emotions': ['🥰', '😎', '🤔', '😁', '🥺', '😢', '🙄', '😤', '😴', '🤯'],
    'Gestures': ['👋', '✌️', '👌', '🤝', '👊', '🙌', '🤲', '👏', '🤞', '🤟'],
    'Symbols': ['✨', '💯', '⭐', '💥', '💫', '💨', '💦', '🔥', '❤️', '💔']
  };

  // Track clicks outside the emoji picker
  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Open emoji picker"]')) {
        setShowEmojiPicker(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Auto resize textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Clear permission error after 5 seconds
  useEffect(() => {
    if (permissionError) {
      const timer = setTimeout(() => {
        setPermissionError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [permissionError]);

  // Update recording duration
  useEffect(() => {
    if (isRecording) {
      const timer = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      setRecordingTimer(timer);
      return () => clearInterval(timer);
    } else {
      clearInterval(recordingTimer);
      setRecordingDuration(0);
    }
  }, [isRecording]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim() || attachments.length > 0) {
        handleSend();
      }
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage(prev => prev + emoji);
    // Focus back on textarea after emoji selection but don't close picker
    textareaRef.current?.focus();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setAttachments(prev => [...prev, ...files]);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return <Image size={14} className="mr-1" />;
    if (file.type.includes('audio')) return <Volume2 size={14} className="mr-1" />;
    return <FileIcon size={14} className="mr-1" />;
  };

  const getFilePreview = (file) => {
    if (file.type.startsWith('image/')) {
      return (
        <div className="relative group">
          <img 
            src={URL.createObjectURL(file)} 
            alt="Preview" 
            className="h-16 w-16 object-cover rounded"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button 
              onClick={() => removeAttachment(attachments.indexOf(file))}
              className="p-1 bg-red-500 rounded-full text-white"
              aria-label="Remove attachment"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div className={`relative flex items-center p-1.5 px-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} text-sm group`}>
        <span className="flex items-center truncate max-w-xs">
          {getFileIcon(file)}
          {file.type.includes('audio') ? 'Voice Message' : file.name}
        </span>
        <button 
          className="ml-2 p-0.5 rounded-full opacity-50 group-hover:opacity-100 hover:bg-red-100 hover:text-red-500" 
          onClick={() => removeAttachment(attachments.indexOf(file))}
          aria-label="Remove attachment"
        >
          <X size={14} />
        </button>
      </div>
    );
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const startRecording = async () => {
    try {
      // Clear any previous error
      setPermissionError(null);
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const chunks = [];
      setAudioChunks(chunks);
      
      // recorder.ondataavailable = (e) => {
      //   chunks.push(e.data);
      // };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        const audioFile = new File([audioBlob], 'voice-message.webm', { type: 'audio/webm' });

        setAttachments(prev => [...prev, audioFile]);
        setAudioChunks([]);
      };
      
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      
      // Handle different types of errors
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setPermissionError('Microphone access denied. Please check your browser settings to allow microphone access.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setPermissionError('No microphone detected. Please connect a microphone and try again.');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setPermissionError('Could not access your microphone. It may be in use by another application.');
      } else {
        setPermissionError('Could not access microphone. Please check your settings and try again.');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      // Stop all audio tracks
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      // You would need to modify your handleSendMessage function to include attachments
      handleSendMessage(attachments);
      // Clear attachments after sending
      setAttachments([]);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <div className={`p-3 border-t ${glassClass} ${darkMode ? 'border-gray-700/30' : 'border-gray-200/30'} shadow-lg z-10 relative transition-all duration-200`}>
      {/* Permission Error Notification */}
      {permissionError && (
        <div className={`absolute top-0 left-0 right-0 transform -translate-y-full p-3 bg-red-500 text-white rounded-t-lg shadow-lg text-sm font-medium animate-fade-in`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              <span>{permissionError}</span>
            </div>
            <button 
              className="text-white hover:text-gray-200 transition-colors duration-200"
              onClick={() => setPermissionError(null)}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
      
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div 
          ref={emojiPickerRef}
          className={`absolute bottom-20 left-4 p-3 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} max-w-xs animate-fade-in`}
          style={{ width: '320px' }}
        >
          <div className="mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Emojis</h4>
          </div>
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <div key={category} className="mb-3">
              <h5 className="text-xs text-gray-500 dark:text-gray-400 mb-1">{category}</h5>
              <div className="grid grid-cols-10 gap-1">
                {emojis.map((emoji, index) => (
                  <button 
                    key={index}
                    className={`p-1 text-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded transition-colors duration-150`}
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Recording Indicator */}
      {isRecording && (
        <div className={`absolute top-0 left-0 right-0 transform -translate-y-full p-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-t-lg shadow-lg animate-fade-in`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></span>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Recording {formatDuration(recordingDuration)}</span>
            </div>
            <button 
              className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
              onClick={stopRecording}
            >
              Stop
            </button>
          </div>
        </div>
      )}
      
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className={`flex flex-wrap gap-2 p-2 mb-2 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} transition-all duration-200`}>
          {attachments.map((file, index) => (
            <div key={index}>
              {getFilePreview(file)}
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-end">
        <div className="flex-1 p-2 bg-transparent">
          <div className="flex mb-1 space-x-2">
            <button 
              className={`p-1.5 rounded-full ${buttonHighlight} transition-colors duration-200 relative`} 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              aria-label="Open emoji picker"
            >
              <Smile size={18} className={`${iconColor} transition-transform duration-200 ${showEmojiPicker ? 'scale-110' : ''}`} />
              {showEmojiPicker && <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>}
            </button>
            <button 
              className={`p-1.5 rounded-full ${buttonHighlight} transition-colors duration-200`}
              onClick={() => fileInputRef.current?.click()}
              aria-label="Attach files"
            >
              <Paperclip size={18} className={iconColor} />
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
                accept="image/*,audio/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              />
            </button>
          </div>
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isRecording ? "Recording voice message..." : "Type a message..."}
              className={`${inputClass} w-full px-4 py-3 rounded-lg max-h-32 min-h-[3rem] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm resize-none ${isRecording ? 'bg-opacity-50' : ''}`}
              aria-label="Message input"
              disabled={isRecording}
            />
          </div>
        </div>
        <button
          className={`ml-2 p-3 rounded-full ${message.trim() || attachments.length > 0 ? gradientButton : isRecording ? 'bg-red-500' : buttonHighlight} text-white transition-all duration-200 transform hover:scale-105 hover:shadow-lg`}
          onClick={message.trim() || attachments.length > 0 ? handleSend : toggleRecording}
          aria-label={message.trim() || attachments.length > 0 ? "Send message" : isRecording ? "Stop recording" : "Start recording"}
        >
          {message.trim() || attachments.length > 0 ? (
            <Send size={20} />
          ) : (
            <Mic size={20} className={isRecording ? "text-white animate-pulse" : iconColor} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
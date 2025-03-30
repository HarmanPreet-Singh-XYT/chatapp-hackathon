import React from 'react';
import { Check as CheckIcon, X } from 'lucide-react';

const Notification = ({ showNotification, setShowNotification }) => {
  if (!showNotification) return null;
  
  return (
    <div className="fixed bottom-4 right-4 max-w-xs w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transform transition-all duration-500 animate-slideInUp z-50">
      <div className="flex p-4">
        <div className="flex-shrink-0 mr-3">
          <CheckIcon size={20} className="text-green-500 bg-green-100 dark:bg-green-900/30 p-1 rounded-full" />
        </div>
        <div className="flex-1">
          <p className="font-medium">Message sent</p>
          <p className="text-sm text-gray-500">Your message has been delivered</p>
        </div>
        <button className="ml-4" onClick={() => setShowNotification(false)}>
          <X size={16} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
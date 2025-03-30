'use client'
import React, { useState } from 'react';
import { 
  Search, MoreVertical, ArrowLeft, User, Settings, Bell, Lock, LogOut, 
  Phone, Video, X, Plus, Filter, Users, MessageCircle, Camera, Moon, Sun
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const Sidebar = ({ 
  contacts, 
  statuses, 
  calls, 
  currentChat, 
  setCurrentChat, 
  darkMode, 
  setDarkMode, 
  setShowProfiles, 
  themeClasses,
  toggleAddContact,
  setSearchQuery,
  searchQuery,
  handleVoiceCall,
  handleVideoCall,
  handleStatus,
  toggleStatusCreate,
  openSettings,
  showMyProfile
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [view, setView] = useState('chats'); // 'chats', 'status', 'calls'
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter statuses based on search query
  const filteredStatuses = statuses.filter(status => 
    status.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter calls based on search query
  const filteredCalls = calls.filter(call => 
    call.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setShowDropdown(false);
  };
  const router = useRouter();
  
  return (
    <>
      <div 
        className={`${showSidebar ? 'w-full sm:w-80 md:w-96' : 'w-0'} ${themeClasses.sidebar} border-r flex flex-col transition-all duration-300 ease-in-out shadow-lg ${currentChat ? 'hidden sm:flex' : 'flex'} h-full`}
      >
        {/* Header */}
        <div className={`px-4 py-4 sm:py-3 border-b ${themeClasses.header} flex justify-between items-center shadow-md z-20 relative`}>
          <div className="font-bold text-lg flex items-center">
            <span className={`${themeClasses.accentColor} mr-2 text-xl`}>💬</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">FluChat</span>
          </div>
          <div className="flex space-x-3">
            <button 
              className={`p-3 sm:p-2 rounded-full ${themeClasses.buttonHighlight} transition-all duration-200 shadow-sm`} 
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} className={themeClasses.iconColor} /> : <Moon size={20} className={themeClasses.iconColor} />}
            </button>
            <button 
              className={`p-3 sm:p-2 rounded-full ${themeClasses.buttonHighlight} transition-all duration-200 shadow-sm`} 
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="More options"
            >
              <MoreVertical size={20} className={themeClasses.iconColor} />
            </button>
            {showDropdown && (
              <div className={`absolute right-4 mt-14 sm:mt-12 w-56 rounded-lg shadow-xl py-1 ${themeClasses.glass} border z-10 overflow-hidden transition-all duration-200 transform origin-top-right`}>
                <button className={`flex items-center px-4 py-4 sm:py-3 text-sm w-full text-left ${themeClasses.hover} transition-colors duration-150`} onClick={() => {setShowDropdown(false); showMyProfile()}}>
                  <User size={16} className="mr-3" />
                  Profile
                </button>
                <button className={`flex items-center px-4 py-4 sm:py-3 text-sm w-full text-left ${themeClasses.hover} transition-colors duration-150`} onClick={() => {setShowDropdown(false); openSettings()}}>
                  <Settings size={16} className="mr-3" />
                  Settings
                </button>
                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                <button className={`flex items-center px-4 py-4 sm:py-3 text-sm w-full text-left text-red-500 ${themeClasses.hover} transition-colors duration-150`} onClick={() => {router.push('/'); setShowDropdown(false)}}>
                  <LogOut size={16} className="mr-3" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button 
            className={`flex-1 py-5 sm:py-4 text-center relative transition-all duration-200 ${view === 'chats' ? themeClasses.accentColor : themeClasses.subtleColor}`}
            onClick={() => setView('chats')}
            aria-label="Chats tab"
          >
            <MessageCircle size={20} className="mx-auto" />
            <span className="text-xs mt-1 block font-medium">Chats</span>
            {view === 'chats' && (
              <div className={`absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-t-full transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-blue-400 to-indigo-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}></div>
            )}
          </button>
          <button 
            className={`flex-1 py-5 sm:py-4 text-center relative transition-all duration-200 ${view === 'status' ? themeClasses.accentColor : themeClasses.subtleColor}`}
            onClick={() => setView('status')}
            aria-label="Status tab"
          >
            <Camera size={20} className="mx-auto" />
            <span className="text-xs mt-1 block font-medium">Status</span>
            {view === 'status' && (
              <div className={`absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-t-full transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-blue-400 to-indigo-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}></div>
            )}
          </button>
          <button 
            className={`flex-1 py-5 sm:py-4 text-center relative transition-all duration-200 ${view === 'calls' ? themeClasses.accentColor : themeClasses.subtleColor}`}
            onClick={() => setView('calls')}
            aria-label="Calls tab"
          >
            <Phone size={20} className="mx-auto" />
            <span className="text-xs mt-1 block font-medium">Calls</span>
            {view === 'calls' && (
              <div className={`absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-t-full transition-all duration-300 ${darkMode ? 'bg-gradient-to-r from-blue-400 to-indigo-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}></div>
            )}
          </button>
        </div>
        
        {/* Search */}
        <div className="p-4 border-b border-gray-200/20 dark:border-gray-700/30">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className={themeClasses.subtleColor} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${themeClasses.input} w-full pl-10 pr-10 py-3 sm:py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 shadow-sm`}
              placeholder={view === 'chats' ? "Search conversations..." : view === 'status' ? "Search status updates..." : "Search calls..."}
              aria-label="Search"
            />
            {searchQuery && (
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} className={themeClasses.subtleColor} />
              </button>
            )}
          </div>
        </div>
        
        {/* Content based on view */}
        {view === 'chats' && (
          <ChatList 
            filteredContacts={filteredContacts} 
            currentChat={currentChat} 
            setCurrentChat={setCurrentChat}
            darkMode={darkMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            themeClasses={themeClasses}
          />
        )}
        
        {view === 'status' && (
          <StatusList 
            statuses={filteredStatuses} 
            darkMode={darkMode}
            themeClasses={themeClasses}
            contacts={contacts}
            setCurrentChat={setCurrentChat}
            setSearchQuery={setSearchQuery}
            handleViewStatus={handleStatus}
            showStatusCreate={toggleStatusCreate}
          />
        )}
        
        {view === 'calls' && (
          <CallList 
            calls={filteredCalls} 
            darkMode={darkMode}
            themeClasses={themeClasses}
            handleVideoCall={handleVideoCall}
            handleVoiceCall={handleVoiceCall}
            contacts={contacts}
            setCurrentChat={setCurrentChat}
            setSearchQuery={setSearchQuery}
          />
        )}

        {/* Floating action button */}
        <div className="sticky bottom-6 sm:bottom-4 flex justify-end pr-4 mt-auto pb-2">
          <button 
            onClick={toggleAddContact}
            className={`p-4 sm:p-3 rounded-full ${themeClasses.gradientButton} text-white shadow-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl`}
            aria-label="New conversation"
          >
            <MessageCircle size={24} className="sm:hidden" />
            <MessageCircle size={20} className="hidden sm:block" />
          </button>
        </div>
      </div>
      
      {/* Mobile sidebar toggle */}
      <button 
        className={`fixed left-4 bottom-6 sm:hidden z-30 p-4 rounded-full ${themeClasses.glass} shadow-lg ${currentChat ? 'flex' : 'hidden'} transition-all duration-300 hover:shadow-xl`}
        onClick={() => setCurrentChat(null)}
        aria-label="Back to conversation list"
      >
        <ArrowLeft size={24} />
      </button>
    </>
  );
};

// Sub-components
const ChatList = ({ filteredContacts, currentChat, setCurrentChat, darkMode, searchQuery, setSearchQuery, themeClasses }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {filteredContacts.length > 0 ? filteredContacts.map((contact) => (
        <div
          key={contact.id}
          className={`flex items-center p-4 sm:p-4 border-b ${darkMode ? 'border-gray-700/30' : 'border-gray-100/50'} ${themeClasses.hover} transition-all duration-200 cursor-pointer ${currentChat?.id === contact.id ? themeClasses.active : ''}`}
          onClick={() => setCurrentChat(contact)}
        >
          <div className="relative">
            <img 
              src={contact.avatar} 
              alt={contact.name} 
              className="w-14 h-14 sm:w-12 sm:h-12 rounded-full object-cover shadow-md ring-2 ring-opacity-10 ring-white dark:ring-gray-700" 
            />
            {contact.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-sm"></div>
            )}
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <span className="font-semibold truncate text-base sm:text-sm">{contact.name}</span>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{contact.time}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-sm text-gray-500 truncate max-w-full flex-1">
                {contact.isGroup && <span className="font-medium mr-1">{contact.name.split(' ')[0]}:</span>}
                {contact.typing ? (
                  <span className="italic text-blue-500 flex items-center">
                    typing
                    <span className="ml-1 flex space-x-0.5">
                      <span className="animate-bounce w-1 h-1 bg-blue-500 rounded-full inline-block" style={{ animationDelay: '0ms' }}></span>
                      <span className="animate-bounce w-1 h-1 bg-blue-500 rounded-full inline-block" style={{ animationDelay: '100ms' }}></span>
                      <span className="animate-bounce w-1 h-1 bg-blue-500 rounded-full inline-block" style={{ animationDelay: '200ms' }}></span>
                    </span>
                  </span>
                ) : contact.lastMessage}
              </div>
              <div className="flex items-center ml-2">
                {contact.unread > 0 && (
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center rounded-full shadow-sm">
                    {contact.unread}
                  </div>
                )}
                {contact.isGroup && !contact.unread && (
                  <div className="text-xs text-gray-500 flex items-center">
                    <Users size={12} className="mr-1" />
                    {contact.members}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )) : (
        <div className="p-8 text-center">
          <div className={`${themeClasses.subtleColor} mb-4`}>
            <Search size={36} className="mx-auto mb-2 opacity-40" />
            <p className="font-medium">No matches found</p>
          </div>
          <p className="text-sm text-gray-500 mb-5">No conversations match "{searchQuery}"</p>
          <button 
            className={`px-4 py-3 sm:py-2 rounded-lg ${themeClasses.buttonHighlight} transition-all duration-200 shadow-sm`}
            onClick={() => setSearchQuery('')}
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

const StatusList = ({ statuses, darkMode, showStatusCreate, themeClasses, contacts, setCurrentChat, setSearchQuery, handleViewStatus }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div 
          className="p-4 border-b border-gray-200/20 dark:border-gray-700/30 cursor-pointer"
          onClick={() => showStatusCreate()}
        >
          <div className="flex items-center">
            <div className="relative">
              <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 p-0.5">
                <img 
                  src="https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?cs=srgb&dl=pexels-padrinan-255379.jpg&fm=jpg" 
                  alt="My Status" 
                  className="w-full h-full rounded-full object-cover ring-2 ring-white dark:ring-gray-800" 
                />
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 sm:w-6 sm:h-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center shadow-md">
                <Plus size={16} className="sm:hidden" />
                <Plus size={14} className="hidden sm:block" />
              </div>
            </div>
            <div className="ml-4">
              <div className="font-semibold text-base sm:text-sm">My Status</div>
              <div className="text-sm text-gray-500">Tap to add status update</div>
            </div>
          </div>
        </div>
      
      {statuses.length > 0 ? (
        <>
          <div className="px-4 py-3 sm:py-2 text-xs font-medium uppercase tracking-wider text-gray-500 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">Recent Updates</div>
          
          {statuses.map(status => (
            <div 
              key={status.id} 
              className={`flex items-center p-4 sm:p-4 border-b ${darkMode ? 'border-gray-700/30' : 'border-gray-100/50'} ${themeClasses.hover} transition-all duration-200 cursor-pointer`}
              onClick={() => handleViewStatus(status)}
            >
              <div className="relative">
                <div className={`w-16 h-16 sm:w-14 sm:h-14 rounded-full ${status.seen ? 'bg-gray-300/30 dark:bg-gray-600/30' : 'bg-gradient-to-br from-green-400 to-green-500'} p-0.5`}>
                  <img 
                    src={status.user.avatar} 
                    alt={status.user.name} 
                    className="w-full h-full rounded-full object-cover ring-2 ring-white dark:ring-gray-800" 
                  />
                </div>
              </div>
              <div className="ml-4">
                <div className="font-semibold text-base sm:text-sm">{status.user.name}</div>
                <div className="text-sm text-gray-500">{status.time}</div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="p-8 text-center">
          <div className={`${themeClasses.subtleColor} mb-4`}>
            <Search size={36} className="mx-auto mb-2 opacity-40" />
            <p className="font-medium">No matches found</p>
          </div>
          <p className="text-sm text-gray-500 mb-5">No status updates match your search</p>
          <button 
            className={`px-4 py-3 sm:py-2 rounded-lg ${themeClasses.buttonHighlight} transition-all duration-200 shadow-sm`}
            onClick={() => setSearchQuery('')}
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};


const CallList = ({ calls, darkMode, themeClasses, handleVideoCall, handleVoiceCall, contacts, setCurrentChat, setSearchQuery }) => {
  // State for managing filter options and filter modal visibility
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [activeFilters, setActiveFilters] = React.useState({
    all: true,
    missed: false,
    incoming: false,
    outgoing: false,
    video: false,
    audio: false
  });

  // Function to find and set the corresponding contact when a call entry is clicked
  const handleCallClick = (callUserId) => {
    const matchingContact = contacts.find(contact => contact.id === callUserId);
    if (matchingContact) {
      setCurrentChat(matchingContact);
    }
  };

  // Function to toggle filter options
  const toggleFilter = (filterName) => {
    if (filterName === 'all') {
      setActiveFilters({
        all: true,
        missed: false,
        incoming: false,
        outgoing: false,
        video: false,
        audio: false
      });
    } else {
      setActiveFilters(prev => ({
        ...prev,
        all: false,
        [filterName]: !prev[filterName]
      }));
    }
  };

  // Apply filters to the calls data
  const filteredCalls = calls.filter(call => {
    // If 'all' is selected, return all calls
    if (activeFilters.all) return true;
    
    // Apply individual filters
    const matchesMissed = activeFilters.missed && call.missed;
    const matchesIncoming = activeFilters.incoming && !call.outgoing;
    const matchesOutgoing = activeFilters.outgoing && call.outgoing;
    const matchesVideo = activeFilters.video && call.type === 'video';
    const matchesAudio = activeFilters.audio && call.type !== 'video';
    
    // Return true if any of the active filters match
    return matchesMissed || matchesIncoming || matchesOutgoing || matchesVideo || matchesAudio;
  });

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).filter(value => value === true).length - (activeFilters.all ? 1 : 0);

  return (
    <div className="flex-1 overflow-y-auto relative">
      <div className="flex justify-between items-center p-4 sticky top-0 bg-inherit z-10 border-b dark:border-gray-700/30 border-gray-200/30 backdrop-blur-md">
        <div className="text-xs font-medium uppercase tracking-wider text-gray-500">Recent Calls</div>
        <button 
          className={`text-xs rounded-full px-3 py-1.5 ${themeClasses.buttonHighlight} flex items-center transition-colors duration-200 shadow-sm ${activeFilterCount > 0 ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Filter size={12} className="mr-1" />
          {activeFilterCount > 0 ? `Filters (${activeFilterCount})` : 'Filter'}
        </button>
      </div>
      
      {/* Filter dropdown menu */}
      {filterOpen && (
        <div className={`absolute right-4 top-14 z-20 w-48 rounded-md shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ring-1 ring-gray-200 ring-opacity-5 focus:outline-none`}>
          <div className="py-1" role="menu" aria-orientation="vertical">
            <div 
              className={`px-4 py-2 cursor-pointer ${activeFilters.all ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''} ${themeClasses.hover}`}
              onClick={() => toggleFilter('all')}
            >
              All Calls
            </div>
            <div 
              className={`px-4 py-2 cursor-pointer ${activeFilters.missed ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''} ${themeClasses.hover}`}
              onClick={() => toggleFilter('missed')}
            >
              Missed Calls
            </div>
            <div 
              className={`px-4 py-2 cursor-pointer ${activeFilters.incoming ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''} ${themeClasses.hover}`}
              onClick={() => toggleFilter('incoming')}
            >
              Incoming Calls
            </div>
            <div 
              className={`px-4 py-2 cursor-pointer ${activeFilters.outgoing ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''} ${themeClasses.hover}`}
              onClick={() => toggleFilter('outgoing')}
            >
              Outgoing Calls
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            <div 
              className={`px-4 py-2 cursor-pointer ${activeFilters.video ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''} ${themeClasses.hover}`}
              onClick={() => toggleFilter('video')}
            >
              Video Calls
            </div>
            <div 
              className={`px-4 py-2 cursor-pointer ${activeFilters.audio ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''} ${themeClasses.hover}`}
              onClick={() => toggleFilter('audio')}
            >
              Audio Calls
            </div>
          </div>
        </div>
      )}
     
      {filteredCalls.length > 0 ? (
        filteredCalls.map(call => (
          <div
            key={call.id}
            className={`flex items-center p-4 border-b ${darkMode ? 'border-gray-700/30' : 'border-gray-100/50'} ${themeClasses.hover} transition-all duration-200 cursor-pointer`}
            onClick={() => handleCallClick(call.user.id)}
          >
            <div className="relative">
              <img
                src={call.user.avatar}
                alt={call.user.name}
                className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-opacity-10 ring-white dark:ring-gray-700"
              />
            </div>
            <div className="ml-3 flex-1">
              <div className="font-semibold">{call.user.name}</div>
              <div className="flex items-center text-sm mt-1">
                <div className={`mr-1 ${call.outgoing ? 'rotate-90' : '-rotate-90'} ${call.missed ? 'text-red-500' : 'text-green-500'}`}>
                  <ArrowLeft size={14} />
                </div>
                <div className={`text-gray-500 ${call.missed ? 'text-red-500' : ''}`}>
                  {call.time}
                </div>
              </div>
            </div>
            <button
              className={`p-2 rounded-full ${themeClasses.buttonHighlight} transition-colors duration-200 shadow-sm`}
              aria-label={call.type === 'video' ? "Video call" : "Audio call"}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent div's onClick
                if (call.type === 'video') {
                  handleCallClick(call.user.id);
                  handleVideoCall();
                } else {
                  handleCallClick(call.user.id);
                  handleVoiceCall();
                }
              }}
            >
              {call.type === 'video' ? <Video size={18} /> : <Phone size={18} />}
            </button>
          </div>
        ))
      ) : (
        <div className="p-8 text-center">
          <div className={`${themeClasses.subtleColor} mb-4`}>
            <Search size={36} className="mx-auto mb-2 opacity-40" />
            <p className="font-medium">No matches found</p>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            {activeFilterCount > 0 
              ? "No calls match your current filters" 
              : "No calls match your search"}
          </p>
          <button
            className={`px-4 py-2 rounded-lg ${themeClasses.buttonHighlight} transition-all duration-200 shadow-sm`}
            onClick={() => {
              setSearchQuery('');
              setActiveFilters({
                all: true,
                missed: false,
                incoming: false,
                outgoing: false,
                video: false,
                audio: false
              });
            }}
          >
            {activeFilterCount > 0 ? "Clear filters" : "Clear search"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
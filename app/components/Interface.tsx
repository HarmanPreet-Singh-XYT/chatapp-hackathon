'use client'
import React, { useState, useEffect } from 'react';
import { Check, Plus, X, Phone, Video, Image, User, UserPlus, PhoneOff, VideoOff, ArrowBigRight, Mic } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import components
import Sidebar from './Chat/Sidebar';
import ChatHeader from './Chat/ChatHeader';
import MessageList from './Chat/MessageList';
import ChatInput from './Chat/ChatInput';
import ProfileSidebar from './Chat/ProfileSidebar';
import WelcomeScreen from './Chat/WelcomeScreen';
import Notification from './Chat/Notification';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import StatusDialog from './Chat/CreateStatus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import UserProfile from './Chat/UserProfile';

const EnhancedChatApp = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('chats'); // 'chats', 'status', 'calls'
  const [showProfiles, setShowProfiles] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showAddContactDialog, setShowAddContactDialog] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // New state for calling features
  const [isAudioCalling, setIsAudioCalling] = useState(false);
  const [isVideoCalling, setIsVideoCalling] = useState(false);
  const [callTimer, setCallTimer] = useState(0);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showCreateStatusDialog, setShowCreateStatusDialog] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [showAvailableContacts, setShowAvailableContacts] = useState(false);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0); // Added from code 2
  const [newContactName, setNewContactName] = useState(''); // Added from code 2
  const [myProfile, setMyProfile] = useState(false);
  
  // User data (added from code 2)
  const userData = {
    id: 0,
    name: 'You',
    avatar: '/api/placeholder/40/40',
    status: 'Available',
    phone: '+1 234 567 8900',
    email: 'you@example.com',
    location: 'San Francisco, CA'
  };
  
  // Available contacts to add (these are contacts not yet in the user's list)
  const [availableContacts, setAvailableContacts] = useState([
    { id: 101, name: 'Chris Johnson', avatar: 'https://live.staticflickr.com/7160/6410037157_8a32776d93_b.jpg', status: '🌟 New user', phoneNumber: '+1 555-987-6543' },
    { id: 102, name: 'Maria Garcia', avatar: 'https://st2.depositphotos.com/3758943/6040/i/450/depositphotos_60400957-stock-photo-the-man-in-the-office.jpg', status: '✨ Available', phoneNumber: '+1 555-234-5678' },
    { id: 103, name: 'David Lee', avatar: 'https://media.istockphoto.com/id/1466995518/photo/business-woman-and-worker-portrait-at-office-desk-as-administration-executive-company-manager.jpg?s=612x612&w=0&k=20&c=NvKeG6Fh0_VVfH_N0Ka-5j8284XJhL2VTJfe6IwDkWQ=', status: '📱 Online', phoneNumber: '+1 555-876-5432' },
    { id: 104, name: 'Linda Wilson', avatar: 'https://media.istockphoto.com/id/2063799507/photo/business-portrait-and-black-man-in-city-outdoor-for-career-or-job-of-businessman-face.jpg?s=612x612&w=0&k=20&c=DB5oXy7_aasPbpr7zfpfV92ZYsPIQfFWLyweKEz_UVs=', status: '🎓 Student', phoneNumber: '+1 555-345-6789' },
  ]);
  
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Sarah Johnson', avatar: 'https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww', lastMessage: 'See you tomorrow!', time: '10:30 AM', unread: 2, online: true, typing: false, status: '📱 Available' },
    { id: 2, name: 'Alex Thompson', avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww', lastMessage: 'Thanks for the info', time: '9:15 AM', unread: 0, online: true, typing: true, status: '🎧 Listening to music' },
    { id: 3, name: 'Mike Rivera', avatar: 'https://plus.unsplash.com/premium_photo-1669688174637-92ff26cc0a9b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D', lastMessage: 'Can we reschedule?', time: 'Yesterday', unread: 0, online: false, lastSeen: '2 hours ago', status: '💼 In a meeting' },
    { id: 4, name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww', lastMessage: 'Sounds great!', time: 'Yesterday', unread: 0, online: false, lastSeen: '5 hours ago', status: '✈️ On vacation' },
    { id: 5, name: 'Daniel Lee', avatar: 'https://i.pinimg.com/564x/87/7b/01/877b01f7092146efb33a6848e786d892.jpg', lastMessage: "I'll send the files later", time: 'Tuesday', unread: 0, online: false, lastSeen: 'Yesterday', status: '💻 Working' },
    { id: 6, name: 'Elon Lee', avatar: 'https://media.istockphoto.com/id/1618846975/photo/smile-black-woman-and-hand-pointing-in-studio-for-news-deal-or-coming-soon-announcement-on.jpg?s=612x612&w=0&k=20&c=LUvvJu4sGaIry5WLXmfQV7RStbGG5hEQNo8hEFxZSGY=', lastMessage: "Meeting tomorrow at 2 PM", time: 'Monday', unread: 0, isGroup: true, members: 5, status: '📅 Active project' },
    { id: 7, name: 'Alan Smith', avatar: 'https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg', lastMessage: "Let's plan for the weekend", time: 'Sunday', unread: 3, isGroup: true, members: 8, status: '👨‍👩‍👧‍👦 Family chat' },
    { id: 8, name: 'Jessica Parker', avatar: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/35af6a41332353.57a1ce913e889.jpg', lastMessage: "Thanks for your help!", time: 'Last week', unread: 0, online: false, lastSeen: '1 day ago', status: '📖 Do not disturb' },
  ]);

  // New message structure as a map of conversations by contact ID (from code 2)
  const [conversationsMap, setConversationsMap] = useState({});
  const initialProfile = {
    name: 'John Doe',
    status: 'Available',
    avatar:'https://media.istockphoto.com/id/2006436002/video/happy-confident-and-portrait-of-indian-man-in-office-with-creative-professional-at-tech.jpg?s=640x640&k=20&c=vcKAWd0sGJpV3xR0AK1RCM7zTEpFUcBhQEXbNvN1M78=',
    about: 'Frontend developer passionate about creating beautiful user interfaces',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      location: 'San Francisco, CA'
    }
  };

  // State to manage the profile data
  const [profile, setProfile] = useState(initialProfile);
  
  // State to track if the dialog is open
  const [open, setOpen] = useState(false);
  
  // Handler for input changes
  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    
    if (section) {
      setProfile({
        ...profile,
        [section]: {
          ...profile[section],
          [name]: value
        }
      });
    } else {
      setProfile({
        ...profile,
        [name]: value
      });
    }
  };
  
  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    // Here you would typically save to a database
    setOpen(false);
  };

  // Initialize message store with existing messages (from code 2)
  useEffect(() => {
    // Convert existing messages into a conversation map
    const initialConversations = {};
    contacts.forEach(contact => {
      initialConversations[contact.id] = [
        {
          id: 1, 
          sender: contact.id, 
          text: contact.lastMessage, 
          time: contact.time, 
          status: 'read'
        }
      ];
    });
    setConversationsMap(initialConversations);
  }, []);

  // Keep old messages array for compatibility with existing components
  const [messages, setMessages] = useState([
    { id: 1, sender: 2, text: 'Hey, how are you doing?', time: '9:30 AM', status: 'read' },
    { id: 2, sender: 1, text: "I'm good, thanks! Just finishing up some work. How about you?", time: '9:32 AM', status: 'read' },
    { id: 3, sender: 2, text: 'Same here. Are we still on for lunch tomorrow?', time: '9:33 AM', status: 'read' },
    { id: 4, sender: 1, text: 'Absolutely! Looking forward to it.', time: '9:35 AM', status: 'read' },
    { id: 5, sender: 2, text: 'Great! See you tomorrow at noon then.', time: '9:36 AM', status: 'read' },
    { id: 6, sender: 2, text: 'By the way, I found this cool restaurant we could try. It has amazing reviews!', time: '9:38 AM', status: 'read' },
    { id: 7, sender: 1, text: 'Perfect, see you then! And yes, I trust your restaurant picks. 😊', time: '9:40 AM', status: 'delivered' },
    { id: 8, sender: 1, text: 'Could you send me the address so I can find it easily?', time: '9:41 AM', status: 'sent' },
  ]);

  // Update messages when currentChat changes (from code 2)
  useEffect(() => {
    if (currentChat && conversationsMap[currentChat.id]) {
      const chatMessages = conversationsMap[currentChat.id].map(msg => ({
        id: msg.id,
        sender: msg.sender,
        text: msg.text,
        time: msg.time,
        status: msg.status
      }));
      setMessages(chatMessages);
    }
  }, [currentChat, conversationsMap]);

  const [statuses, setStatuses] = useState([
    { id: 1, user: contacts[0], image: 'https://www.holidify.com/images/cmsuploads/compressed/shutterstock_1014644104(1)_20200114154141.jpg', caption: 'Beautiful day today!', time: '2 hours ago', seen: false },
    { id: 2, user: contacts[1], image: 'https://media.timeout.com/images/105859747/750/422/image.jpg', caption: 'New coffee shop discovery', time: '4 hours ago', seen: true },
    { id: 3, user: contacts[3], image: 'https://www.planetware.com/photos-large/I/italy-colosseum-day.jpg', caption: 'Beach day with friends', time: 'Today', seen: true },
    { id: 4, user: contacts[4], image: 'https://media.cntraveler.com/photos/598339c9b7a86962e8e27c5d/master/pass/Paris_GettyImages-601763009.jpg', caption: 'Working from home', time: 'Today', seen: false },
  ]);

  const [calls, setCalls] = useState([
    { id: 1, user: contacts[0], time: '10 minutes ago', type: 'video', missed: false, outgoing: true, duration: '5:23' },
    { id: 2, user: contacts[2], time: 'Yesterday', type: 'audio', missed: true, outgoing: false, duration: null },
    { id: 3, user: contacts[3], time: 'Yesterday', type: 'audio', missed: false, outgoing: true, duration: '3:11' },
    { id: 4, user: contacts[1], time: '2 days ago', type: 'video', missed: false, outgoing: false, duration: '10:37' },
  ]);
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  useEffect(() => {
    // Show notification for 3 seconds
    if (showNotification) {
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  }, [showNotification]);
  
  // Call timer effect (enhanced with code 2 logic)
  useEffect(() => {
    let interval;
    if (isAudioCalling || isVideoCalling) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
      
      // Auto end call after 5 seconds for mock functionality
      setTimeout(() => {
        handleEndCall();
      }, 5000);
    } else {
      clearInterval(interval);
      setCallTimer(0);
    }
    
    return () => clearInterval(interval);
  }, [isAudioCalling, isVideoCalling]);
  
  // Enhanced message sending with reply simulation (from code 2)
  const handleSendMessage = (attachments = []) => {
    // If no message and no attachments, return early
    if (message.trim() === '' && attachments.length === 0 || !currentChat) return;
    
    // If there's a text message, create and send it
    if (message.trim() !== '') {
      // Create new message for text
      const textMessage = {
        id: Date.now(),
        sender: userData.id,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
      
      // Update conversations map with text message
      const updatedConversations = {
        ...conversationsMap,
        [currentChat.id]: [
          ...(conversationsMap[currentChat.id] || []),
          textMessage
        ]
      };
      
      setConversationsMap(updatedConversations);
      
      // Update local messages array for current view
      setMessages(prev => [...prev, textMessage]);
      
      // Update contact's last message in the sidebar
      const updatedContacts = contacts.map(contact => {
        if (contact.id === currentChat.id) {
          return {
            ...contact,
            lastMessage: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            unread: 0
          };
        }
        return contact;
      });
      
      setContacts(updatedContacts);
      setMessage('');
      setShowNotification(true);
      
      // Simulate a reply for text message
      simulateReply(textMessage.text, updatedConversations, updatedContacts);
    }
    
    // Process any attachments
    if (attachments.length > 0) {
      attachments.forEach((file, index) => {
        // Determine file type
        let fileType = 'file';
        let displayText = '📎 File';
        
        if (file.type.startsWith('image/')) {
          fileType = 'image';
          displayText = '📷 Image';
        } else if (file.type.includes('audio')) {
          fileType = 'audio';
          displayText = '🎤 Voice Message';
        }
        
        const fileUrl = URL.createObjectURL(file);
        
        // Create attachment message
        const attachmentMessage = {
          id: Date.now() + index + 10, // Ensure unique IDs
          sender: userData.id,
          text: displayText,
          attachmentType: fileType,
          attachmentUrl: fileUrl,
          fileName: file.name,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent'
        };
        
        // Update conversations map
        const currentConversation = conversationsMap[currentChat.id] || [];
        const updatedConversations = {
          ...conversationsMap,
          [currentChat.id]: [...currentConversation, attachmentMessage]
        };
        
        setConversationsMap(updatedConversations);
        
        // Update messages for current view
        setMessages(prev => [...prev, attachmentMessage]);
        
        // Update contact's last message
        const updatedContacts = contacts.map(contact => {
          if (contact.id === currentChat.id) {
            return {
              ...contact,
              lastMessage: displayText,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              unread: 0
            };
          }
          return contact;
        });
        
        setContacts(updatedContacts);
        setShowNotification(true);
        
        // Simulate a reply for the attachment
        simulateReply(`Reply to ${displayText}`, updatedConversations, updatedContacts);
      });
    }
  };
  
  // Helper function to simulate replies
  const simulateReply = (messageText, conversations, contactsList) => {
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1000, // Ensure unique ID
        sender: currentChat.id,
        text: `Reply to: ${messageText}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };
      
      // Update conversations
      const currentConversation = conversations[currentChat.id] || [];
      const conversationsWithReply = {
        ...conversations,
        [currentChat.id]: [...currentConversation, replyMessage]
      };
      
      setConversationsMap(conversationsWithReply);
      
      // Update messages if still on the same chat
      setMessages(prev => [...prev, replyMessage]);
      
      // Update contact's last message
      const contactsWithReply = contactsList.map(contact => {
        if (contact.id === currentChat.id) {
          return {
            ...contact,
            lastMessage: `Reply to: ${messageText}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return contact;
      });
      
      setContacts(contactsWithReply);
    }, 2000);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setShowDropdown(false);
  };
  
  // Function to handle adding a new contact from the available contacts list
  const handleAddContactFromList = (contact) => {
    // Add contact to contacts list
    setContacts([...contacts, {...contact, lastMessage: 'New contact', time: 'Just now', unread: 0, online: true}]);
    
    // Remove from available contacts
    setAvailableContacts(availableContacts.filter(c => c.id !== contact.id));
    
    // Close dialog
    setShowAvailableContacts(false);
    
    // Show notification
    setShowNotification(true);
  };
  
  // Function to add new contact by name (from code 2)
  const handleAddContact = () => {
    if (newContactName.trim() === '') return;
    
    const newContact = {
      id: Date.now(),
      name: newContactName,
      avatar: '/api/placeholder/40/40',
      lastMessage: 'New contact added',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Last seen recently',
      unread: 0,
      online: false,
      lastSeen: 'Just now'
    };
    
    setContacts([...contacts, newContact]);
    setNewContactName('');
    setShowAddContactDialog(false);
    setShowNotification(true);
  };
  
  // Function to initiate audio call
  const handleAudioCall = () => {
    if (currentChat) {
      // Add to call log
      const newCall = {
        id: calls.length + 1,
        user: currentChat,
        time: 'Just now',
        type: 'audio',
        missed: false,
        outgoing: true,
        duration: '0:05' // Mock duration
      };
      
      setCalls([newCall, ...calls]);
      
      // Start call
      setIsAudioCalling(true);
    }
  };
  
  // Function to initiate video call
  const handleVideoCall = () => {
    if (currentChat) {
      // Add to call log
      const newCall = {
        id: calls.length + 1,
        user: currentChat,
        time: 'Just now',
        type: 'video',
        missed: false,
        outgoing: true,
        duration: '0:05' // Mock duration
      };
      
      setCalls([newCall, ...calls]);
      
      // Start call
      setIsVideoCalling(true);
    }
  };
  
  // Function to end call
  const handleEndCall = () => {
    setIsAudioCalling(false);
    setIsVideoCalling(false);
  };
  
  // Function to view status
  const handleViewStatus = (status) => {
    setCurrentStatus(status);
    setShowStatusDialog(true);
  };
  
  // Function to view next status (from code 2)
  const viewNextStatus = () => {
    setCurrentStatusIndex((prevIndex) => 
      prevIndex + 1 >= statuses.length ? 0 : prevIndex + 1
    );
    
    // Update current status
    const nextStatus = statuses[
      currentStatusIndex + 1 >= statuses.length ? 0 : currentStatusIndex + 1
    ];
    setCurrentStatus(nextStatus);
  };
  
  // Function to toggle add contact dialog
  function toggleContact() {
    setShowAvailableContacts(true);
  }
  
  // Shorthand functions
  function handleVideo() {
    handleVideoCall();
  }
  
  function handleAudio() {
    handleAudioCall();
  }
  // 11. Handle sending images or files
  const handleSendAttachment = (attachmentType, attachmentUrl) => {
    if (!currentChat) return;
    
    const newMessage = {
      id: messages.length + 1,
      sender: 1, // current user
      text: attachmentType === 'image' ? '📷 Image' : '📎 File',
      attachmentType: attachmentType,
      attachmentUrl: attachmentUrl,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };
    
    setMessages([...messages, newMessage]);
    
    // Update the last message for this contact
    const updatedContacts = contacts.map(contact => {
      if (contact.id === currentChat.id) {
        return {
          ...contact,
          lastMessage: attachmentType === 'image' ? '📷 Image' : '📎 File',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return contact;
    });
    
    setContacts(updatedContacts);
    setShowNotification(true);
  };

  // 12. Create a status update
  const createNewStatus = (statusContent, statusType = 'text') => {
    // Assuming this is your own user from the contacts array
    const currentUser = contacts[0]; // Or however you identify the current user
    
    const newStatus = {
      id: statuses.length + 1,
      user: { id: 599, name: 'Me', avatar: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?cs=srgb&dl=pexels-padrinan-255379.jpg&fm=jpg', lastMessage: '', time: '', unread: 0, online: true, typing: false, status: '' }, // Use the full user object that already matches the expected type
      image: statusType === 'image' ? statusContent : 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?cs=srgb&dl=pexels-padrinan-255379.jpg&fm=jpg',
      caption: statusType === 'text' ? statusContent : '',
      time: 'Just now',
      seen: false
    };
    
    setStatuses([newStatus, ...statuses]);
    setShowStatusDialog(false);
    setShowNotification(true);
  };
  const startConversion = () => {
    setCurrentChat(contacts[0]);
  };
  const openSettings = ()=>{
    setOpen(true);
  }
  
  // Theme classes for modern UI with glassmorphism effect
  const themeClasses = {
    main: darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900',
    glass: darkMode ? 'bg-gray-800/70 backdrop-blur-md border-gray-700/50' : 'bg-white/80 backdrop-blur-md border-gray-100/30',
    header: darkMode ? 'bg-gray-800/90 backdrop-blur-md border-gray-700/50' : 'bg-white/90 backdrop-blur-md border-gray-100/30',
    sidebar: darkMode ? 'bg-gray-800/90 backdrop-blur-md border-gray-700/50' : 'bg-white/90 backdrop-blur-md border-gray-100/30',
    input: darkMode ? 'bg-gray-700/70 border-gray-600/50 text-gray-100 placeholder-gray-400' : 'bg-white/70 border-gray-200/50 text-gray-900',
    hover: darkMode ? 'hover:bg-gray-700/60' : 'hover:bg-gray-100/60',
    active: darkMode ? 'bg-gray-700/80' : 'bg-blue-50/60',
    chatBg: darkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-r from-blue-50 to-indigo-50',
    messageBgSent: darkMode ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-blue-500 to-indigo-500',
    messageBgReceived: darkMode ? 'bg-gray-700/80 backdrop-blur-md border-gray-600/50' : 'bg-white/80 backdrop-blur-md border-gray-200/30',
    iconColor: darkMode ? 'text-gray-300' : 'text-gray-600',
    accentColor: darkMode ? 'text-blue-400' : 'text-blue-600',
    subtleColor: darkMode ? 'text-gray-400' : 'text-gray-500',
    gradientButton: darkMode ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600',
    buttonHighlight: darkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-blue-50/50 hover:bg-blue-100/50',
    dialogBg: darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    dialogText: darkMode ? 'text-gray-100' : 'text-gray-900',
    dialogInput: darkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-200 text-gray-900',
    errorAlert: darkMode ? 'bg-red-900/50 border-red-800 text-red-200' : 'bg-red-50 border-red-200 text-red-800',
    callButton: darkMode ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600',
    endCallButton: darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600',
  };
  function createStatus(){
    setShowCreateStatusDialog(!showCreateStatusDialog);
  }
  function toggleProfile(){
    setMyProfile(!myProfile);
  }
  return (
    <div className={`flex h-screen ${themeClasses.main} transition-all duration-300 font-sans`}>
      {/* Enhanced Sidebar with Tabs */}
      <Sidebar 
        contacts={contacts}
        statuses={statuses}
        calls={calls}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowProfiles={setShowProfiles}
        themeClasses={themeClasses}
        toggleAddContact={toggleContact}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        handleVideoCall={handleVideo}
        handleVoiceCall={handleAudio}
        handleStatus={handleViewStatus}
        toggleStatusCreate={createStatus}
        openSettings={openSettings}
        showMyProfile={toggleProfile}
      />
      
      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!currentChat && 'hidden md:flex md:items-center md:justify-center'}`}>
        {!currentChat ? (
          // Welcome screen component
          <WelcomeScreen 
            accentColor={themeClasses.accentColor}
            subtleColor={themeClasses.subtleColor}
            gradientButton={themeClasses.gradientButton}
            startConv={startConversion}
          />
        ) : (
          // Active chat
          <>
            {/* Enhanced Chat header component with call buttons */}
            <ChatHeader 
              currentChat={currentChat}
              iconColor={themeClasses.iconColor}
              buttonHighlight={themeClasses.buttonHighlight}
              handleAudioCall={handleAudioCall}
              handleVideoCall={handleVideoCall}
              setShowProfiles={setShowProfiles}
              showProfiles={showProfiles}
              setCurrentChat={setCurrentChat}
            />
            {/* Message list component */}
            <MessageList 
              messages={messages}
              chatBgClass={themeClasses.chatBg}
              messageBgSent={themeClasses.messageBgSent}
              messageBgReceived={themeClasses.messageBgReceived}
              subtleColor={themeClasses.subtleColor}
              darkMode={darkMode}
            />
            
            {/* Chat input component */}
            <ChatInput 
              message={message}
              setMessage={setMessage}
              handleSendMessage={(attachments) => handleSendMessage(attachments)}
              glassClass={themeClasses.glass}
              inputClass={themeClasses.input}
              buttonHighlight={themeClasses.buttonHighlight}
              iconColor={themeClasses.iconColor}
              gradientButton={themeClasses.gradientButton}
              darkMode={darkMode}
            />
            
            {/* Profile Sidebar */}
            <ProfileSidebar 
              showProfiles={showProfiles}
              setShowProfiles={setShowProfiles}
              currentChat={currentChat}
              buttonHighlight={themeClasses.buttonHighlight}
              iconColor={themeClasses.iconColor}
              accentColor={themeClasses.accentColor}
              handleVideoCall={handleVideoCall}
              handleVoiceCall={handleAudioCall}
            />
            {/* Notification Component */}
            <Notification showNotification={showNotification} setShowNotification={setShowNotification} />
          </>
        )}
      </div>
      <UserProfile showProfiles={myProfile} setShowProfiles={setMyProfile} User={profile} />
      
      {/* Status Viewing Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent className={`${themeClasses.dialogBg} ${themeClasses.dialogText} max-w-md`}>
          {currentStatus && (
            <>
              <DialogHeader>
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={currentStatus.user.avatar} alt={currentStatus.user.name} />
                    <AvatarFallback>{currentStatus.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <DialogTitle>{currentStatus.user.name}</DialogTitle>
                    <p className={`text-sm ${themeClasses.subtleColor}`}>{currentStatus.time}</p>
                  </div>
                </div>
              </DialogHeader>
              <div className="my-4 relative">
                <img 
                  src={currentStatus.image} 
                  alt="Status" 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="mt-2">{currentStatus.caption}</p>
                
                {/* Navigation buttons for statuses (from code 2) */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full bg-black/20 text-white hover:bg-black/30 p-1"
                    onClick={viewNextStatus}
                  >
                    <ArrowBigRight size={20} />
                  </Button>
                </div>
              </div>
              
              {/* Status progress indicators */}
              <div className="flex gap-1 mt-1 mb-3">
                {statuses.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-1 rounded-full flex-1 ${
                      index === currentStatusIndex ? 'bg-blue-500' : 'bg-gray-300/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Available Contacts Dialog */}
      <Dialog open={showAvailableContacts} onOpenChange={setShowAvailableContacts}>
        <DialogContent className={`${themeClasses.dialogBg} ${themeClasses.dialogText} max-w-md`}>
          <DialogHeader>
            <DialogTitle>Add new contact</DialogTitle>
            <DialogDescription>Select from available contacts to add to your chat list.</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[300px] pr-4">
            {availableContacts.map(contact => (
              <div 
                key={contact.id} 
                className={`flex items-center justify-between p-3 my-2 rounded-lg ${themeClasses.hover}`}
              >
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-medium">{contact.name}</p>
                    <p className={`text-sm ${themeClasses.subtleColor}`}>{contact.phoneNumber}</p>
                    <p className={`text-xs ${themeClasses.accentColor}`}>{contact.status}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className={`${themeClasses.gradientButton} rounded-full`}
                  onClick={() => handleAddContactFromList(contact)}
                >
                  <UserPlus size={16} className="mr-1" />
                  Add
                </Button>
              </div>
            ))}
            {availableContacts.length === 0 && (
              <p className="text-center py-4">No more contacts available to add.</p>
            )}
          </ScrollArea>
          
          {/* Add custom contact name input (from code 2) */}
          <div className="mt-4 border-t pt-4">
            <Label htmlFor="newContactName" className="text-sm font-medium mb-2">
              Or add a new contact by name
            </Label>
            <div className="flex gap-2">
              <Input
                id="newContactName"
                placeholder="Enter contact name"
                value={newContactName}
                onChange={(e) => setNewContactName(e.target.value)}
                className={themeClasses.dialogInput}
              />
              <Button
                onClick={handleAddContact}
                disabled={!newContactName.trim()}
                className={themeClasses.gradientButton}
              >
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowAvailableContacts(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Audio Calling Dialog */}
      {isAudioCalling && (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    aria-labelledby="call-title"
  >
    <div className={`${themeClasses.glass} max-w-md w-full p-6 rounded-xl shadow-xl`}>
      <div className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={currentChat.avatar} alt="" />
          <AvatarFallback aria-hidden="true">{currentChat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <h2 id="call-title" className="text-2xl font-semibold mb-1">{currentChat.name}</h2>
        <p className={`${themeClasses.subtleColor} mb-6`} aria-live="polite">
          {formatTime(callTimer)}
        </p>
        
        <div className="flex gap-8 mt-4">
          <Button 
            className={`${themeClasses.endCallButton} w-14 h-14 rounded-full`} 
            onClick={handleEndCall}
            aria-label="End call"
          >
            <PhoneOff size={24} />
          </Button>
          
          <Button
            className={`${themeClasses.buttonHighlight} w-14 h-14 rounded-full`}
            aria-label="Toggle microphone"
          >
            <Mic size={24} />
          </Button>
        </div>
      </div>
    </div>
  </div>
)}
      
      {/* Video Calling Dialog */}
      {isVideoCalling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="relative w-full h-full">
            {/* Mock video display */}
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/001/971/264/non_2x/beautiful-cherry-blossom-with-bokeh-lights-background-concept-free-vector.jpg" 
                alt="Video call" 
                className="max-w-full max-h-full rounded-lg object-cover opacity-90"
              />
              
              {/* Call duration */}
              <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                <p className="text-white">{formatTime(callTimer)}</p>
              </div>
              
              {/* Self view */}
              <div className="absolute bottom-24 right-8 w-36 h-48 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mdCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D" 
                  alt="Self view" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Control buttons */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
                <Button 
                  className={`${themeClasses.buttonHighlight} w-12 h-12 rounded-full`} 
                  onClick={() => {}}
                >
                  <VideoOff size={20} />
                </Button>
                <Button 
                  className={`${themeClasses.endCallButton} w-12 h-12 rounded-full`} 
                  onClick={handleEndCall}
                >
                  <PhoneOff size={20} />
                </Button>
                <Button 
                  className={`${themeClasses.buttonHighlight} w-12 h-12 rounded-full`} 
                  onClick={() => {}}
                >
                  <Image size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Error Alert Dialog */}
      {showErrorDialog && (
        <Alert className={`${themeClasses.errorAlert} fixed bottom-4 right-4 max-w-md z-50`}>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
          <Button 
            className="absolute top-2 right-2" 
            variant="ghost" 
            size="sm"
            onClick={() => setShowErrorDialog(false)}
          >
            <X size={16} />
          </Button>
        </Alert>
      )}
      <StatusDialog 
        open={showCreateStatusDialog} 
        onOpenChange={createStatus}
        createNewStatus={createNewStatus}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              
              {/* Personal Tab */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your name and status
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Input
                        id="status"
                        name="status"
                        value={profile.status}
                        onChange={(e) => handleChange(e)}
                        placeholder="Your current status"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* About Tab */}
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                    <CardDescription>
                      Write a short bio about yourself
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="about">Bio</Label>
                      <Textarea
                        id="about"
                        name="about"
                        value={profile.about}
                        onChange={(e) => handleChange(e)}
                        placeholder="Tell us about yourself"
                        className="h-32"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Contact Tab */}
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Update your contact details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profile.contact.phone}
                        onChange={(e) => handleChange(e, 'contact')}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={profile.contact.email}
                        onChange={(e) => handleChange(e, 'contact')}
                        placeholder="Your email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profile.contact.location}
                        onChange={(e) => handleChange(e, 'contact')}
                        placeholder="Your location"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Helper function to format call time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default EnhancedChatApp;
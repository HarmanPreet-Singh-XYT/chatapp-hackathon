import React, { useState, useEffect } from 'react';
import { Bell, Camera, Info, Mic, MoreVertical, Phone, Plus, Search, Send, X, Video, Paperclip, Image, FileText, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const initialContacts = [
  { id: 1, name: 'John Doe', avatar: '/api/placeholder/40/40', lastMessage: 'Hey, how are you?', time: '10:30 AM', status: 'Online', unread: 2, statusContent: { type: 'text', content: 'At the gym 💪' } },
  { id: 2, name: 'Jane Smith', avatar: '/api/placeholder/40/40', lastMessage: 'Let\'s meet tomorrow', time: 'Yesterday', status: 'Last seen 2h ago', unread: 0, statusContent: { type: 'image', content: '/api/placeholder/200/300' } },
  { id: 3, name: 'Mike Johnson', avatar: '/api/placeholder/40/40', lastMessage: 'Thanks for the help!', time: '2 days ago', status: 'Online', unread: 0, statusContent: { type: 'text', content: 'Working from home today' } },
  { id: 4, name: 'Emma Wilson', avatar: '/api/placeholder/40/40', lastMessage: 'Did you see that new movie?', time: '3 days ago', status: 'Last seen yesterday', unread: 5, statusContent: { type: 'image', content: '/api/placeholder/200/300' } },
];

// Mock user data
const userData = {
  id: 0,
  name: 'You',
  avatar: '/api/placeholder/40/40',
  status: 'Available',
  phone: '+1 234 567 8900',
  email: 'you@example.com',
  location: 'San Francisco, CA'
};

const ChatApp = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [showStatus, setShowStatus] = useState(false);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [callType, setCallType] = useState('');
  const [recentCalls, setRecentCalls] = useState([]);
  const [activeTab, setActiveTab] = useState('chats');

  // Initialize messages for each contact
  useEffect(() => {
    const initialMessages = {};
    contacts.forEach(contact => {
      initialMessages[contact.id] = [
        { 
          id: 1, 
          sender: contact.id, 
          content: contact.lastMessage, 
          time: contact.time, 
          status: 'read' 
        }
      ];
    });
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedContact) return;
    
    // Add new message to the conversation
    const updatedMessages = {
      ...messages,
      [selectedContact.id]: [
        ...(messages[selectedContact.id] || []),
        {
          id: Date.now(),
          sender: userData.id,
          content: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'sent'
        }
      ]
    };
    
    setMessages(updatedMessages);
    setNewMessage('');
    
    // Update the last message for this contact
    const updatedContacts = contacts.map(contact => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          lastMessage: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return contact;
    });
    
    setContacts(updatedContacts);
    
    // Simulate a reply after 2 seconds
    setTimeout(() => {
      const replyMessages = {
        ...updatedMessages,
        [selectedContact.id]: [
          ...updatedMessages[selectedContact.id],
          {
            id: Date.now() + 1,
            sender: selectedContact.id,
            content: `Reply to: ${newMessage}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read'
          }
        ]
      };
      
      setMessages(replyMessages);
      
      // Update last message again
      const repliedContacts = updatedContacts.map(contact => {
        if (contact.id === selectedContact.id) {
          return {
            ...contact,
            lastMessage: `Reply to: ${newMessage}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
        return contact;
      });
      
      setContacts(repliedContacts);
    }, 2000);
  };

  const handleAddContact = () => {
    if (newContactName.trim() === '') return;
    
    const newContact = {
      id: contacts.length + 10, // Ensure a unique ID
      name: newContactName,
      avatar: '/api/placeholder/40/40',
      lastMessage: 'New contact added',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Last seen recently',
      unread: 0,
      statusContent: { type: 'text', content: 'Hello world!' }
    };
    
    setContacts([...contacts, newContact]);
    setNewContactName('');
    setShowAddContact(false);
  };

  const handleCall = (type) => {
    setCallType(type);
    setShowCall(true);
    
    // End call after 5 seconds
    setTimeout(() => {
      setShowCall(false);
      
      // Add to recent calls
      const newCall = {
        id: Date.now(),
        contactId: selectedContact.id,
        name: selectedContact.name,
        avatar: selectedContact.avatar,
        type: type,
        time: 'Just now',
        duration: '0:05'
      };
      
      setRecentCalls([newCall, ...recentCalls]);
    }, 5000);
  };

  // View next status
  const viewNextStatus = () => {
    setCurrentStatusIndex((prevIndex) => 
      prevIndex + 1 >= contacts.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar */}
      <div className="w-1/3 border-r bg-white flex flex-col h-full">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b">
          <Avatar>
            <img src={userData.avatar} alt="Your avatar" className="w-10 h-10 rounded-full cursor-pointer" onClick={() => setShowProfile(true)} />
          </Avatar>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={() => setActiveTab('status')}>
              <Circle className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setShowAddContact(true)}>
              <Plus className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="chats" className="flex-1">Chats</TabsTrigger>
            <TabsTrigger value="status" className="flex-1">Status</TabsTrigger>
            <TabsTrigger value="calls" className="flex-1">Calls</TabsTrigger>
          </TabsList>
        
          <TabsContent value="chats" className="flex-1 overflow-y-auto">
            {/* Search */}
            <div className="p-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search or start new chat" className="pl-10" />
              </div>
            </div>

            {/* Contact list */}
            <div className="divide-y">
              {contacts.map(contact => (
                <div 
                  key={contact.id} 
                  className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer ${selectedContact?.id === contact.id ? 'bg-gray-100' : ''}`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <Avatar className="h-12 w-12 mr-3">
                    <img src={contact.avatar} alt={contact.name} className="rounded-full" />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <span className="font-medium truncate">{contact.name}</span>
                      <span className="text-xs text-gray-500">{contact.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <span className="inline-flex items-center justify-center h-5 w-5 text-xs bg-green-500 text-white rounded-full">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="status" className="p-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2">My Status</h3>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 relative">
                  <img src={userData.avatar} alt="Your avatar" className="rounded-full" />
                  <div className="absolute -right-1 -bottom-1 bg-green-500 p-1 rounded-full">
                    <Plus className="h-3 w-3 text-white" />
                  </div>
                </Avatar>
                <div>
                  <p className="font-medium">My status</p>
                  <p className="text-sm text-gray-500">Tap to add status update</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-medium mb-2">Recent updates</h3>
            <div className="space-y-3">
              {contacts.map(contact => (
                <div key={contact.id} className="flex items-center gap-3 cursor-pointer" onClick={() => {
                  setCurrentStatusIndex(contacts.findIndex(c => c.id === contact.id));
                  setShowStatus(true);
                }}>
                  <Avatar className="h-12 w-12 border-2 border-green-500 p-0.5 rounded-full">
                    <img src={contact.avatar} alt={contact.name} className="rounded-full" />
                  </Avatar>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calls" className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <h3 className="font-medium">Recent</h3>
              <Phone className="h-5 w-5 text-green-500" />
            </div>
            
            {recentCalls.length > 0 ? (
              <div className="divide-y">
                {recentCalls.map(call => {
                  const contact = contacts.find(c => c.id === call.contactId);
                  return (
                    <div key={call.id} className="flex items-center p-4">
                      <Avatar className="h-12 w-12 mr-3">
                        <img src={call.avatar} alt={call.name} className="rounded-full" />
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{call.name}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          {call.type === 'video' ? <Video className="h-3 w-3 mr-1" /> : <Phone className="h-3 w-3 mr-1" />}
                          <span>{call.time} • {call.duration}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        {call.type === 'video' ? <Video className="h-5 w-5" /> : <Phone className="h-5 w-5" />}
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>No recent calls</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Right chat area */}
      <div className="flex-1 flex flex-col h-full">
        {selectedContact ? (
          <>
            {/* Chat header */}
            <div className="p-3 flex items-center justify-between border-b bg-white">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <img src={selectedContact.avatar} alt={selectedContact.name} className="rounded-full" />
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedContact.name}</h3>
                  <p className="text-xs text-gray-500">{selectedContact.status}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleCall('video')}>
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleCall('voice')}>
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowProfile(true)}>
                  <Info className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                {(messages[selectedContact.id] || []).map(message => (
                  <div key={message.id} className={`flex ${message.sender === userData.id ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${message.sender === userData.id ? 'bg-green-100' : 'bg-white'}`}>
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500 text-right mt-1">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat input */}
            <div className="p-3 border-t bg-white flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Type a message" 
                className="flex-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <Button variant="ghost" size="icon">
                <Mic className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <p className="text-xl font-medium mb-2">Select a chat to start messaging</p>
              <p className="text-gray-500">Or add a new contact to begin a conversation</p>
            </div>
          </div>
        )}
      </div>

      {/* Add contact dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new contact</DialogTitle>
            <DialogDescription>Enter the details of the contact you want to add.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <Avatar className="h-16 w-16 cursor-pointer">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <Camera className="h-6 w-6 text-gray-500" />
                </div>
              </Avatar>
            </div>
            <Input 
              value={newContactName} 
              onChange={(e) => setNewContactName(e.target.value)} 
              placeholder="Contact name" 
            />
            <Input placeholder="Phone number (optional)" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddContact(false)}>Cancel</Button>
            <Button onClick={handleAddContact}>Add Contact</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status viewer */}
      <Dialog open={showStatus} onOpenChange={setShowStatus}>
        <DialogContent className="p-0 max-w-md overflow-hidden">
          <div className="h-96 bg-gray-900 relative">
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <img src={contacts[currentStatusIndex]?.avatar} alt={contacts[currentStatusIndex]?.name} className="rounded-full" />
              </Avatar>
              <p className="text-white text-sm">{contacts[currentStatusIndex]?.name}</p>
            </div>
            
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-white" onClick={() => setShowStatus(false)}>
              <X className="h-5 w-5" />
            </Button>
            
            <div className="h-full flex items-center justify-center" onClick={viewNextStatus}>
              {contacts[currentStatusIndex]?.statusContent.type === 'image' ? (
                <img src={contacts[currentStatusIndex]?.statusContent.content} alt="Status" className="max-h-full max-w-full" />
              ) : (
                <div className="p-6 text-center bg-gray-800 text-white text-xl">
                  {contacts[currentStatusIndex]?.statusContent.content}
                </div>
              )}
            </div>
            
            <div className="absolute bottom-4 w-full flex justify-center">
              <Input 
                placeholder="Reply to status..." 
                className="w-4/5 bg-gray-800 text-white border-gray-700"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedContact ? selectedContact.name : "Your"} Profile</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <img 
                  src={selectedContact ? selectedContact.avatar : userData.avatar} 
                  alt="Profile" 
                  className="rounded-full"
                />
              </Avatar>
            </div>
            
            <div className="space-y-3">
              <Card className="p-3">
                <h4 className="text-sm text-gray-500 mb-1">Status</h4>
                <p>{selectedContact ? selectedContact.status : userData.status}</p>
              </Card>
              
              <Card className="p-3">
                <h4 className="text-sm text-gray-500 mb-1">Info</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{selectedContact ? '+1 123 456 7890' : userData.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{selectedContact ? `${selectedContact.name.toLowerCase().replace(' ', '.')}@example.com` : userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>{selectedContact ? 'New York, NY' : userData.location}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-3">
                <h4 className="text-sm text-gray-500 mb-1">Media & Files</h4>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="h-20 bg-gray-200 rounded flex items-center justify-center">
                    <Image className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="h-20 bg-gray-200 rounded flex items-center justify-center">
                    <FileText className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="h-20 bg-gray-200 rounded flex items-center justify-center">
                    <Image className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Call dialog */}
      <Dialog open={showCall} onOpenChange={setShowCall}>
        <DialogContent className="max-w-md p-0">
          <div className="h-96 bg-gray-900 relative">
            <div className="absolute top-0 left-0 right-0 p-4 text-center">
              <p className="text-white text-xl mb-1">{selectedContact?.name}</p>
              <p className="text-gray-300 text-sm">{callType === 'video' ? 'Video calling...' : 'Voice calling...'}</p>
            </div>
            
            <div className="h-full flex items-center justify-center">
              {callType === 'video' ? (
                <div className="relative">
                  <img src={selectedContact?.avatar} alt="Video call" className="w-64 h-64 rounded-lg" />
                  <div className="absolute bottom-4 right-4 w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center">
                    <img src={userData.avatar} alt="You" className="w-16 h-16 rounded" />
                  </div>
                </div>
              ) : (
                <Avatar className="h-32 w-32">
                  <img src={selectedContact?.avatar} alt="Voice call" className="rounded-full" />
                </Avatar>
              )}
            </div>
            
            <div className="absolute bottom-8 w-full flex justify-center gap-4">
              <Button 
                variant="destructive" 
                size="icon" 
                className="h-12 w-12 rounded-full" 
                onClick={() => setShowCall(false)}
              >
                <Phone className="h-6 w-6" />
              </Button>
              {callType === 'video' && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-12 w-12 rounded-full bg-gray-800 border-gray-700" 
                >
                  <Video className="h-6 w-6 text-white" />
                </Button>
              )}
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-full bg-gray-800 border-gray-700" 
              >
                <Mic className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatApp;
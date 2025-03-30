import React from 'react';
import { X, MessageCircle, Phone, Video } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ProfileSidebar = ({ 
  showProfiles, 
  setShowProfiles, 
  currentChat, 
  buttonHighlight, 
  iconColor, 
  handleVideoCall,
  handleVoiceCall,
  accentColor = "text-indigo-600 dark:text-indigo-400"
}) => {
  const handleCalls = (type:string)=>{
    switch (type) {
      case 'video':
        handleVideoCall();
        break;
    
      default:
        handleVoiceCall();
        break;
    }
    setShowProfiles(false);
  }
  // Using showProfiles state for Dialog open/close
  return (
    <Dialog open={showProfiles} onOpenChange={setShowProfiles}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Profile</DialogTitle>
          {/* <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowProfiles(false)}
            className={buttonHighlight || "hover:bg-muted"}
            aria-label="Close profile"
          >
            <X size={18} className={iconColor || ""} />
          </Button> */}
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto max-h-[70vh]">
          <div className="flex flex-col items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative mb-4">
              <img 
                src={currentChat?.avatar || "/api/placeholder/80/80"} 
                alt={currentChat?.name || "Profile"} 
                className="w-24 h-24 rounded-full object-cover shadow-lg ring-4 ring-opacity-10 ring-white dark:ring-gray-700" 
              />
              {currentChat?.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              )}
            </div>
            <h2 className="text-xl font-bold mb-1">{currentChat?.name || "Your Profile"}</h2>
            <div className="text-sm text-gray-500 mb-4">
              {currentChat?.status || "Set a status message"}
            </div>
            
            <div className="flex space-x-2 mb-3">
              {/* <Button 
                variant="outline" 
                size="sm" 
                className={`flex items-center ${buttonHighlight || ""}`}
              >
                <MessageCircle size={16} className="mr-1" />
                Message
              </Button> */}
              <Button 
              onClick={()=>handleCalls('voice')}
                variant="outline" 
                size="sm" 
                className={`flex items-center ${buttonHighlight || ""}`}
              >
                <Phone size={16} className="mr-1" />
                Call
              </Button>
              <Button 
              onClick={()=>handleCalls('video')}
                variant="outline" 
                size="sm" 
                className={`flex items-center ${buttonHighlight || ""}`}
              >
                <Video size={16} className="mr-1" />
                Video
              </Button>
            </div>
          </div>
          
          <div className="p-4">
            <div className="rounded-lg overflow-hidden border shadow-sm mb-4">
              <div className="px-4 py-3 bg-gray-50/50 dark:bg-indigo-800/10 font-medium">Media & Files</div>
              <div className="p-4 grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
                    <img src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/300`} alt={`Media ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 text-center">
                <Button variant="link" className={accentColor}>View All</Button>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden border shadow-sm">
              <div className="px-4 py-3 bg-gray-50/50 dark:bg-indigo-800/10 font-medium">Information</div>
              <div className="p-4 space-y-4">
                <div>
                  <div className="text-xs uppercase text-gray-500 mb-1">Phone</div>
                  <div className="font-medium">+1 (555) 123-4567</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 mb-1">Email</div>
                  <div className="font-medium">user@example.com</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 mb-1">Location</div>
                  <div className="font-medium">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSidebar;
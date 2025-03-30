import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const UserProfile = ({ 
  showProfiles, 
  setShowProfiles, 
  User,
}) => {
  // Using showProfiles state for Dialog open/close
  return (
    <Dialog open={showProfiles} onOpenChange={setShowProfiles}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto max-h-[70vh]">
          <div className="flex flex-col items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="relative mb-4">
              <img 
                src={User?.avatar || "/api/placeholder/80/80"} 
                alt={User?.name || "Profile"} 
                className="w-24 h-24 rounded-full object-cover shadow-lg ring-4 ring-opacity-10 ring-white dark:ring-gray-700" 
              />
              
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
              
            </div>
            <h2 className="text-xl font-bold mb-1">{User?.name || "Your Profile"}</h2>
            <div className="text-sm text-gray-500 mb-4">
              {User?.status || "Set a status message"}
            </div>
          </div>
          
          <div className="p-4">
            <div className="rounded-lg overflow-hidden border shadow-sm">
              <div className="px-4 py-3 bg-gray-50/50 dark:bg-indigo-800/10 font-medium">Information</div>
              <div className="p-4 space-y-4">
                <div>
                  <div className="text-xs uppercase text-gray-500 mb-1">Phone</div>
                  <div className="font-medium">{User.contact.phone}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 mb-1">Email</div>
                  <div className="font-medium">{User.contact.email}</div>
                </div>
                <div>
                  <div className="text-xs uppercase text-gray-500 mb-1">Location</div>
                  <div className="font-medium">{User.contact.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;
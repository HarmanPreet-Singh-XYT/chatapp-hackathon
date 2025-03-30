import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Type, Image as ImageIcon } from "lucide-react";

const StatusDialog = ({ open, onOpenChange, createNewStatus }) => {
  const [statusContent, setStatusContent] = useState('');
  const [statusType, setStatusType] = useState('text');

  const handleSubmit = () => {
    if (statusContent.trim()) {
      createNewStatus(statusContent, statusType);
      setStatusContent('');
      setStatusType('text');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <DialogDescription>
            Share what's on your mind or add a photo
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Tabs 
            defaultValue="text" 
            value={statusType} 
            onValueChange={setStatusType}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text" className="flex items-center gap-2">
                <Type size={16} />
                <span>Text</span>
              </TabsTrigger>
              <TabsTrigger value="image" className="flex items-center gap-2">
                <ImageIcon size={16} />
                <span>Image</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="text" className="mt-4">
              <div className="space-y-2">
                <Label htmlFor="status">Your Status</Label>
                <Textarea
                  id="status"
                  placeholder="What's on your mind?"
                  className="min-h-32"
                  value={statusContent}
                  onChange={(e) => setStatusContent(e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="image" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input
                    id="image-url"
                    placeholder="Enter the URL of your image"
                    value={statusContent}
                    onChange={(e) => setStatusContent(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-center">
                  <div className="w-40 h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                    {statusContent ? (
                      <img 
                        src={statusContent} 
                        alt="Preview" 
                        className="max-w-full max-h-full object-contain" 
                        
                      />
                    ) : (
                      <div className="text-center text-gray-500">
                        <Camera className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Image preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!statusContent.trim()}
          >
            Post Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusDialog;
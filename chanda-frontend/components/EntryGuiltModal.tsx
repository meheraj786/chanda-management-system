'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export function EntryGuiltModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasEntered = localStorage.getItem('entered');
    if (!hasEntered) {
      setIsOpen(true);
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem('entered', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Chanda Hell!</DialogTitle>
          <DialogDescription className="text-base mt-4">
            To see the guilt stats, 'Enter' by donating something (fake). No card needed!
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex justify-center">
          <div className="text-6xl">👹</div>
        </div>

        <Button
          onClick={handleEnter}
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg"
        >
          Enter Chanda Hell
        </Button>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

export function EntryGuiltModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // open the entry modal on first mount
    setIsOpen(true);
  }, []);

  const handleEnter = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Welcome to 💰 চাঁন্দা Management!
          </DialogTitle>
          <DialogDescription className="text-base mt-4">
            দেশ, জাতি, পার্টি, চাঁন্দা হবে খাঁটি!
            <br />
            <br />
            <br />
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWg2MTBuM2h6MjMxY2d1MG1sNG8wcTJxdDNwOW8yemk4czI1MGMzaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6Zt3OhbsQ5VLPmBW/giphy.gif"
              alt="chanda"
              className="mx-auto"
            />
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex justify-center">
          <div className="text-6xl"></div>
        </div>

        <Button
          onClick={handleEnter}
          size="lg"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg"
        >
          Enter 💰 চাঁন্দা Management
        </Button>
      </DialogContent>
    </Dialog>
  );
}

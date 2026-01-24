'use client';

import { useEffect } from 'react';
import { getRandomGuiltMessage } from '@/lib/guiltMessages';
import { useToast } from '@/hooks/use-toast';

export function GuiltPopup() {
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      const message = getRandomGuiltMessage();
      toast({
        title: 'Chanda Alert 🔔',
        description: message,
        duration: 5000,
      });
    }, 20000); // Every 20 seconds

    return () => clearInterval(interval);
  }, [toast]);

  return null;
}

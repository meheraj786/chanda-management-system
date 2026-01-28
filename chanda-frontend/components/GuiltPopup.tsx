"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const MESSAGES = [
  {
    title: "ব্যাংক ব্যালেন্স দেখে মনে হচ্ছে বড়লোক",
    description: "একটু চাঁদা দিলে তোর ব্যালেন্স আরও বেশি দেখাবে... ট্রাস্ট মি, আমি হিসাব রাখি!",
  },
  {
    title: "আজকে তোর পেট ভরা না?",
    description: "যারা পেট ভরে খায় তারা একটু চাঁদা দিলে আমাদের পেটও ভরবে... ভাই, দয়া করো একটু!",
  },
  {
    title: "জাতীয় দায়িত্ব ২.০",
    description: "দেশের উন্নয়ন তোর হাতে! ১০০ টাকা দে, না হলে পরের বার ভোট দিস না — আমি মনে রাখবো!",
  },
  {
    title: "ফ্রেন্ডজোন থেকে চাঁদা জোন",
    description: "যে বন্ধু চাঁদা দেয় না, সে আসলে বন্ধুই না... এখনও সময় আছে redeem করার!",
  },
  {
    title: "বিকাশে নাম আছে কিনা চেক কর",
    description: "আজকে তোর নাম বিকাশ টপ-আপ লিস্টে দেখলাম... চাঁদা না দিলে পরের মাস থেকে নাম কেটে দিবো!",
  },
  {
    title: "একটু সিরিয়াসলি নে",
    description: "দোয়া চাইলে ৫০০, ছবি দিলে ২০০, চাঁদা না দিলে ব্লক... এইটা নতুন নিয়ম!",
  },
  {
    title: "রমজান স্পেশাল guilt",
    description: "রোজা রাখছিস, নামাজ পড়ছিস... এখন শুধু একটা চাঁদা দিলেই পারফেক্ট মুসলমান হয়ে যাবি ভাই!",
  },
  {
    title: "চাঁদা অর নট চাঁদা",
    description: "চাঁদা দিলে তোর নাম লিস্টে, না দিলে লিস্টে তোর বউয়ের নাম... চুজ ওয়াইজলি!",
  },
  {
    title: "আজকে ইনকামের দিন",
    description: "তোর পকেট থেকে আমার পকেটে আসা মানেই দেশের GDP বাড়ছে... ইকোনমিস্টরা বলছে!",
  },
  {
    title: "শেষ চান্স ব্রো",
    description: "আজকে না দিলে কালকে আমি তোর বাসার সামনে বসে থাকবো... 'ভাইয়া একটু চা খাবো' বলে শুরু করবো!",
  },
];

export function GuiltPopup() {
  const { toast } = useToast();

  useEffect(() => {
    const showRandom = () => {
      const idx = Math.floor(Math.random() * MESSAGES.length);
      const msg = MESSAGES[idx];
      toast({
        title: msg.title,
        description: msg.description,
        duration: 10000,
      });
    };

    // show one immediately, then every 5 seconds
    showRandom();
    const interval = setInterval(showRandom, 5000);

    return () => clearInterval(interval);
  }, [toast]);

  return null;
}

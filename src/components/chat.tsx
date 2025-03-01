'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import Link from 'next/link';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleToggle = () => {
    
    setIsOpen((prev) => !prev);
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, message.trim()]);
      setMessage('');
    }
  };

  

  return (
    <div className="fixed bottom-4 right-4 z-50">
   
          
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className="bg-primary text-white rounded-full p-4 shadow-lg focus:outline-none"
      >
           <Link href="/dashboard/ai-chat/new">
        <MessageSquare className="w-6 h-6" />
           </Link>
      </motion.button>
    </div>
  );
};

export default ChatSupport;

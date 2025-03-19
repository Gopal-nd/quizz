'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const TopicSelection = () => {
  const { data: user } = useSession();
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  if (!user) return <div>Unauthorized</div>;

  const handleSubmit = () => {
    const normalizedTopic = topic.trim().toLowerCase();
    if (!normalizedTopic) {
      alert('Enter a topic');
      return;
    }
    // Append description as a query parameter if provided.
    const queryString = description
      ? `?description=${encodeURIComponent(description)}`
      : '';
    router.push(`/dashboard/custom/${normalizedTopic}${queryString}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-center font-bold text-2xl">
        Welcome <span className="text-primary">{user?.user?.name}</span>
      </h2>
      <div className="flex flex-col items-center space-y-10 min-h-screen">
        <motion.div
          className="space-y-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-center mb-6">
            Choose your favorite topic and start the AI Quiz
          </h3>
          <div className="flex flex-col items-center space-y-4">
            <Input
              type="text"
              placeholder="Enter a topic (e.g., physics, biology, history, chemistry)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border p-2 rounded-lg w-80"
            />
            <Textarea
              placeholder="Optional: Enter a description for the quiz topic"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded-lg w-80"
            />
            <button
              onClick={handleSubmit}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
            >
              Start Quiz
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TopicSelection;

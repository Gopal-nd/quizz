'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) {
          throw new Error('Error fetching leaderboard');
        }
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Top 10 Leaderboard</h1>
      {loading ? (
        <p className="text-center ">Loading...</p>
      ) : leaderboard.length === 0 ? (
        <p className="text-center ">No leaderboard data available.</p>
      ) : (
        <motion.ul 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-xl mx-auto space-y-4"
        >
          {leaderboard.map((user) => (
            <motion.li 
              key={user.userId}
              className="p-4  rounded shadow flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3">
                <p className='text-xl'>#{user.rank}</p>
                {user.image && (
                  <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full" />
                )}
                <span className="font-bold">
                   {user.name}
                </span>
              </div>
              <span className="text-gray-600">Score: {user.totalScore}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default Leaderboard;

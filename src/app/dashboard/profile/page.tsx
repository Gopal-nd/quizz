'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

interface QuizResult {
  gameType?: string;
  id?: string;
  attempted: number;
  score: number;
  percentage: string;
  time: string;
}

type QuizProps = {
  quiz: QuizResult;
};

const Profile = () => {
  const { data: session, status } = useSession();
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [aiRecentQuizzes, setAiRecentQuizzes] = useState([]);


  useEffect(() => {
    const storedData = localStorage.getItem(`quizScores-${session?.user.email}`);
    if (storedData) {
      setRecentQuizzes(JSON.parse(storedData));
    }
    const aiStoredData = localStorage.getItem(`ai-quizScores-${session?.user.email}`);
    if (aiStoredData) {
      setAiRecentQuizzes(JSON.parse(aiStoredData));
    }
  }, [session]);

  return (
    <div className="p-6  min-h-screen">
      {/* User Card */}
      {session && session.user ? (
        <div className=" shadow rounded-lg p-4 mb-6 flex items-center space-x-4">
          <img
            src={session.user.image||''}
            alt={session.user.name||''}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold">{session.user.name}</h3>
            <p className="text-gray-600">{session.user.email}</p>
          </div>
        </div>
      ) : (
        <div className="mb-6 text-center">Loading user data...</div>
      )}

      {/* Recent Quizzes */}
      <h2 className="text-3xl font-bold mb-6 text-center">Recent Quizzes</h2>
      {recentQuizzes.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-600 text-center"
        >
          No recent quizzes found.
        </motion.p>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          {recentQuizzes.map((quiz:QuizResult, index) => (
            <motion.div
              key={index}
              className="p-4  border rounded-lg shadow hover:shadow-xl transition-all"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="font-semibold text-lg">
                Category: <span className="text-primary">{quiz?.gameType || quiz.id}</span>
              </p>
              <p>Attempted: {quiz.attempted}</p>
              <p>Correct: {quiz.score}</p>
              <p>Percentage: {quiz.percentage}%</p>
              <p className="text-sm text-gray-500">
                Time: {new Date(quiz.time).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
            <h2 className="text-3xl font-bold mb-6 text-center mt-10">Recent AI Quizzes</h2>
      {aiRecentQuizzes.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-600 text-center"
        >
          No recent quizzes found.
        </motion.p>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          {aiRecentQuizzes.map((quiz:QuizResult, index) => (
            <motion.div
              key={index}
              className="p-4  border rounded-lg shadow hover:shadow-xl transition-all"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <p className="font-semibold text-lg">
                Category: <span className="text-primary">{quiz?.gameType || quiz.id}</span>
              </p>
              <p>Attempted: {quiz.attempted}</p>
              <p>Correct: {quiz.score}</p>
              <p>Percentage: {quiz.percentage}%</p>
              <p className="text-sm text-gray-500">
                Time: {new Date(quiz.time).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Profile;

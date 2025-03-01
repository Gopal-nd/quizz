'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

import { quizData } from '@/lib/data';
import Congratulations from '@/components/Congratulations'; // Adjust the path as needed
import { useSession } from 'next-auth/react';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  fact: string;
}

interface TypeQuizz {
  physics: QuizQuestion[];
  biology: QuizQuestion[];
  history: QuizQuestion[];
  chemistry: QuizQuestion[];
}

const QuizPage = ({ params }: { params: { id: string } }) => {
    const session = useSession()
    let id = params.id
  const router = useRouter();
  const questions = quizData[id as keyof TypeQuizz] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Initialize userAnswers when questions load
  useEffect(() => {
    setUserAnswers(new Array(questions.length).fill(null));
  }, [questions.length]);

  useEffect(() => {
    if (quizCompleted) {
      const percentage =
        attempted > 0 ? ((score / attempted) * 100).toFixed(2) : '0.00';

      const quizResult = {
        time: new Date().toLocaleString(), // Optional: For local storage only
        gameType: id, 
        attempted,
        score,
        percentage,
      };

      // Save to localStorage per user (optional)
      const storageKey = `quizScores-${session.data?.user.email}`;
      const existingResults = localStorage.getItem(storageKey);
      let quizResultsArray = existingResults ? JSON.parse(existingResults) : [];
      quizResultsArray.push(quizResult);
      localStorage.setItem(storageKey, JSON.stringify(quizResultsArray));

      // Call the server action directly
      fetch('/api/saveQuizResult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'Pragma': 'no-cache'},
              cache: 'no-store',
        body: JSON.stringify(quizResult),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error('Error saving quiz result:', err));
    }
    
    
  }, [quizCompleted, id, score, attempted, session.data]);


  

  const handleAnswer = (index: number) => {
    // Prevent changing answer after selection
    if (userAnswers[currentQuestion] !== null) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = index;
    setUserAnswers(newAnswers);
    setAttempted((prev) => prev + 1);
    if (index === questions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const quitQuiz = () => {
    setQuizCompleted(true);
  };


  if (quizCompleted) {
    return (
        <div className='flex items-center justify-center flex-col gap-10'>
      <Congratulations
        taskName={`Quiz: ${id}`}
        customMessage={`Congratulations! You attempted ${attempted} questions and answered ${score} correctly!`}
        theme="celebration"
        onDismiss={() => router.push('/')}
        confettiCount={120}
        showConfetti={true}
        animationDuration={3000}
        />
           <motion.div 
          initial={{ opacity: 0, scale: 0 }} 
          animate={{ opacity: 1, scale: [1, 1.2, 1] }} 
          transition={{ duration: 1.5 }} 
          className=" flex w-full  max-w-md"
        >
       
  

          <div className="relative z-10 flex items-center justify-center flex-col w-full">

            <div className="mt-4">
              <p className="text-lg">Attempted Questions: {attempted}</p>
              <p className="text-lg">Correct Answers: {score}</p>
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
        </div>
      
    );
  }

  return (
    <div className='flex items-center justify-center'>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold capitalize">{id} Quiz</h3>
        <div className="px-3 py-1 bg-green-400 rounded-full text-sm">
          Question {currentQuestion + 1} / {questions.length}
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <p className="text-lg mb-4">{questions[currentQuestion]?.question}</p>
        <div className="space-y-3">
          {questions[currentQuestion]?.options.map((option, index) => {
            let optionClasses =
              "p-3 rounded-lg border cursor-pointer transition-all hover:bg-purple-500";
            const selectedAnswer = userAnswers[currentQuestion];
            if (selectedAnswer !== null) {
              if (index === selectedAnswer) {
                optionClasses =
                  selectedAnswer === questions[currentQuestion].correct
                    ? "p-3 rounded-lg border bg-green-100 text-green-500"
                    : "p-3 rounded-lg border bg-red-100 text-red-500";
              } else {
                optionClasses = "p-3 rounded-lg border";
              }
            }
            return (
              <motion.div
                key={index}
                className={optionClasses}
                onClick={() => {
                  if (selectedAnswer === null) {
                    handleAnswer(index);
                  }
                }}
                whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              >
                {option}
              </motion.div>
            );
          })}
        </div>
        {userAnswers[currentQuestion] !== null && (
          <motion.div className="mt-4 p-3 border rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {questions[currentQuestion].fact}
          </motion.div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        {currentQuestion > 0 && (
          <button onClick={previousQuestion} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
            Previous
          </button>
        )}
        <button onClick={nextQuestion} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center">
          {currentQuestion === questions.length - 1 ? 'End Quiz' : 'Next Question'}
          <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={quitQuiz} className="bg-red-500 text-white px-4 py-2 rounded-md">
          Quit Quiz
        </button>
      </div>

      <div className="mt-4 text-sm">Attempted: {attempted} | Correct: {score}</div>
    </motion.div>
    </div>
  );
};

export default QuizPage;

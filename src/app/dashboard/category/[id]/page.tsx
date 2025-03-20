"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { ChevronRight, ChevronLeft, Award, Heart, Clock, Trophy, Star, X, Home, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { quizData } from "@/lib/data"
import Congratulations from "@/components/Congratulations"
import { useSession } from "next-auth/react"
import Confetti from "@/components/confetti"


interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  fact: string
}

interface TypeQuizz {
  physics: QuizQuestion[]
  biology: QuizQuestion[]
  history: QuizQuestion[]
  chemistry: QuizQuestion[]
}

const QuizPage = () => {
  const params = useParams()
  const id = params.id as string
  const session = useSession()
  const router = useRouter()

  const questions = quizData[id as keyof TypeQuizz] || []
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([])
  const [score, setScore] = useState(0)
  const [attempted, setAttempted] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [scoreNumber,setScoreNumber] = useState(0)

  // Game mechanics
  const [lives, setLives] = useState(20)
  const [timeLeft, setTimeLeft] = useState(60)
  const [streak, setStreak] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [gameState, setGameState] = useState<"playing" | "paused" | "review">("playing")
  const [timerActive, setTimerActive] = useState(true)

  // Initialize userAnswers when questions load
  useEffect(() => {
    setUserAnswers(new Array(questions.length).fill(null))
  }, [questions.length])

  // Timer effect
  useEffect(() => {
    if (!timerActive || gameState !== "playing") return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion, timerActive, gameState])

  // Save quiz results
  useEffect(() => {
    if (quizCompleted) {
      const percentage = scoreNumber/attempted *100;

      const quizResult = {
        time: new Date().toLocaleString(),
        gameType: id,
        attempted,
        score:scoreNumber,
        percentage,
      }

      // Save to localStorage per user (optional)
      const storageKey = `quizScores-${session.data?.user.email}`
      const existingResults = localStorage.getItem(storageKey)
      const quizResultsArray = existingResults ? JSON.parse(existingResults) : []
      quizResultsArray.push(quizResult)
      localStorage.setItem(storageKey, JSON.stringify(quizResultsArray))

      // Call the server action directly
      fetch("/api/saveQuizResult", {
        method: "POST",
        headers: { "Content-Type": "application/json", Pragma: "no-cache" },
        cache: "no-store",
        body: JSON.stringify(quizResult),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.error("Error saving quiz result:", err))
    }
  }, [quizCompleted, id, score, attempted, session.data])

  const handleTimeout = () => {
    if (userAnswers[currentQuestion] !== null) return

    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = -1 // -1 indicates timeout
    setUserAnswers(newAnswers)
    setAttempted((prev) => prev + 1)
    setLives((prev) => prev - 1)
    setStreak(0)

    if (lives <= 1) {
      setQuizCompleted(true)
    } else {
      setTimeout(() => {
        nextQuestion()
      }, 2000)
    }
  }

  const handleAnswer = (index: number) => {
    // Prevent changing answer after selection
    if (userAnswers[currentQuestion] !== null) return

    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = index
    setUserAnswers(newAnswers)
    setAttempted((prev) => prev + 1)
    setTimerActive(false)

    const isCorrect = index === questions[currentQuestion].correct

    if (isCorrect) {
      const streakBonus = streak * 10
      const timeBonus = Math.floor(timeLeft * 2)
      const questionPoints = 100 + streakBonus + timeBonus

      setScore((prev) => prev + questionPoints)
      setStreak((prev) => prev + 1)
      setShowConfetti(true)
      setScoreNumber((prev)=>prev+1)

      setTimeout(() => setShowConfetti(false), 2000)
    } else {
      setLives((prev) => prev - 1)
      setStreak(0)

      if (lives <= 1) {
        setTimeout(() => {
          setQuizCompleted(true)
        }, 2000)
        return
      }
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setTimeLeft(20)
      setTimerActive(true)
      setGameState("playing")
    } else {
      setQuizCompleted(true)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
      setGameState("review")
      setTimerActive(false)
    }
  }

  const quitQuiz = () => {
    setQuizCompleted(true)
  }

  const getScoreRating = () => {
    const maxScore = questions.length * 100
    const percentage = (score / maxScore) * 100

    if (percentage >= 90) return { stars: 3, message: "Outstanding!" }
    if (percentage >= 70) return { stars: 2, message: "Great job!" }
    return { stars: 1, message: "Good effort!" }
  }

  if (quizCompleted) {
    return (
      <div className="flex items-center justify-center flex-col gap-10 min-h-[80vh]">
        {showConfetti && <Confetti />}
        <Congratulations
          taskName={`Quiz: ${id}`}
          customMessage={`Congratulations! You attempted ${attempted} questions and answered ${score} correctly!`}
          theme="celebration"
          onDismiss={() => router.push("/")}
          confettiCount={120}
          showConfetti={true}
          animationDuration={3000}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-lg border-purple-500 shadow-xl text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.2,
              }}
            >
              <Trophy className="w-24 h-24 mx-auto text-yellow-400 mb-4" />
            </motion.div>

            <motion.h1
              className="text-4xl font-bold text-white mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Quiz Completed!
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-2xl text-purple-100 mb-2">
                Your Score: <span className="font-bold text-yellow-400">{score}</span>
              </p>
              <p className="text-xl text-purple-200">{getScoreRating().message}</p>

              <div className="flex justify-center my-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{
                      scale: i < getScoreRating().stars ? 1 : 0.5,
                      rotate: 0,
                      opacity: i < getScoreRating().stars ? 1 : 0.3,
                    }}
                    transition={{
                      delay: 0.5 + i * 0.2,
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                  >
                    <Star className={`w-12 h-12 ${i < getScoreRating().stars ? "text-yellow-400" : "text-gray-600"}`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center space-x-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="border-purple-500 text-purple-100 hover:bg-purple-800/30"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>

              <Button
                onClick={() => router.push(`/quiz/${id}`)}
                variant="outline"
                className="border-purple-500 text-purple-100 hover:bg-purple-800/30"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Play Again
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full p-4">
      {showConfetti && <Confetti />}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="px-3 py-1 bg-purple-900/50 text-purple-100 border-purple-500 capitalize"
            >
              <Trophy className="w-4 h-4 mr-1 text-yellow-400" />
              <span className="text-lg font-bold">{score}</span>
            </Badge>

            <Badge variant="outline" className="px-3 py-1 bg-purple-900/50 text-purple-100 border-purple-500">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              <span className="text-lg font-bold">x{streak}</span>
            </Badge>
          </div>

          <Badge variant="outline" className="px-3 py-1 bg-purple-900/50 text-purple-100 border-purple-500 capitalize">
            {id} Quiz
          </Badge>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="px-3 py-1 bg-purple-900/50 text-purple-100 border-purple-500">
              <Heart className="w-4 h-4 mr-1 text-red-500" />
              <span className="text-lg font-bold">{lives}</span>
            </Badge>

            <Badge variant="outline" className="px-3 py-1 bg-purple-900/50 text-purple-100 border-purple-500">
              <Clock className="w-4 h-4 mr-1 text-blue-400" />
              <span className="text-lg font-bold">{timeLeft}s</span>
            </Badge>
          </div>
        </div>

        <Progress value={(currentQuestion / questions.length) * 100} className="h-2 mb-4 bg-purple-900/30" />

        <Card className="p-6 bg-gradient-to-br from-purple-900/80 to-indigo-900/80 backdrop-blur-lg border-purple-500 shadow-xl">
          <motion.div
            key={`question-${currentQuestion}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-xl text-purple-100">{questions[currentQuestion]?.question}</p>
          </motion.div>

          <div className="space-y-3">
            <AnimatePresence>
              {questions[currentQuestion]?.options.map((option, index) => {
                const selectedAnswer = userAnswers[currentQuestion]
                const isSelected = selectedAnswer === index
                const isCorrect = index === questions[currentQuestion].correct

                let optionClasses =
                  "p-4 rounded-lg border border-purple-500/50 cursor-pointer transition-all hover:bg-purple-700/50 text-white"

                if (selectedAnswer !== null) {
                  if (isSelected) {
                    optionClasses = isCorrect
                      ? "p-4 rounded-lg border border-green-500 bg-green-500/20 text-green-300"
                      : "p-4 rounded-lg border border-red-500 bg-red-500/20 text-red-300"
                  } else if (isCorrect && selectedAnswer !== -1) {
                    optionClasses = "p-4 rounded-lg border border-green-500 bg-green-500/20 text-green-300"
                  } else {
                    optionClasses = "p-4 rounded-lg border border-purple-500/30 text-purple-300/50"
                  }
                }

                return (
                  <motion.div
                    key={index}
                    className={optionClasses}
                    onClick={() => {
                      if (selectedAnswer === null && gameState === "playing") {
                        handleAnswer(index)
                      }
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: isSelected ? 1.02 : 1,
                      boxShadow:
                        isSelected && isCorrect
                          ? "0 0 15px rgba(34, 197, 94, 0.5)"
                          : isSelected && !isCorrect
                            ? "0 0 15px rgba(239, 68, 68, 0.5)"
                            : "none",
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    whileHover={
                      selectedAnswer === null && gameState === "playing"
                        ? {
                            scale: 1.02,
                            backgroundColor: "rgba(147, 51, 234, 0.3)",
                            borderColor: "rgba(168, 85, 247, 0.8)",
                            transition: { duration: 0.2 },
                          }
                        : {}
                    }
                    whileTap={selectedAnswer === null && gameState === "playing" ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-purple-700/50 flex items-center justify-center mr-3 font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      {option}
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {userAnswers[currentQuestion] !== null && (
              <motion.div
                className="mt-6 p-4 border rounded-lg bg-indigo-900/50 border-indigo-500/50 text-indigo-100"
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="flex items-start">
                  <Award className="w-6 h-6 mr-2 text-yellow-400 flex-shrink-0 mt-1" />
                  <p>{questions[currentQuestion].fact}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        <div className="flex justify-between mt-4">
          {currentQuestion > 0 && (
            <Button
              onClick={previousQuestion}
              variant="outline"
              className="border-purple-500 text-purple-100 hover:bg-purple-800/30 flex items-center"
            >
              <ChevronLeft className="mr-1 w-4 h-4" />
              Previous
            </Button>
          )}

          {userAnswers[currentQuestion] !== null && (
            <Button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg flex items-center"
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={quitQuiz} variant="destructive" className="flex items-center">
            <X className="w-4 h-4 mr-2" />
            Quit Quiz
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default QuizPage


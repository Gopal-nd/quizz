"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Brain, Atom, Microscope, BookOpen, FlaskRoundIcon as Flask, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const [activeIcon, setActiveIcon] = useState(0)
  const icons = [
    { icon: <Atom className="w-8 h-8" />, color: "bg-purple-500" },
    { icon: <Microscope className="w-8 h-8" />, color: "bg-green-500" },
    { icon: <BookOpen className="w-8 h-8" />, color: "bg-amber-500" },
    { icon: <Flask className="w-8 h-8" />, color: "bg-blue-500" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % icons.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden  py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute flex items-center justify-center inset-0 mb-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              scale: Math.random() * 0.5 + 0.5,
              backgroundColor: ["#9333ea", "#22c55e", "#f59e0b", "#3b82f6"][Math.floor(Math.random() * 4)],
            }}
            animate={{
              x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
              y: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
            }}
          />
        ))}
      </div>

      <div className=" relative z-10 px-4 ">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center justify-center"
          >
            <div className="relative">
              <div className="flex items-center justify-center w-20 h-20 rounded-full  backdrop-blur-sm">
                <Brain className="w-28 h-28 " />
              </div>
              <motion.div
                className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${icons[activeIcon].color}`}
                key={activeIcon}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {icons[activeIcon].icon}
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Put Your Knowledge to the Test!
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl  mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Engaging quizzes across physics, biology, history, and chemistry to challenge and expand your mind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700  font-medium px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link
               href="/dashboard">
              Start Quizzing
              </Link>
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/20  hover:bg-white/20 px-8 py-6 text-lg rounded-xl"
            >
              Learn More
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <QuizCard icon={<Atom className="w-8 h-8" />} title="Physics" color="bg-purple-500" delay={0} />
            <QuizCard icon={<Microscope className="w-8 h-8" />} title="Biology" color="bg-green-500" delay={0.1} />
            <QuizCard icon={<BookOpen className="w-8 h-8" />} title="History" color="bg-amber-500" delay={0.2} />
            <QuizCard icon={<Flask className="w-8 h-8" />} title="Chemistry" color="bg-blue-500" delay={0.3} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function QuizCard({ icon, title, color, delay = 0 }:any) {
  return (
    <motion.div
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div
        className={`absolute inset-0 ${color} rounded-xl opacity-20 group-hover:opacity-30 transition-opacity`}
      ></div>
      <div className="relative p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.8, duration: 0.3 }}
          className="mb-3"
        >
          {icon}
        </motion.div>
        <h3 className="font-semibold">{title}</h3>
      </div>
    </motion.div>
  )
}


"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { UserPlus, ListChecks, PlayCircle, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      icon: <UserPlus className="w-8 h-8" />,
      title: "Sign Up/Log In",
      description: "Quick and hassle-free registration to get started.",
      color: "bg-purple-500",
    },
    {
      icon: <ListChecks className="w-8 h-8" />,
      title: "Select a Topic",
      description: "Choose from physics, biology, history, or chemistry based quizzes.",
      color: "bg-green-500",
    },
    {
      icon: <PlayCircle className="w-8 h-8" />,
      title: "Play & Learn",
      description: "Answer questions, get instant feedback, and see detailed explanations for each answer.",
      color: "bg-blue-500",
    },
  ]

  useEffect(() => {
    let reference = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3); // Cycles through 0 → 1 → 2 → 3 → 0
    }, 3000);

    return () => clearInterval(reference); // Cleanup on unmount
  }, []);
  

  return (
    <section className="py-20 md:py-32 border-t" id="how-it-works" ref={ref}>
      <div className=" px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4 "
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-xl  max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get started in just a few simple steps
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="hidden md:flex justify-between items-center mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-full ${step.color}  flex items-center justify-center mb-4 relative`}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setActiveStep(index)}
                >
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full  flex items-center justify-center text-sm font-bold shadow-md">
                    {index + 1}
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-2 ">{step.title}</h3>
                <p className="text-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile steps */}
          <div className="md:hidden space-y-6 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div
                  className={`w-12 h-12 rounded-full ${step.color}  flex items-center justify-center shrink-0 relative`}
                >
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full  flex items-center justify-center text-xs font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1 ">{step.title}</h3>
                  <p className="text-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border border-slate-50 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="p-1 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
              <div className="bg-white p-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm text-slate-500">Quiz App</div>
              </div>
            </div>

            <div className="p-6">
              {activeStep === 0 && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-center mb-6">Create Your Account</h3>
                  <div className="space-y-4 max-w-sm mx-auto">
              
                    <div className="space-y-4">
          <Button  variant="outline" className="w-full">
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </div>
                  
                    <p className="text-center text-sm ">
                      Already have an account?{" "}
                      <a href="#" className="text-purple-500 hover:underline">
                        Log in
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}

              {activeStep === 1 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold text-center mb-6">Select a Topic</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <TopicCard
                      title="Physics"
                      color="bg-purple-100 hover:bg-purple-200"
                      textColor="text-purple-700"
                      active={true}
                    />
                    <TopicCard title="Biology" color="bg-green-100 hover:bg-green-200" textColor="text-green-700" />
                    <TopicCard title="History" color="bg-amber-100 hover:bg-amber-200" textColor="text-amber-700" />
                    <TopicCard title="Chemistry" color="bg-blue-100 hover:bg-blue-200" textColor="text-blue-700" />
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-green-500  px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center">
                      Continue
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Physics Quiz</h3>
                    <div className="px-3 py-1   rounded-full text-sm">Question 1/10</div>
                  </div>

                  <div className="p-4 border border-slate-200 rounded-lg">
                    <p className="text-lg  mb-4">What is the SI unit of force?</p>

                    <div className="space-y-3">
                      <QuizOption label="A" text="Watt" />
                      <QuizOption label="B" text="Joule" />
                      <QuizOption label="C" text="Newton" isCorrect={true} />
                      <QuizOption label="D" text="Pascal" />
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-green-700 font-medium mb-2">Correct!</p>
                    <p className="text-slate-700">
                      The newton (N) is the SI unit of force. It is defined as the amount of force required to
                      accelerate a mass of one kilogram at a rate of one meter per second squared.
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-300 transition-colors">
                      Previous
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center">
                      Next Question
                      <ChevronRight className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full ${activeStep === index ? "bg-blue-500" : "bg-slate-300"}`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TopicCard({ title, color, textColor, active = false }:any) {
  return (
    <motion.div
      className={`p-4 rounded-lg cursor-pointer transition-colors ${color} ${active ? "ring-2 ring-blue-500" : ""}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <p className={`font-medium ${textColor}`}>{title}</p>
    </motion.div>
  )
}

function QuizOption({ label, text, isCorrect = false }:any) {
  return (
    <div
      className={`p-3 rounded-lg border ${isCorrect ? " border-green-200" : "border-slate-200 hover:border-slate-300"} cursor-pointer transition-colors flex items-center gap-3`}
    >
      <div
        className={`w-8 h-8 rounded-full ${isCorrect ? "bg-green-500" : "bg-slate-100"} flex items-center justify-center font-medium ${isCorrect ? "" : "text-slate-700"}`}
      >
        {label}
      </div>
      <p className="">{text}</p>
    </div>
  )
}

export function GoogleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M44.5 20H24v8.5h11.8C34.5 32.9 30.5 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.2L39 9.3C35.1 5.8 29.8 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10.6 0 19.4-7.6 19.4-20 0-1.3-.1-2.6-.3-4z"
        fill="#FFC107"
      />
      <path
        d="M6.3 14.6l6.6 4.8C14.9 16 18.9 14 24 14c3.1 0 5.9 1.2 8.1 3.2L39 9.3C35.1 5.8 29.8 4 24 4 16.1 4 9.3 8.3 6.3 14.6z"
        fill="#FF3D00"
      />
      <path
        d="M24 44c5.5 0 10.4-1.8 14.2-4.9l-6.6-5.1c-2.1 1.4-4.8 2.2-7.6 2.2-6.5 0-10.7-4-12.7-9.4l-6.6 5C9.4 39.5 16.2 44 24 44z"
        fill="#4CAF50"
      />
      <path
        d="M44.5 20H24v8.5h11.8c-1.3 3.5-5 6-11.8 6-6.5 0-10.7-4-12.7-9.4l-6.6 5C9.4 39.5 16.2 44 24 44c10.6 0 19.4-7.6 19.4-20 0-1.3-.1-2.6-.3-4z"
        fill="#1976D2"
      />
    </svg>
  );
}



"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const faqs = [
    {
      question: "How does the quiz scoring work?",
      answer:
        "Each correct answer earns you points based on the difficulty level of the question and how quickly you answer. Bonus points are awarded for completing quizzes without any incorrect answers. Your scores are tracked over time to show your progress in each subject area.",
    },
    {
      question: "What happens if I leave a quiz unfinished?",
      answer:
        "Your progress is automatically saved, allowing you to resume the quiz later from where you left off. Unfinished quizzes appear in your dashboard under 'In Progress' for easy access.",
    },
    {
      question: "How does the app adapt to different skill levels?",
      answer:
        "Our adaptive learning algorithm analyzes your performance and adjusts the difficulty of questions accordingly. As you improve in a subject, you'll receive more challenging questions. You can also manually select difficulty levels for each quiz.",
    },
    {
      question: "Can I create my own quizzes?",
      answer:
        "Yes! Premium users can create custom quizzes by uploading their own questions or selecting from our question bank. These quizzes can be kept private or shared with friends and classmates.",
    },
    {
      question: "Is there a limit to how many quizzes I can take?",
      answer:
        "Free users can access up to 5 quizzes per day across all subjects. Premium subscribers enjoy unlimited access to all quizzes and additional features like detailed analytics and custom quiz creation.",
    },
  ]

  return (
    <section className="py-20 md:py-32 border-t" id="faq" ref={ref}>
      <div className=" px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4 "
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-xl  max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find answers to common questions about our quiz platform
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              delay={0.2 + index * 0.1}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="text-slate-600 mb-4">Still have questions? We're here to help!</p>
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

function FaqItem({ question, answer, delay, isInView }:any) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="border border-slate-200 rounded-lg overflow-hidden "
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <button className="flex justify-between items-center w-full p-4 text-left" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="font-medium text-lg ">{question}</h3>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 " />
        </motion.div>
      </button>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0  border-t border-slate-100">{answer}</div>
      </motion.div>
    </motion.div>
  )
}


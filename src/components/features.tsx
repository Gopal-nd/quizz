"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Atom, Microscope, BookOpen, FlaskRoundIcon as Flask, Zap, Trophy, Smartphone } from "lucide-react"
import Link from "next/link"

export default function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 md:py-32 border-t " id="features">
      <div className=" px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4 "
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            ref={ref}
          >
            Features & Benefits
          </motion.h2>
          <motion.p
            className="text-xl  max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our comprehensive quiz platform designed to make learning fun and engaging
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute flex items-center  rounded-2xl blur opacity-20"></div>
            <div className="  p-8 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-2xl font-bold mb-6 ">Diverse Quiz Topics</h3>

              <motion.ul variants={container} initial="hidden" animate={isInView ? "show" : ""} className="space-y-6">
                <TopicItem
                  icon={<Atom className="w-6 h-6 text-purple-500" />}
                  title="Physics"
                  description="Explore questions on mechanics, electromagnetism, and quantum theory."
                  variants={item}
                />
                <TopicItem
                  icon={<Microscope className="w-6 h-6 text-green-500" />}
                  title="Biology"
                  description="Test your knowledge on cell biology, genetics, and ecosystems."
                  variants={item}
                />
                <TopicItem
                  icon={<BookOpen className="w-6 h-6 text-amber-500" />}
                  title="History"
                  description="Challenge yourself with questions spanning ancient civilizations to modern events."
                  variants={item}
                />
                <TopicItem
                  icon={<Flask className="w-6 h-6 text-blue-500" />}
                  title="Chemistry"
                  description="Delve into topics like chemical reactions, organic chemistry, and periodic trends."
                  variants={item}
                />
              </motion.ul>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FeatureCard
              icon={<Zap className="w-10 h-10 text-amber-500" />}
              title="Interactive Gameplay"
              description="Enjoy immediate feedback, timer-based challenges, and fun animations that make learning exciting."
              delay={0.4}
            />
            <FeatureCard
              icon={<Trophy className="w-10 h-10 text-purple-500" />}
              title="Progress Tracking & Leaderboards"
              description="Track your improvement over time and compete with friends or global users to stay motivated."
              delay={0.5}
            />
            <FeatureCard
              icon={<Smartphone className="w-10 h-10 text-blue-500" />}
              title="User-Centric Design"
              description="Experience an intuitive interface designed for an enjoyable learning journey on any device."
              delay={0.6}
            />
          </motion.div>
        </div>

        <motion.div
          className=" p-8 md:p-12 rounded-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 ">
            <div className="md:w-1/2">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 ">Ready to challenge yourself?</h3>
              <p className=" mb-6">
                Our quizzes are designed to be both fun and educational, helping you learn while you play.
              </p>
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={'/dashboard'}>
                Try a Quiz Now
                </Link>
              </motion.button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                className="relative w-64 h-64"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 20,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-20 animate-pulse"></div>
                </div>
                <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center">
                  <Atom className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center">
                  <Microscope className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center">
                  <Flask className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function TopicItem({ icon, title, description, variants }:any) {
  return (
    <motion.li variants={variants} className="flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold ">{title}</h4>
        <p className="">{description}</p>
      </div>
    </motion.li>
  )
}

function FeatureCard({ icon, title, description, delay = 0 }:any) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 ">{title}</h3>
      <p className="">{description}</p>
    </motion.div>
  )
}


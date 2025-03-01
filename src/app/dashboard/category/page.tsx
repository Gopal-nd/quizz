'use client'

import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  const { data: user } = useSession()
  const router = useRouter()

  if (!user) return <div>Unauthorized</div>

  const handleCategoryClick = (category: string) => {
    router.push(`/dashboard/category/${category}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-10 min-h-screen">
        <motion.div
          className="space-y-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl font-bold text-center mb-6">Select a Quizz Topic</h3>
          <div className="grid md:grid-cols-2 grid-rows-4 gap-4">
            <TopicCard title="Physics" color="bg-purple-100 hover:bg-purple-200" textColor="text-purple-700" onClick={() => handleCategoryClick('physics')} />
            <TopicCard title="Biology" color="bg-green-100 hover:bg-green-200" textColor="text-green-700" onClick={() => handleCategoryClick('biology')} />
            <TopicCard title="History" color="bg-amber-100 hover:bg-amber-200" textColor="text-amber-700" onClick={() => handleCategoryClick('history')} />
            <TopicCard title="Chemistry" color="bg-blue-100 hover:bg-blue-200" textColor="text-blue-700" onClick={() => handleCategoryClick('chemistry')} />
          {/* <div className="flex justify-end">
            <button className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center">
              Continue
              <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div> */}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Page;

interface TopicCardProps {
  title: string;
  color: string;
  textColor: string;
  onClick: () => void;
}

const TopicCard: FC<TopicCardProps> = ({ title, color, textColor, onClick }) => {
  return (
    <motion.div
      className={`p-4 rounded-lg cursor-pointer transition-colors ${color}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <p className={`font-medium ${textColor}`}>{title}</p>
    </motion.div>
  )
}
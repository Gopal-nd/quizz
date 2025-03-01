'use client'



import Link from "next/link"
import Image from "next/image"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Brain, FlaskRoundIcon as Flask, Microscope, BookOpen, Trophy, Gamepad2, Sparkles, ChevronRight } from 'lucide-react'
import MemoryGame from "@/components/GridGame"

export default function LandingPage() {
    const { data: user } = useSession()
  const router = useRouter()

  if (!user) return <div>Unauthorized</div>

  const handleCategoryClick = (category: string) => {
    router.push(`/dashboard/category/${category}`)
  }
  return (
    <div className="min-h-screen  p-4 md:p-8">
      {/* Header Section */}
      <header className="mb-12 text-center">
        <h1 className="animate-fade-in text-4xl font-bold tracking-tight md:text-5xl">
          Welcome, <span className="text-primary">{user.user.name}</span>!
        </h1>
        <p className="mt-3 text-muted-foreground">Choose your quiz adventure</p>
      </header>

      {/* Main Content Grid */}
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        {/* Normal Quiz Section */}
        <div className="group relative overflow-hidden rounded-xl  p-6 shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 opacity-70 transition-transform duration-500 group-hover:scale-150"></div>
          
          <h2 className="mb-3 flex items-center text-2xl font-bold">
            <BookOpen className="mr-2 h-6 w-6 text-primary" />
            Normal Quiz
          </h2>
          
          <p className="mb-6 ">Test your knowledge with standard quizzes on various topics.</p>
          
          <div className="mb-6 grid grid-cols-2 gap-3">
            {[
              { name: "Physics", icon: <Brain className="h-5 w-5" /> },
              { name: "Chemistry", icon: <Flask className="h-5 w-5" /> },
              { name: "Biology", icon: <Microscope className="h-5 w-5" /> },
              { name: "History", icon: <BookOpen className="h-5 w-5" /> }
            ].map((category) => (
              <div 
                key={category.name}
                className="flex items-center rounded-lg border border-gray-200  p-3 transition-colors hover:bg-primary"
              >
                <span className="mr-2 text-primary">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
          
          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div>
          </div>
          
          <Link
            href="/dashboard/category"
            className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start Quiz
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* AI Quiz Section */}
        <div className="group relative overflow-hidden rounded-xl  p-6 shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-violet-500/10 opacity-70 transition-transform duration-500 group-hover:scale-150"></div>
          
          <h2 className="mb-3 flex items-center text-2xl font-bold">
            <Sparkles className="mr-2 h-6 w-6 text-violet-500" />
            AI Quiz
          </h2>
          
          <p className="mb-6 ">Experience dynamic, AI-powered quizzes tailored to your interests.</p>
          
          <div className="mb-6 grid grid-cols-2 gap-3">
            {[
              { name: "Physics", icon: <Brain className="h-5 w-5" /> },
              { name: "Chemistry", icon: <Flask className="h-5 w-5" /> },
              { name: "Biology", icon: <Microscope className="h-5 w-5" /> },
              { name: "History", icon: <BookOpen className="h-5 w-5" /> }
            ].map((category) => (
              <div 
                key={category.name}
                className="flex items-center rounded-lg border border-gray-200  p-3 transition-colors hover:bg-primary"
              >
                <span className="mr-2 text-violet-500">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent rounded-lg"></div>
          </div>
          
          <Link
                 href="/dashboard/ai-chat"
            className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-violet-600 px-6 font-medium text-white transition-colors hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Start AI Quiz
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Games Section */}
        <div className="group relative overflow-hidden rounded-xl  p-6 shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 opacity-70 transition-transform duration-500 group-hover:scale-150"></div>
          
          <h2 className="mb-3 flex items-center text-2xl font-bold">
            <Gamepad2 className="mr-2 h-6 w-6 text-emerald-600" />
            Games
          </h2>
          
          <p className="mb-4 ">Enjoy fun and interactive games that test your knowledge.</p>
          
          <div className="mb-6 overflow-hidden rounded-lg border">
            <div className="relative">
               <MemoryGame />

          
            </div>
            <div className=" p-4">
              <h3 className="font-medium">How It Works</h3>
              <p className="mt-1 text-sm ">Interactive games that make learning fun and engaging.</p>
            </div>
          </div>
          
          <Link
                href="/dashboard/games"
            className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-emerald-600 px-6 font-medium text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Play Games
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Leaderboard Section */}
        <div className="group relative overflow-hidden rounded-xl  p-6 shadow-md transition-all duration-300 hover:shadow-xl">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-amber-500/10 opacity-70 transition-transform duration-500 group-hover:scale-150"></div>
          
          <h2 className="mb-3 flex items-center text-2xl font-bold">
            <Trophy className="mr-2 h-6 w-6 text-amber-500" />
            Leaderboard
          </h2>
          
          <p className="mb-6 ">See how you rank among other players and track your progress.</p>
          
          <div className="mb-6 overflow-hidden rounded-lg border">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-4 text-white">
              <h3 className="font-medium">Top Players</h3>
            </div>
            <div className="divide-y">
              {[
                { name: "Alex", score: 980, rank: 1 },
                { name: "Jordan", score: 875, rank: 2 },
                { name: "Taylor", score: 760, rank: 3 }
              ].map((player, index) => (
                <div key={index} className="flex items-center justify-between p-3">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                      {player.rank}
                    </div>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-amber-600">{player.score} pts</span>
                </div>
              ))}
            </div>
          </div>
          
          <Link
            href="/dashboard/leaderboard"
            className="group inline-flex h-10 w-full items-center justify-center rounded-md bg-amber-500 px-6 font-medium text-white transition-colors hover:bg-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View Leaderboard
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}

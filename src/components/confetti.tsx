"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type ConfettiPiece = {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = [
      "#FF5252", // red
      "#FF9800", // orange
      "#FFEB3B", // yellow
      "#4CAF50", // green
      "#2196F3", // blue
      "#9C27B0", // purple
      "#E91E63", // pink
    ]

    const newPieces: ConfettiPiece[] = []

    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100,
        y: -20 - Math.random() * 100,
        size: 5 + Math.random() * 15,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      })
    }

    setPieces(newPieces)

    // Clean up after animation
    const timer = setTimeout(() => {
      setPieces([])
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.3 ? "50%" : "0%",
            transform: `rotate(${piece.rotation}deg)`,
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [`${piece.x}%`, `${piece.x + (Math.random() * 20 - 10)}%`, `${piece.x + (Math.random() * 40 - 20)}%`],
            rotate: [0, 360 + Math.random() * 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            ease: "easeOut",
            times: [0, 0.8, 1],
          }}
        />
      ))}
    </div>
  )
}


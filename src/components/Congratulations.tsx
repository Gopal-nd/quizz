import React, { useState, useEffect } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  size: number;
  speed: number;
  color: string;
}

interface CongratulationsProps {
  // Required props
  taskName: string;
  
  // Optional props with defaults
  userName?: string;
  animationDuration?: number;
  onDismiss?: () => void;
  theme?: 'default' | 'celebration' | 'minimal';
  customMessage?: string;
  confettiCount?: number;
  showConfetti?: boolean;
}

const Congratulations: React.FC<CongratulationsProps> = ({
  taskName,
  userName,
  animationDuration = 3000,
  onDismiss,
  theme = 'default',
  customMessage,
  confettiCount = 100,
  showConfetti = true,
}) => {
  const [visible, setVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  // Generate confetti pieces
  useEffect(() => {
    if (!showConfetti) return;
    
    const colors = ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#B388FF', '#FF80AB'];
    const newConfetti: ConfettiPiece[] = [];
    
    for (let i = 0; i < confettiCount; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * 100, // random position across screen width (%)
        delay: Math.random() * 5, // random delay for staggered effect
        size: Math.random() * 0.8 + 0.2, // random size between 0.2-1
        speed: Math.random() * 2 + 1, // random fall speed
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setConfetti(newConfetti);
  }, [confettiCount, showConfetti]);

  useEffect(() => {
    // Reset animation state when taskName changes
    setIsAnimating(true);
    setVisible(true);
    
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
    
    return () => clearTimeout(timer);
  }, [taskName, animationDuration]);

  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  // Don't render if not visible
  if (!visible) return null;

  // Default congratulatory messages
  const defaultMessage = userName 
    ? `Great job, ${userName}! You've completed "${taskName}".`
    : `Great job! You've completed "${taskName}".`;
    
  const message = customMessage || defaultMessage;

  // Theme classes
  const themeClasses = {
    default: "bg-green-100 border-green-500 text-green-800",
    celebration: "bg-yellow-50 border-yellow-400 text-yellow-800",
    minimal: "bg-gray-50 border-gray-300 text-gray-700"
  };
  
  const containerClass = themeClasses[theme];
  
  // Animation classes
  const animationClass = isAnimating 
    ? "animate-bounce" 
    : "";

  return (
    <>
      {/* Confetti container with absolute positioning */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute"
              style={{
                left: `${piece.x}%`,
                top: `-20px`,
                width: `${piece.size * 12}px`,
                height: `${piece.size * 12}px`,
                backgroundColor: piece.color,
                opacity: 0.8,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `fall ${6 / piece.speed}s linear ${piece.delay}s infinite`
              }}
            />
          ))}
        </div>
      )}

      {/* Congratulations message */}
      <div className={`p-4 mb-4 rounded-lg border-l-4 shadow-md ${containerClass} ${animationClass} relative z-10`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {theme === 'celebration' && (
              <span className="mr-2 text-xl">🎉</span>
            )}
            {theme === 'default' && (
              <span className="mr-2 text-xl">✅</span>
            )}
            <p className="font-medium">{message}</p>
          </div>
          
          <button 
            onClick={handleDismiss}
            className="ml-4 text-gray-400 hover:text-gray-600"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      </div>

      {/* CSS animations */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Congratulations;
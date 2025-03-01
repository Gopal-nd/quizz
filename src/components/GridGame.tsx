'use client'
import React, { useEffect, useState } from "react";

type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [disableClick, setDisableClick] = useState(false);

  // Create and shuffle cards when the component mounts
  useEffect(() => {
    // Eight unique emojis representing different objects
    const emojis = ["🚗", "🍰", "🍕", "🍎", "🚀", "🎸", "🐶", "🌟"];
    // Duplicate the emojis array for pairs and then shuffle
    let cardValues = [...emojis, ...emojis];
    cardValues = shuffleArray(cardValues);

    const initialCards = cardValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(initialCards);
  }, []);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: string[]): string[] => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleCardClick = (index: number) => {
    if (disableClick) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);

    if (newSelected.length === 2) {
      setDisableClick(true);
      const [firstIdx, secondIdx] = newSelected;
      if (newCards[firstIdx].value === newCards[secondIdx].value) {
        // It's a match!
        newCards[firstIdx].isMatched = true;
        newCards[secondIdx].isMatched = true;
        setCards(newCards);
        setSelectedIndices([]);
        setDisableClick(false);
      } else {
        // Not a match; flip back after 1 second
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setSelectedIndices([]);
          setDisableClick(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6 max-w-sm">
      <h1 className="text-2xl font-bold mb-4"> Memory Game</h1>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            className="w-16 h-16 flex items-center justify-center border rounded-lg cursor-pointer select-none"
            style={{
              backgroundColor:
                card.isFlipped || card.isMatched ? "#d1fae5" : "purple",
            }}
          >
            {(card.isFlipped || card.isMatched) && (
              <span className="text-4xl">{card.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;

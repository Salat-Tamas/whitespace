'use client'

import Memorycard from '@/components/ui/Memorycard'
import React, { useEffect, useState } from 'react'
import { set } from 'sanity'

export type MemorycardProps = {
  content: string,
  id: number,
}

const cards1 = [
  {
    content: 'content12',
    id: 2,
  },
  {
    content: 'content13',
    id: 3,
  },
  {
    content: 'content14',
    id: 4,
  },
  {
    content: 'content15',
    id: 5,
  },
  {
    content: 'content16',
    id: 6,
  },
  {
    content: 'content17',
    id: 7,
  }
  
]

const cards2 = [
  {
    content: 'content22',
    id: 2,
  },
  {
    content: 'content23',
    id: 3,
  },
  {
    content: 'content24',
    id: 4,
  },
  {
    content: 'content25',
    id: 5,
  },
  {
    content: 'content26',
    id: 6,
  },
  {
    content: 'content27',
    id: 7,
  }
]

const page = () => {
  const [boardData, setBoardData] = useState<MemorycardProps[]>([])
  const [flippedCards, setFlippedCards] = useState([])
  const [foundCards, setFoundCards] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    shuffle()
    setFlippedCards([])
    setFoundCards([])
    setMoves(0)
    setGameOver(false)
  }

  const shuffle = () => {
    const shuffledCards = [...cards1, ...cards2].sort(() => Math.random() - 0.5).map((v) => v);
    setBoardData(shuffledCards);
  }
  return (
    <div className=' min-h-[90vh] w-full h-full border-2 border-red-600 flex-wrap flex justify-center'>
      {boardData.map((card, i) => (
        <Memorycard key={i} content={card.content} id={card.id}/>
      ))}
    </div>
  )
}

export default page
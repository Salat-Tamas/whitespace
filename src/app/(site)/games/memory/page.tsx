'use client'

// FIX ME: state of flipped cards, found cards, moves, game over

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [foundCards, setFoundCards] = useState<number[]>([])
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

  const updateBoardData = (id: number) => {
    if (!flippedCards.includes(id)) {
      setFlippedCards([...flippedCards, id]);
    }
  }

  const[isFlipped, setIsFlipped] = useState(false);
  const[isAnimating, setIsAnimating] = useState(false);

    function handleFlip() {
        if(!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    }

  return (
    <div className=' min-h-[90vh] w-full h-full border-2 border-red-600 flex-wrap flex justify-center'>
      {boardData.map((card, i) => {
        const flipped = flippedCards.includes(card.id);
        return (
           <div className='grid items-center justify-center m-1 w-[150px] h-[150px] md:h-[300px] md:w-[300px] md:m-2 lg:h-[350px] lg:w-[350px] cursor-pointer hover:scale-105 ease-in-out duration-300'>
            <Memorycard {...card}/>
          </div>
        )
      })}
    </div>
  )
}

export default page

type MemorycardPropsFuc = {
  content: string,
  id: number,
  boardData: MemorycardProps[]
  flippedCards: number[]
  foundCards: number[]
  moves: number
  gameOver: boolean
  setBoardData: (value: React.SetStateAction<MemorycardProps[]>) => void
}


function Memorycard ({content, id, setBoardData}: MemorycardPropsFuc){

  const[isFlipped, setIsFlipped] = useState(false);
  const[isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
      if(!isAnimating) {
          setIsFlipped(!isFlipped);
          setIsAnimating(true);
      }
  }

  return (
      <div className='grid items-center justify-center m-1 w-[150px] h-[150px] md:h-[300px] md:w-[300px] md:m-2 lg:h-[350px] lg:w-[350px] cursor-pointer hover:scale-105 ease-in-out duration-300'>
          <div className='flip-card w-[150px] h-[150px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] rounded-md'
          onClick={ handleFlip }>
              <motion.div
        className="flip-card-inner w-[100%] h-[100%] rounded-md"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 360 }}
        transition={{ duration: 0.3, animationDirection: "normal" }}
        onAnimationComplete={() => setIsAnimating(false)}
      >
        <MemorycardFront />

        <MemorycardBack content={content} />
      </motion.div>
          </div>
      </div>
  )
}

function MemorycardFront() {
  return (
    <div  className="flip-card-front w-[100%] h-[100%] bg-cover border-[1px] rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700"/>
  );
}

type MemorycardBackProps = {
  content: string,
}

function MemorycardBack({ content }: MemorycardBackProps) {
  console.log(content)
  return (
    <div className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-white text-3xl font-bold sm:text-sm rounded-lg p-4 bg-gradient-to-tr from-red-600 to-gray-700 flex flex-col items-center justify-center">
      <p className="overflow-hidden">{content}</p>
    </div>
  );
}
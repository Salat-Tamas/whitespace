'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

type MemorycardProps = {
    content: string,
    id: number,
}

const Memorycard = ({content, id}: MemorycardProps) => {

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

          <MemorycardBack content={props.content} />
        </motion.div>
            </div>
        </div>
    )
}

export default Memorycard

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
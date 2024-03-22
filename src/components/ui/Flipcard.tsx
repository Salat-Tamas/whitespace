"use client"

import React from 'react'
import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from 'next/link'

type Props = {

}


const Flipcard = (props: Props) => {

    const [isFlipped, setIsFlipped] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    function handleFLip () {
        if(!isAnimating) {
            setIsFlipped(!isFlipped)
            setIsAnimating(true)
        }
    }

    return (
        <div className='flex items-center justify-center bg-black h-[800px] cursor-pointer'>
            <div className='flip-card w-[300px] h-[300px] rounded-md' onClick={handleFLip}>
                <motion.div
                className='flip-card-inner w-[100%] h-[100%] rounded-md'
                initial={false}
                animate={{rotateY: isFlipped ? 180 : 360}}
                transition={{duration: 0.6, animationDirection: "normal"}}
                onAnimationComplete={() => setIsAnimating(false)}
                >
                    <div className='flip-card-front w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700'>
                        <h3 className='text-2xl font-bold'>Topic Title</h3>
                    </div>

                    <div className='flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4 bg-gradient-to-tr from-indigo-600 to-purple-700'>
                        <ul className='justify-center'>
                            <li>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                            </li>
                            <li>
                                <Link href='/' className={buttonVariants({ variant: "outline" })}>Learn</Link>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
        )
    }
    
    export default Flipcard
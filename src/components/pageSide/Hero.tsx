'use client'

import React from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Paytone_One } from "next/font/google"

const paytone_one = Paytone_One({ subsets: ["latin"], weight: ["400"]});
const Hero = () => {
  return (
    <div className="flex justify-center items-center h-[100vh] w-full bg-gradient-to-tr from-gray-900 to-indigo-500">
        <div className="flex flex-col items-center text-white">
            <h1 className={cn(paytone_one.className, 'text-5xl font-bold py-2 md:text-8xl')}>{"Whitespace :)"}</h1>
            <h5 className={cn(paytone_one.className, 'text-2xl justify-start mb-8')}>Learning gamified!</h5>
            <Link href='/lessons' className={cn(buttonVariants({ variant : "outline" }), "min-h-[50px] my-4 w-[250px] text-xl font-bold md:w-[500px] md:text-3xl md:h-[75px]")}>Start Learning!</Link>
        </div>
    </div>
  )
}

export default Hero
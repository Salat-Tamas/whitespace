import React from 'react'

type Props = {}

const HEAD = (
    <div className='w-[50px] h-[50px] rounded-[100%] border-[10px] border-solid border-gray-400 absolute top-[40px] right-[-21px]'/>
)

const BODY = (
    <div className='w-[10px] h-[100px] bg-gray-400 absolute top-[80px] right-0'/>
)

const RIGHT_ARM = (
    <div className='w-[100px] h-[10px] top-[100px] right-[-90px] absolute rotate-[-30deg] bg-gray-400 '/>
)

const LEFT_ARM = (
    <div className='w-[100px] h-[10px] top-[100px] right-0 absolute rotate-[30deg] bg-gray-400 '/>
)

const RIGHT_LEG = (
    <div className='w-[100px] h-[10px] top-[205px] right-[-80px] absolute rotate-[45deg] bg-gray-400 '/>
)

const LEFT_LEG = (
    <div className='w-[100px] h-[10px] top-[205px] right-[-10px] absolute rotate-[-45deg] bg-gray-400 '/>
)

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG]

type HangmandrawingProps = {
    numberOfGuesses: number
}

export function HangmanDrawing({ numberOfGuesses }: HangmandrawingProps) {
  return (
    <div className='relative'>
        { BODY_PARTS.slice(0, numberOfGuesses)}
        <div className='h-[50px] w-[10px] bg-gray-400 absolute top-0 right-0'/>
        <div className='h-[10px] w-[200px] bg-gray-400 ml-[120px]'/>
        <div className='h-[400px] w-[10px] bg-gray-400 ml-[120px]'/>
        <div className='h-[10px] w-[250px] bg-gray-400'/>
    </div>
  )
}
import { cn } from '@/lib/utils'
import React from 'react'

const KEYS = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M","N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

type KeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
}

export function Keyboard({activeLetters, inactiveLetters, addGuessedLetter}: KeyboardProps) {
    return (
        <div className='flex max-w-[90%] flex-row items-center justify-center p-4' style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: ".5rem"}}>
            {KEYS.map((key, i) => (
                    <button key={i} onClick={() => addGuessedLetter(key)}  className={`${isInactive && "bg-indigo-600"}}bg-gray-300 text-gray-800 font-bold text-2xl p-4 rounded-lg hover:enabled:bg-blue-950 hover:enabled:text-gray-300 disabled:opacity-30`}>
                        {key}
                    </button>
            ))}
        </div>
    )
}
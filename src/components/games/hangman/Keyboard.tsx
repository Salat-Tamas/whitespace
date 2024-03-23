import { cn } from '@/lib/utils'
import React from 'react'

const KEYS = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
]

type KeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
    givenLetter: string
}

export function Keyboard({activeLetters, inactiveLetters, addGuessedLetter, givenLetter}: KeyboardProps) {
    return (
        <div className='flex max-w-[90%] flex-row items-center justify-center p-4' style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: ".5rem"}}>
            {KEYS.map((key, i) => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                const Hint = key === givenLetter;
                return (
                    <button key={i} onClick={() => addGuessedLetter(key)} disabled={isInactive || isActive || Hint}  className={`font-bold text-2xl p-4 rounded-lg hover:enabled:bg-blue-950 hover:enabled:text-gray-300 ${isActive || Hint ? "bg-indigo-600 text-gray-200" : "bg-gray-300 text-gray-800"} ${isInactive ? "opacity-30" : "bg-gray-300 text-gray-800"}`}>
                        {key.toUpperCase()}
                    </button>
                )
            })}
        </div>
    )
}
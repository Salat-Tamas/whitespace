import { cn } from '@/lib/utils'
import React from 'react'

const KEYS = [
    "a", "á", "b", "c", "d", "e", "é", "f", "g", "h", "i", "í", "j", "k", "l", "m", "n", "o", "ó", "ö", "ő", "p", "q", "r", "s", "t", "u", "ú", "ü", "ű", "v", "w", "x", "y", "z"
]

type KeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void
    givenLetter: string
    disabled?: boolean
}

export function Keyboard({activeLetters, inactiveLetters, addGuessedLetter, givenLetter, disabled = false}: KeyboardProps) {
    addGuessedLetter(givenLetter)
    return (
        <div className='flex max-w-[90%] flex-row items-center justify-center p-4' style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: ".5rem"}}>
            {KEYS.map((key, i) => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                const Hint = key === givenLetter;
                return (
                    <button disabled={isInactive || isActive || Hint || disabled} key={i} onClick={() => addGuessedLetter(key)}  className={`font-bold text-2xl p-4 rounded-lg hover:enabled:bg-blue-950 hover:enabled:text-gray-300 ${isActive || Hint ? "bg-indigo-600 text-gray-200" : "bg-gray-300 text-gray-800"} ${isInactive ? "opacity-30" : "bg-gray-300 text-gray-800"}`}>
                        {key.toUpperCase()}
                    </button>
                )
            })}
        </div>
    )
}
import React from 'react'

type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess: string
    givenLetter: string
}

export function HangmanWord({guessedLetters, wordToGuess, givenLetter}: HangmanWordProps) {

return (
    <div className='flex flex-row gap-3 justify-center text-3xl sm:text-4xl md:text-6xl font-bold uppercase font-mono text-gray-400 max-w-[90%]'>
        {wordToGuess.split("").map((letter, i) => (
            <span className='border-b-[.1em] border-solid border-gray-400' key={i}>
                <span
                    style={{
                        visibility: guessedLetters.includes(letter) || letter === givenLetter ? "visible" : "hidden",
                    }}
                >
                    {letter}
                </span>
            </span>
        ))}
    </div>
);
}
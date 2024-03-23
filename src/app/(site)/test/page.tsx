'use client'
import React, { useEffect, useState } from 'react'
import { HangmanDrawing } from '@/components/games/hangman/HangmanDrawing'
import { HangmanWord } from '@/components/games/hangman/HangmanWord'
import Keyboard from '@/components/games/hangman/Keyboard'
import { randomInt } from 'crypto'

type Props = {}

const word = "HELLO"

const page = (props: Props) => {
    const [wordToGuess, setWordToGuess] = useState(() => {
        return word;
    })

    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

    useEffect(() => {
        /* DO THE LOGISITICS OF TEH GAME! */
    })

    return <div className='flex flex-col gap-8 m-auto items-center p-6 min-h-[90vh]'>
        <div className='text-xl text-center'>
            Lose Win
        </div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
        <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} givenLetter={wordToGuess[Math.floor(Math.random() * wordToGuess.length)]}/>
        <div className='self-stretch'>
            <Keyboard />
        </div>
    </div>;
}

export default page
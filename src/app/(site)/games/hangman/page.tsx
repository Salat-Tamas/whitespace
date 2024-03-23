'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { HangmanDrawing } from '@/components/games/hangman/HangmanDrawing'
import { HangmanWord } from '@/components/games/hangman/HangmanWord'
import { Keyboard } from '@/components/games/hangman/Keyboard'

const word = "hangmanword"

const page = () => {
    const [wordToGuess, setWordToGuess] = useState(() => {
        return word;
    })

    const givenLetter = "a"

    const [guessedLetters, setGuessedLetters] = useState<string[]>([])

    const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

    const addGuessedLetter = useCallback((letter: string) => {
        if(guessedLetters.includes(letter)) return

        setGuessedLetters(currentLetters => [...currentLetters, letter])
    }, [guessedLetters])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key

            if(!key.match(/^[a-z]$/)) return
            
            e.preventDefault()
            addGuessedLetter(key)
        }

        document.addEventListener("keypress", handler);

        return () => {
            document.removeEventListener("keypress", handler);
        }
    }, [guessedLetters])

    return <div className='flex flex-col gap-8 justify-center max-w-screen items-center p-6 min-h-[90vh]'>
        <div className='text-xl text-center'>
            Lose Win
        </div>
        <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
        <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} givenLetter={givenLetter}/>
        <div className='self-stretch'>
            <Keyboard activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))} inactiveLetters={incorrectLetters} addGuessedLetter={addGuessedLetter}/>
        </div>
    </div>;
}

export default page
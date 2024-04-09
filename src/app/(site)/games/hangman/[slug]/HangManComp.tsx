"use client";
import React, { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "@/components/games/hangman/HangmanDrawing";
import { HangmanWord } from "@/components/games/hangman/HangmanWord";
import { Keyboard } from "@/components/games/hangman/Keyboard";
import Image from "next/image";
import { Hangman } from "../../../../../../sanity/lib/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PageProps = {
  hangman: Hangman;
  slug: string;
  setGameScore: (score: number) => void;
};

const HangManComp = ({ hangman, slug, setGameScore }: PageProps) => {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  hangman.word = hangman.word.toLowerCase();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keypress", handler);

    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters]);
  const incorrectLetters = guessedLetters.filter(
    (letter) => !hangman.word.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = hangman.word
    .toLowerCase()
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );
  if (isWinner || isLoser) {
    setGameScore(isWinner ? 10 : -1);
  }

  const router = useRouter();
  return (
    <div className="flex flex-col gap-8 justify-center max-w-screen items-center p-6 min-h-[90vh]">
      {(isWinner || isLoser) && (
        <div
          className={`text-5xl font-bold text-center mt-16 z-10 absolute  h-40 flex-col justify-center -translate-y-[300px] `}
        >
          {isWinner && (
            <div className="absolute right-[-10rem] border-[16px] text-green-600 rounded-[60px] border-green-600 px-24 py-12 bg-gray-900">
              Win!
              <button onClick={() => router.back()} className="text-red-500 text-lg">
                Go back
              </button>
            </div>
          )}
          {isLoser && (
            <div className="absolute right-[-10rem] border-[16px] text-red-600 rounded-[60px] border-red-600  px-24 py-12 bg gray-900">
              Lose!
              <button onClick={() => router.replace(`/lessons/${slug}`)} className="text-red-500 text-lg">
                AGAIN
              </button>
            </div>
          )}
        </div>
      )}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        guessedLetters={guessedLetters}
        wordToGuess={hangman.word}
        givenLetter={hangman.hint}
      />
      <div className="self-stretch">
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            hangman.word.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
          givenLetter={hangman.hint}
        />
      </div>
    </div>
  );
};

export default HangManComp;

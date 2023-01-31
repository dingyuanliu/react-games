import React, { useEffect, useState } from "react";
import { WORD_LENGTH } from "../utils/constants";
import { Row } from "./Row";

export const Board = ({
  guesses,
  solution,
  isGameOver,
  setGuesses,
  setIsGameOver,
  setError,
}: {
  guesses: string[];
  setGuesses: React.Dispatch<React.SetStateAction<string[]>>;
  solution: string;
  isGameOver: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    const handleTyping = (event: KeyboardEvent) => {
      if (isGameOver) {
        return;
      }

      if (event.key === "Enter") {
        if (currentGuess.length < WORD_LENGTH) {
          setError("Not enough letters");
          return;
        }

        const newGuesses = [...guesses];
        const currentGuessIdx = guesses.findIndex((val) => val == null);
        newGuesses[currentGuessIdx] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          setIsGameOver(true);
        }
        return;
      }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        setError("");
        return;
      }

      const isNotLetter = !event.code.startsWith("Key");
      if (isNotLetter) {
        return;
      }

      const guess = currentGuess + event.key;
      if (guess.length <= WORD_LENGTH) {
        setCurrentGuess(guess);
      }
      setError("");
    };

    document.addEventListener("keydown", handleTyping);

    return () => document.removeEventListener("keydown", handleTyping);
  }, [
    currentGuess,
    isGameOver,
    solution,
    guesses,
    setGuesses,
    setIsGameOver,
    setError,
  ]);

  return (
    <div className="board">
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex((val) => val == null);
        return (
          <Row
            key={i}
            guess={isCurrentGuess ? currentGuess : guess || ""}
            isComplete={!isCurrentGuess && guess != null}
            solution={solution}
          />
        );
      })}
    </div>
  );
};

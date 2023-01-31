import { useEffect, useState } from "react";
import { MAX_GUESS_TIMES, WORDS_LIST } from "../utils/constants";
import { Board } from "./Board";
import { ResetButton } from "./ResetButton";

import "./Wordle.css";

const fillGuesses = Array(MAX_GUESS_TIMES).fill(null);

export const Wordle = () => {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(fillGuesses);
  const [isGameOver, setIsGameOver] = useState(false);
  const [reFetch, setReFetch] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    /**
     * In the real situation, we could get words list by api calling
     */
    const randomWord =
      WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
    setSolution(randomWord);
  }, [reFetch]);

  useEffect(() => {
    const isMaxGuessTimes =
      guesses.filter((val: string | null) => val != null).length ===
      MAX_GUESS_TIMES;
    if (isMaxGuessTimes) {
      setIsGameOver(true);
    }
  }, [guesses]);

  return (
    <div className="wordle">
      <h1>Wordle</h1>
      <h2>Please type a word to try</h2>
      <h3 className="errorMessage">{error}</h3>
      <Board
        guesses={guesses}
        solution={solution}
        isGameOver={isGameOver}
        setGuesses={setGuesses}
        setIsGameOver={setIsGameOver}
        setError={setError}
      />
      <ResetButton
        onReset={() => {
          setGuesses(fillGuesses);
          setReFetch(!reFetch);
          setIsGameOver(false);
          setError("");
        }}
      ></ResetButton>
    </div>
  );
};

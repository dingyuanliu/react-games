import { memo } from "react";
import { WORD_LENGTH } from "../utils/constants";
import { wordToLetterAndIndexMap } from "../utils/utils";

export const Row = memo(
  ({
    guess,
    isComplete,
    solution,
  }: {
    guess: string;
    isComplete: boolean;
    solution: string;
  }) => {
    const tiles: JSX.Element[] = [];

    const lettersArr = [
      ...guess.split(""),
      ...Array(WORD_LENGTH).fill(null),
    ].slice(0, WORD_LENGTH);

    const guessLetterMap = wordToLetterAndIndexMap(lettersArr);
    const solutionLetterMap = wordToLetterAndIndexMap(solution.split(""));

    lettersArr.forEach((letter, i) => {
      let className = "tile";
      if (isComplete) {
        if (solutionLetterMap.has(letter)) {
          const solutionLetterIdxes = solutionLetterMap.get(letter);
          const guessLetterIdxes = guessLetterMap.get(letter);

          if (solutionLetterIdxes.length >= guessLetterIdxes.length) {
            if (letter === solution[i]) {
              className += " correctSpot";
            } else {
              className += " wrongSpot";
            }
          }

          if (solutionLetterIdxes.length < guessLetterIdxes.length) {
            if (letter === solution[i]) {
              className += " correctSpot";
            } else {
              className += " anySpot";
            }
          }
        } else {
          className += " anySpot";
        }
      }
      tiles.push(
        <div key={i} className={className}>
          {letter}
        </div>
      );
    });

    return <div className="row">{tiles}</div>;
  }
);

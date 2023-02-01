/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import React from "react";
import { Wordle } from "./Wordle";

beforeEach(() => {
  const useStateMock: any = (initState: any) => [initState, () => null];

  /**
   * To mock multiple useState, the order of mocs should match the order defined in the component.
   */
  jest
    .spyOn(React, "useState")
    .mockImplementationOnce(() => ["world", () => null]) // Mock solution
    // .mockReturnValueOnce(["hello", () => null]) // Alternative to mock solution
    .mockImplementationOnce(() => [
      ["space", "hello", "world", null, null, null],
      () => null,
    ]) // Mock guesses
    .mockImplementation(useStateMock); // To ensure the reset unaffected
});

afterEach(() => jest.restoreAllMocks());

test("renders Wordle", () => {
  render(<Wordle />);
  const wordleTextElement = screen.getByText(/wordle/i);
  expect(wordleTextElement).toBeInTheDocument();
});

test("All of letters of the word are in any spot", () => {
  const { container } = render(<Wordle />);

  const row1 = container.querySelector(".row:first-child");

  const allAnySpot = [...row1!.children].every((child) =>
    child.className.includes("anySpot")
  );

  expect(allAnySpot).toBeTruthy();
});

test("Some of letters of the word in wrong spot", () => {
  const { container } = render(<Wordle />);
  const row2 = container.querySelector(".row:nth-child(2)");
  const hasWrongSpot = [...row2!.children].some((child) =>
    child.className.includes("wrongSpot")
  );

  expect(hasWrongSpot).toBeTruthy();
});

test("All of letters of the word are in correct spot", () => {
  const { container } = render(<Wordle />);

  const row3 = container.querySelector(".row:nth-child(3");

  const allCorrectSpot = [...row3!.children].every((child) =>
    child.className.includes("correctSpot")
  );

  expect(allCorrectSpot).toBeTruthy();
});

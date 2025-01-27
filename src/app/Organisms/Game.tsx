'use client'

import type React from "react"
import { useState, useEffect } from "react"
import Dice from "../Atoms/Dice"
import Board from "./../Molecules/Board"
import { rollDice, sum } from "../utils/gameutils"

const Game: React.FC = () => {
  const [boxes, setBoxes] = useState<boolean[]>(Array(9).fill(false))
  const [dice, setDice] = useState<number[]>([1, 1])
  const [rollCount, setRollCount] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([])

  useEffect(() => {
    if (boxes.every((box) => box)) {
      setGameOver(true)
    }
  }, [boxes])

  const handleRoll = () => {
    const newDice = [rollDice(), rollDice()]
    setDice(newDice)
    setRollCount((prevCount) => prevCount + 1)
    setSelectedBoxes([]) // Reset selected boxes for the new turn
  }

  const handleBoxClick = (index: number) => {
    const diceSum = sum(dice)

    // If the box is already selected, unselect it
    if (selectedBoxes.includes(index + 1)) {
      setSelectedBoxes((prev) => prev.filter((box) => box !== index + 1))
      return
    }

    // Add the box to the selected list if it doesn't exceed the dice sum
    const newSelected = [...selectedBoxes, index + 1]
    const selectedSum = sum(newSelected)

    if (selectedSum <= diceSum) {
      setSelectedBoxes(newSelected)

      // If the selected boxes sum up to the dice sum, close the boxes
      if (selectedSum === diceSum) {
        const newBoxes = [...boxes]
        newSelected.forEach((box) => {
          newBoxes[box - 1] = true
        })
        setBoxes(newBoxes)
        setSelectedBoxes([]) // Reset selected boxes after closing
      }
    }
  }

  const resetGame = () => {
    setBoxes(Array(9).fill(false))
    setDice([1, 1])
    setRollCount(0)
    setGameOver(false)
    setSelectedBoxes([])
  }

  return (
    <div className="flex flex-col items-center justify-center font-mono bg-red-200">
      <div className="flex space-x-4 mb-8">
        <Dice value={dice[0]} />
        <Dice value={dice[1]} />
      </div>
      <Board boxes={boxes} onBoxClick={handleBoxClick} />
      <div className="mt-8">
        <button
          className="px-4 py-2 bg-red-500 text-white uppercase text-2xl rounded-lg hover:bg-red-500"
          onClick={handleRoll}
          disabled={gameOver}
        >
          Roll Dice
        </button>
      </div>
      <p className="mt-4 text-2xl uppercase text-red-500">Roll Count: {rollCount}</p>
      {gameOver && (
        <div className="mt-8">
          <p className="text-2xl font-bold">Game Over!</p>
          <p className="text-xl">You completed the game in {rollCount} rolls.</p>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default Game

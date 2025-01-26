export function rollDice(): number {
  return Math.floor(Math.random() * 6) + 1
}

export function sum(numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0)
}

export function getAvailableMoves(openBoxes: number[], diceSum: number): number[] {
  return openBoxes.filter((box) => box <= diceSum)
}


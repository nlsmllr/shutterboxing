import type React from "react"

interface DiceProps {
  value: number
}

const Dice: React.FC<DiceProps> = ({ value }) => {
  return (
    <div className="w-20 h-20 bg-red-100 rounded-lg font-mono text-red-500 shadow-md flex items-center justify-center text-6xl font-bold">
      {value}
    </div>
  )
}

export default Dice


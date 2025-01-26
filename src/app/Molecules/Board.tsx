import type React from "react"

interface BoardProps {
  boxes: boolean[]
  onBoxClick: (index: number) => void
}

const Board: React.FC<BoardProps> = ({ boxes, onBoxClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {boxes.map((isShut, index) => (
        <button
          key={index}
          className={`w-28 h-28 rounded-lg text-5xl font-mono font-bold ${
            isShut ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-500"
          }`}
          onClick={() => onBoxClick(index)}
          disabled={isShut}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Board


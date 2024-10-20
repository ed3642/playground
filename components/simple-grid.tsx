import { cn } from '@/lib/utils'
import React, { useState } from 'react'

interface SimpleGridProps {
  grid: number[][]
  toggleCell: (rowIndex: number, colIndex: number) => void
  cellSize: number
  gap: number
  colors: { [key: number]: string }
  draggableValues?: number[]
  onDragStart?: (rowIndex: number, colIndex: number) => void
  onDrop?: (rowIndex: number, colIndex: number) => void
  cellClassName?: string
  onTouchStart?: (rowIndex: number, colIndex: number) => void
  onTouchEnd?: (rowIndex: number, colIndex: number) => void
}

const SimpleGrid: React.FC<SimpleGridProps> = ({
  grid,
  toggleCell,
  cellSize,
  gap,
  colors,
  draggableValues,
  onDragStart,
  onDrop,
  cellClassName,
  onTouchStart,
  onTouchEnd,
}) => {
  const [dampenedCells, setDampenedCells] = useState<{ [key: string]: boolean }>({})

  const handleTouchStart = (rowIndex: number, colIndex: number) => {
    setDampenedCells((prev) => ({ ...prev, [`${rowIndex}-${colIndex}`]: true }))
    if (onTouchStart) onTouchStart(rowIndex, colIndex)
  }

  const handleTouchEnd = (rowIndex: number, colIndex: number) => {
    setDampenedCells((prev) => ({ ...prev, [`${rowIndex}-${colIndex}`]: false }))
    if (onTouchEnd) onTouchEnd(rowIndex, colIndex)
  }

  const gridTemplateColumns = `repeat(${grid[0].length}, ${cellSize}px)`
  const gridTemplateRows = `repeat(${grid.length}, ${cellSize}px)`

  return (
    <div className="flex justify-center items-center flex-col bg-slate-800">
      <div className="flex w-full overflow-hidden justify-center items-center">
        <div
          className="grid"
          style={{
            gridTemplateColumns,
            gridTemplateRows,
          }}
        >
          {grid.map((row: number[], i: number) => (
            <div key={i} className="contents">
              {row.map((value: number, j: number) => (
                <div
                  key={j}
                  className={`box-border ${draggableValues?.includes(value) ? 'cursor-grab' : 'cursor-pointer'}`}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    padding: `${gap}px`,
                  }}
                  onClick={() => toggleCell(i, j)}
                  draggable={draggableValues?.includes(value)}
                  onDragStart={onDragStart ? () => onDragStart(i, j) : undefined}
                  onDrop={onDrop ? () => onDrop(i, j) : undefined}
                  onTouchStart={() => handleTouchStart(i, j)}
                  onTouchEnd={() => handleTouchEnd(i, j)}
                >
                  <div
                    className={cn(
                      'w-full h-full flex justify-center items-center',
                      cellClassName,
                      dampenedCells[`${i}-${j}`] ? 'brightness-50' : ''
                    )}
                    style={{
                      backgroundColor: colors[value] || colors[0], // default to first color
                    }}
                  ></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SimpleGrid

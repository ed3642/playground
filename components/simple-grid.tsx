import React from 'react'

interface SimpleGridProps {
  grid: number[][]
  toggleCell: (rowIndex: number, colIndex: number) => void
  cellSize: number
  gap: number
  colors: { [key: number]: string }
  draggableValues?: number[]
  onDragStart?: (rowIndex: number, colIndex: number) => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (rowIndex: number, colIndex: number) => void
}

const SimpleGrid: React.FC<SimpleGridProps> = ({
  grid,
  toggleCell,
  cellSize,
  gap,
  colors,
  draggableValues,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const gridTemplateColumns = `repeat(${grid[0].length}, ${cellSize}px)`
  const gridTemplateRows = `repeat(${grid.length}, ${cellSize}px)`

  return (
    <div className="flex justify-center items-center flex-col">
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
                  onDragOver={onDragOver ? (e) => onDragOver(e) : undefined}
                  onDrop={onDrop ? () => onDrop(i, j) : undefined}
                >
                  <div
                    className="w-full h-full flex justify-center items-center"
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

import React from 'react'

interface SimpleGridProps {
  grid: number[][]
  toggleCell: (rowIndex: number, colIndex: number) => void
  cellSize: number
  gap: number
}

const SimpleGrid: React.FC<SimpleGridProps> = ({ grid, toggleCell, cellSize, gap }) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex w-full overflow-hidden justify-center items-center">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
            gap: `${gap}px`,
          }}
        >
          {grid.map((row: number[], i: number) => (
            <div key={i} style={{ display: 'contents' }}>
              {row.map((isAlive: number, j: number) => (
                <div
                  key={j}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    backgroundColor: isAlive ? '#3545b3' : '#ccc',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleCell(i, j)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SimpleGrid

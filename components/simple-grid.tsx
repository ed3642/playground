interface SimpleGridProps {
  grid: number[][]
  toggleCell: (rowIndex: number, colIndex: number) => void
  cellSize: number
}

const SimpleGrid: React.FC<SimpleGridProps> = ({
  grid,
  toggleCell,
  cellSize,
}) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex w-full overflow-hidden justify-center items-center">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid[0].length}, ${cellSize}px)`,
            gap: '2px',
          }}
        >
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'contents' }}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    backgroundColor: cell ? '#3545b3' : '#ccc',
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleCell(rowIndex, colIndex)}
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

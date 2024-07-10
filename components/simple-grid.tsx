interface SimpleGridProps {
  grid: number[][]
  toggleCell: (rowIndex: number, colIndex: number) => void
}

const SimpleGrid = ({ grid, toggleCell }: SimpleGridProps) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex w-full overflow-hidden justify-center items-center">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
            gap: '2px',
          }}
        >
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'contents' }}>
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    width: '20px',
                    height: '20px',
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

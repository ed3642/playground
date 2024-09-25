import SimpleGrid from '@/components/simple-grid'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

const NUM_ROWS = 25
const NUM_COLS = 75
const cellSize = 15
const tickTime = 250 // ms

const initialGrid: number[][] = (() => {
  const grid = new Array(NUM_ROWS)
  for (let i = 0; i < NUM_ROWS; i++) {
    grid[i] = new Array(NUM_COLS).fill(0)
  }
  // interesting init pattern
  grid[10][33] = 1
  grid[11][33] = 1
  grid[12][33] = 1
  grid[12][34] = 1
  grid[11][32] = 1

  return grid
})()

const GameOfLife = () => {
  const [grid, setGrid] = useState(initialGrid)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const isInBounds = (i: number, j: number): boolean => {
    return i >= 0 && i < NUM_ROWS && j >= 0 && j < NUM_COLS
  }

  const getLiveNeighbors = (grid: number[][], x: number, y: number): number => {
    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ]

    let count = 0
    for (const [dx, dy] of directions) {
      const nX = x + dx
      const nY = y + dy
      if (isInBounds(nX, nY)) {
        count += grid[nX][nY]
      }
    }
    return count
  }

  const updateGrid = (): void => {
    setGrid((grid) => {
      const newGrid = grid.map((row) => [...row]) // need to create a new grid so react picks up on the changes
      for (let i = 0; i < NUM_ROWS; i++) {
        for (let j = 0; j < NUM_COLS; j++) {
          const neighborCount = getLiveNeighbors(grid, i, j)
          if (grid[i][j] === 1) {
            if (neighborCount < 2 || neighborCount > 3) {
              newGrid[i][j] = 0
            }
          } else {
            if (neighborCount === 3) {
              newGrid[i][j] = 1
            }
          }
        }
      }
      return newGrid
    })
  }

  const toggleCell = (i: number, j: number): void => {
    if (isRunning) {
      return
    }
    setGrid((grid) =>
      grid.map((row, row_i) =>
        row.map((cell, cell_i) =>
          row_i === i && cell_i === j ? (cell === 0 ? 1 : 0) : cell
        )
      )
    )
  }

  const handleReset = (): void => {
    setGrid(initialGrid)
    handleStop()
  }

  const handleRun = (): void => {
    if (!intervalId) {
      const id = setInterval(updateGrid, tickTime)
      setIntervalId(id)
      setIsRunning(true)
    }
  }

  const handleStop = (): void => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
      setIsRunning(false)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [intervalId])

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center my-2 space-x-2">
        <Button variant="secondary" onClick={updateGrid} disabled={isRunning}>
          Next
        </Button>
        <Button onClick={handleRun} disabled={isRunning}>
          Run
        </Button>
        <Button
          variant="destructive"
          onClick={handleStop}
          disabled={!isRunning}
        >
          Stop
        </Button>
        <Button onClick={handleReset} variant="destructive">
          Reset
        </Button>
      </div>
      <div className="mb-4">
        <SimpleGrid grid={grid} toggleCell={toggleCell} cellSize={cellSize} />
      </div>
    </div>
  )
}

export default GameOfLife
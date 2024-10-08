'use client'

import SimpleGrid from '@/components/simple-grid'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useState } from 'react'
import { calculateGridDimensions } from '@/lib/simple-grid/utils'

const NUM_ROWS: number = 25
const tickTime: number = 250 // ms
const gapSize: number = 2

const getCellSize = (): number => {
  const viewportWidth: number = window.innerWidth
  return viewportWidth < 768 ? 30 : 15 // use bigger cells on phone
}

const initialGrid = (NUM_COLS: number): number[][] => {
  const grid = new Array(NUM_ROWS)
  for (let i = 0; i < NUM_ROWS; i++) {
    grid[i] = new Array(NUM_COLS).fill(0)
  }
  // interesting init pattern
  grid[10][Math.floor(NUM_COLS / 3)] = 1
  grid[11][Math.floor(NUM_COLS / 3)] = 1
  grid[12][Math.floor(NUM_COLS / 3)] = 1
  grid[12][Math.floor(NUM_COLS / 3) + 1] = 1
  grid[11][Math.floor(NUM_COLS / 3) - 1] = 1

  return grid
}

const GameOfLife: React.FC = () => {
  const [cellSize, setCellSize] = useState(getCellSize)
  const [{ numCols }, setGridDimensions] = useState(() =>
    calculateGridDimensions(cellSize, gapSize)
  )
  const initialGridMemo = useMemo(() => initialGrid(numCols), [numCols])
  const [grid, setGrid] = useState(initialGridMemo)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const newCellSize = getCellSize()
    setCellSize(newCellSize)
    const { numCols } = calculateGridDimensions(newCellSize, gapSize)
    setGridDimensions({ numCols, cellSize: newCellSize })
    setGrid(initialGrid(numCols))
  }, [])

  const isInBounds = (i: number, j: number): boolean => {
    return i >= 0 && i < NUM_ROWS && j >= 0 && j < numCols
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
        for (let j = 0; j < numCols; j++) {
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
      handleStop()
    }
    setGrid((grid) =>
      grid.map((row, row_i) =>
        row.map((cell, cell_i) => (row_i === i && cell_i === j ? (cell === 0 ? 1 : 0) : cell))
      )
    )
  }

  const handleReset = (): void => {
    setGrid(initialGridMemo)
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
        <Button variant="destructive" onClick={handleStop} disabled={!isRunning}>
          Stop
        </Button>
        <Button onClick={handleReset} variant="destructive">
          Reset
        </Button>
      </div>
      <div className="mb-4">
        <SimpleGrid grid={grid} toggleCell={toggleCell} cellSize={cellSize} gap={gapSize} />
      </div>
    </div>
  )
}

export default GameOfLife

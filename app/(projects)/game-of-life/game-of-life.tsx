'use client'

import SimpleGrid from '@/components/simple-grid'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useState } from 'react'
import { calculateGridDimensions, getCellSize, isInBounds } from '@/lib/simple-grid/utils'

const MIN_ROWS = 13
const GAP_SIZE: number = 1
const tickTime: number = 250 // ms
const colorMapping: { [key: number]: string } = {
  0: '#ccc', // dead
  1: '#3545b3', // alive
}
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

const initialGrid = (numRows: number, numCols: number): number[][] => {
  const grid = new Array(numRows)
  for (let i = 0; i < numRows; i++) {
    grid[i] = new Array(numCols).fill(0)
  }
  // interesting init pattern
  const thridCol = Math.floor(numCols / 3)
  grid[10][thridCol] = 1
  grid[11][thridCol] = 1
  grid[12][thridCol] = 1
  grid[12][thridCol + 1] = 1
  grid[11][thridCol - 1] = 1

  return grid
}

const DESIRED_VIEW_WIDTH = window.innerWidth
const DESIREF_VIEW_HEIGHT = window.innerHeight * 0.7

const GameOfLife: React.FC = () => {
  const cellSize = getCellSize(20, 30)
  const { numCols, numRows } = calculateGridDimensions(
    cellSize,
    DESIRED_VIEW_WIDTH,
    DESIREF_VIEW_HEIGHT,
    MIN_ROWS
  )
  const initialGridMemo = useMemo(() => initialGrid(numRows, numCols), [numRows, numCols])
  const [grid, setGrid] = useState(initialGridMemo)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const getLiveNeighbors = (grid: number[][], x: number, y: number): number => {
    let count = 0
    for (const [dx, dy] of directions) {
      const nX = x + dx
      const nY = y + dy
      if (isInBounds(nX, nY, numRows, numCols) && grid[nX][nY] === 1) {
        count += 1
      }
    }
    return count
  }

  const tickGrid = (grid: number[][]): number[][] => {
    const newGrid = grid.map((row) => [...row])
    for (let i = 0; i < numRows; i++) {
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
  }

  const updateGrid = (): void => {
    setGrid((grid) => {
      return tickGrid(grid)
    })
  }

  const toggleCell = (i: number, j: number): void => {
    if (isRunning) {
      handleStop()
    }
    if (!isInBounds(i, j, numRows, numCols)) return
    const newGrid = grid.map((row) => [...row]) // need to create a new grid so react picks up on the changes
    newGrid[i][j] = newGrid[i][j] === 0 ? 1 : 0
    setGrid(newGrid)
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
        <SimpleGrid
          grid={grid}
          toggleCell={toggleCell}
          cellSize={cellSize}
          gap={GAP_SIZE}
          colors={colorMapping}
        />
      </div>
    </div>
  )
}

export default GameOfLife

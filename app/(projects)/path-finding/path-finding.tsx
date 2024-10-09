'use client'

import SimpleGrid from '@/components/simple-grid'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { calculateGridDimensions, getCellSize, isInBounds } from '@/lib/simple-grid/utils'

const GAP_SIZE: number = 2
enum COLORS {
  empty = 0,
  source = 1,
  dest = 2,
  wall = 3,
  explored = 4,
  path = 5,
}

const colorMapping = {
  [COLORS.empty]: '#ccc', // Light gray
  [COLORS.source]: '#ff4500', // OrangeRed
  [COLORS.dest]: '#ffd700', // Gold
  [COLORS.wall]: '#8a2be2', // BlueViolet
  [COLORS.explored]: '#708090', // SlateGray
  [COLORS.path]: '#32cd32', // LimeGreen
}

enum Algorithm {
  BFS = 'BFS',
  Djikstras = 'Djikstras',
  SPFA = 'SPFA',
  AStar = 'A*',
}

const algorithms = Object.values(Algorithm)

const initialGrid = (numRows: number, numCols: number): number[][] => {
  const grid = new Array(numRows)
  for (let i = 0; i < numRows; i++) {
    grid[i] = new Array(numCols).fill(COLORS.empty)
  }
  // initial pattern
  const halfCol = Math.floor(numCols / 2)
  const colShift = Math.floor(numCols / 4)
  grid[9][halfCol - 2] = COLORS.source
  grid[8][halfCol] = COLORS.wall
  grid[9][halfCol] = COLORS.wall
  grid[10][halfCol] = COLORS.wall
  grid[9][halfCol + colShift] = COLORS.dest

  return grid
}

const DESIRED_VIEW_WIDTH = window.innerWidth
const DESIRED_VIEW_HEIGHT = window.innerHeight * 0.75

const PathFinding: React.FC = () => {
  const cellSize = getCellSize(25, 35)
  const { numRows, numCols } = calculateGridDimensions(
    cellSize,
    GAP_SIZE,
    DESIRED_VIEW_WIDTH,
    DESIRED_VIEW_HEIGHT
  )
  const [grid, setGrid] = useState(initialGrid(numRows, numCols))
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.BFS)

  const toggleCell = (i: number, j: number): void => {
    if (
      !isInBounds(i, j, numRows, numCols) ||
      grid[i][j] == COLORS.source ||
      grid[i][j] == COLORS.dest
    )
      return
    const newGrid = grid.map((row) => [...row])
    newGrid[i][j] = newGrid[i][j] === COLORS.wall ? COLORS.empty : COLORS.wall
    setGrid(newGrid)
  }

  const runCurrentAlgorithm = (): void => {
    console.log('Running', algorithm)
  }

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center my-2 space-x-2">
        <div className="space-x-2">
          <Button onClick={runCurrentAlgorithm}>Find path</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">
                Algo: {algorithm} <ChevronDown className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {algorithms.map((algo) => (
                <DropdownMenuItem key={algo} onSelect={() => setAlgorithm(algo)}>
                  {algo}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="destructive" onClick={() => setGrid(initialGrid(numRows, numCols))}>
            Clear
          </Button>
        </div>
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

export default PathFinding

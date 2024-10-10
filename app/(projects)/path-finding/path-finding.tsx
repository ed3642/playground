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

import { runBFS, runAStar, runDjikstras, runSPFA } from './algorithms'

const GAP_SIZE: number = 1
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
  [COLORS.source]: '#ffd700', // Gold
  [COLORS.dest]: '#ffd700', // Gold
  [COLORS.wall]: 'transparent',
  [COLORS.explored]: '#708090', // dark grey
  [COLORS.path]: '#32cd32', // green
}

enum Algorithm {
  BFS = 'BFS',
  Djikstras = 'Djikstras',
  SPFA = 'SPFA',
  AStar = 'A*',
}

const algorithmMap = {
  [Algorithm.BFS]: runBFS,
  [Algorithm.Djikstras]: runDjikstras,
  [Algorithm.SPFA]: runSPFA,
  [Algorithm.AStar]: runAStar,
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
    DESIRED_VIEW_WIDTH,
    DESIRED_VIEW_HEIGHT
  )
  const [grid, setGrid] = useState(initialGrid(numRows, numCols))
  const [algorithm, setAlgorithm] = useState<Algorithm>(Algorithm.BFS)
  const [draggedCell, setDraggedCell] = useState<{ type: COLORS; i: number; j: number } | null>(
    null
  )

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

  const handleDragStart = (i: number, j: number) => {
    if (grid[i][j] === COLORS.source || grid[i][j] === COLORS.dest) {
      setDraggedCell({ type: grid[i][j], i, j })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (i: number, j: number) => {
    if (draggedCell && isInBounds(i, j, numRows, numCols)) {
      const newGrid = grid.map((row) => [...row])
      newGrid[draggedCell.i][draggedCell.j] = COLORS.empty
      newGrid[i][j] = draggedCell.type
      setGrid(newGrid)
      setDraggedCell(null)
    }
  }

  const runCurrentAlgorithm = (): void => {
    const runAlgorithm = algorithmMap[algorithm]
    if (runAlgorithm) {
      const newGrid = runAlgorithm(grid, COLORS)
      setGrid(newGrid)
    }
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
            Reset
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
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          draggableValues={[COLORS.source, COLORS.dest]}
        />
      </div>
    </div>
  )
}

export default PathFinding
export { COLORS }

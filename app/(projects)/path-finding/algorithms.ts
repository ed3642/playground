import { isInBounds } from '@/lib/simple-grid/utils'
import { Queue } from 'typescript-collections'
import { COLORS } from './path-finding'

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]

export const runBFS = (grid: number[][], colors: typeof COLORS): number[][] => {
  const newGrid = grid.map((row) => [...row])

  // locate source and destination
  const [source, dest] = locateSourceAndDest(newGrid, colors)
  clearPathRun(newGrid, colors)

  if (source.length === 0 || dest.length === 0) {
    // didn't find the needed nodes
    return newGrid
  }

  const queue = new Queue<number[]>() // [i, j]
  const parents: { [key: string]: number[] } = {}

  queue.enqueue(source)

  while (!queue.isEmpty()) {
    const [i, j] = queue.dequeue() as number[]

    for (const [dx, dy] of directions) {
      const nX = i + dx
      const nY = j + dy
      if (isInBounds(nX, nY, grid.length, grid[0].length)) {
        if (newGrid[nX][nY] === colors.empty) {
          newGrid[nX][nY] = colors.explored
          queue.enqueue([nX, nY])
          parents[coordsToKey(nX, nY)] = [i, j]
        } else if (newGrid[nX][nY] === colors.dest) {
          // backtrack to find the shortest path
          parents[coordsToKey(nX, nY)] = [i, j]
          return backtrackPath(newGrid, parents, source, dest)
        }
      }
    }
  }
  return newGrid
}

export const runDjikstras = (grid: number[][]): number[][] => {
  const newGrid = grid.map((row) => [...row])
  // Implement Dijkstra's algorithm logic here
  return newGrid
}

export const runSPFA = (grid: number[][]): number[][] => {
  const newGrid = grid.map((row) => [...row])
  // Implement SPFA algorithm logic here
  return newGrid
}

export const runAStar = (grid: number[][]): number[][] => {
  const newGrid = grid.map((row) => [...row])
  // Implement A* algorithm logic here
  return newGrid
}

const backtrackPath = (
  grid: number[][],
  parents: { [key: string]: number[] },
  source: number[],
  dest: number[]
): number[][] => {
  let curr = parents[coordsToKey(dest[0], dest[1])]
  while (curr[0] !== source[0] || curr[1] !== source[1]) {
    const [i, j] = curr
    grid[i][j] = COLORS.path
    curr = parents[coordsToKey(i, j)]
  }
  return grid
}

const locateSourceAndDest = (grid: number[][], colors: typeof COLORS): [number[], number[]] => {
  let source: number[] = []
  let dest: number[] = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === colors.source) {
        source = [i, j]
      } else if (grid[i][j] === colors.dest) {
        dest = [i, j]
      }
    }
  }
  return [source, dest]
}

const clearPathRun = (grid: number[][], colors: typeof COLORS) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === colors.explored || grid[i][j] === colors.path) {
        grid[i][j] = colors.empty
      }
    }
  }
}

const coordsToKey = (i: number, j: number): string => `${i}-${j}`

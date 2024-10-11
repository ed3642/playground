import { isInBounds } from '@/lib/simple-grid/utils'
import { Queue } from 'typescript-collections'
import { COLORS } from './legend'

interface IPathFindingAlgorithmProps {
  grid: number[][]
  colors: typeof COLORS
  directions: number[][]
}

interface IPathFindingAlgorithm {
  (props: IPathFindingAlgorithmProps): number[][]
}

export const runBFS: IPathFindingAlgorithm = ({ grid, colors, directions }) => {
  // locate source and destination
  const [source, dest] = locateSourceAndDest(grid, colors)
  clearPathRun(grid, colors)

  if (source.length === 0 || dest.length === 0) {
    // didn't find the needed nodes
    return grid
  }

  const queue = new Queue<number[]>() // [i, j]
  const parents: { [key: string]: number[] } = {}

  queue.enqueue(source)

  while (!queue.isEmpty()) {
    const [i, j] = queue.dequeue() as number[]

    for (const [di, dj] of directions) {
      const nI = i + di
      const nJ = j + dj
      if (isInBounds(nI, nJ, grid.length, grid[0].length)) {
        if (grid[nI][nJ] === colors.empty) {
          grid[nI][nJ] = colors.explored
          queue.enqueue([nI, nJ])
          parents[coordsToKey(nI, nJ)] = [i, j]
        } else if (grid[nI][nJ] === colors.dest) {
          // backtrack to find the shortest path
          parents[coordsToKey(nI, nJ)] = [i, j]
          return backtrackPath(grid, parents, source, dest)
        }
      }
    }
  }
  return grid
}

export const runDFS: IPathFindingAlgorithm = ({ grid, colors, directions }) => {
  // TODO: fix this
  console.log('DFS not implemented yet')
  return grid
  const [source, dest] = locateSourceAndDest(grid, colors)
  clearPathRun(grid, colors)

  if (source.length === 0 || dest.length === 0) {
    return grid
  }

  const parents: { [key: string]: number[] } = {}

  const dfs = (i: number, j: number): boolean => {
    if (grid[i][j] === colors.dest) return true

    grid[i][j] = colors.explored

    for (const [dI, dJ] of directions) {
      const nI = i + dI
      const nJ = j + dJ
      if (isInBounds(nI, nJ, grid.length, grid[0].length) && grid[nI][nJ] === colors.empty) {
        const found = dfs(nI, nJ)
        if (found) {
          parents[coordsToKey(nI, nJ)] = [i, j]
        }
        return found
      }
    }
    return false
  }

  if (dfs(source[0], source[1])) {
    return backtrackPath(grid, parents, source, dest)
  }
  return grid
}

export const runAStar: IPathFindingAlgorithm = ({ grid, colors, directions }) => {
  // Implement A* algorithm logic here
  return grid
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
    if (grid[i][j] !== COLORS.source) {
      grid[i][j] = COLORS.path
    }
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

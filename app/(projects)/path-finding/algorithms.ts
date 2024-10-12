import { isInBounds } from '@/lib/simple-grid/utils'
import { PriorityQueue, Queue } from 'typescript-collections'
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
          return backtrackPath(grid, parents, dest)
        }
      }
    }
  }
  return grid
}

export const runDFS: IPathFindingAlgorithm = ({ grid, colors, directions }) => {
  const [source, dest] = locateSourceAndDest(grid, colors)
  clearPathRun(grid, colors)

  if (source.length === 0 || dest.length === 0) {
    return grid
  }

  const dfs = (i: number, j: number): boolean => {
    if (grid[i][j] !== colors.source) {
      grid[i][j] = colors.explored
    }

    for (const [dI, dJ] of directions) {
      const nI = i + dI
      const nJ = j + dJ
      if (isInBounds(nI, nJ, grid.length, grid[0].length)) {
        if (grid[nI][nJ] === colors.empty) {
          const found = dfs(nI, nJ)
          if (found) {
            parents[coordsToKey(nI, nJ)] = [i, j]
            return true
          }
        } else if (grid[nI][nJ] === colors.dest) {
          parents[coordsToKey(nI, nJ)] = [i, j]
          return true
        }
      }
    }
    return false
  }

  const parents: { [key: string]: number[] } = {}

  if (dfs(source[0], source[1])) {
    return backtrackPath(grid, parents, dest)
  }
  return grid
}

export const runAStar: IPathFindingAlgorithm = ({ grid, colors, directions }) => {
  console.log('not implemented yet')
  return grid
  const [source, dest] = locateSourceAndDest(grid, colors)
  clearPathRun(grid, colors)

  const parents: { [key: string]: number[] } = {}
  const openSet = new PriorityQueue<{ key: string; fScore: number }>((a, b) => a.fScore - b.fScore)
  const gScore: { [key: string]: number } = {}
  const fScore: { [key: string]: number } = {}

  const sourceKey = coordsToKey(source[0], source[1])
  const destKey = coordsToKey(dest[0], dest[1])

  gScore[sourceKey] = 0
  fScore[sourceKey] = manhattanDistance(source[0], source[1], dest)
  openSet.enqueue({ key: sourceKey, fScore: fScore[sourceKey] })

  while (!openSet.isEmpty()) {
    const dequeued = openSet.dequeue()
    if (!dequeued) {
      break
    }
    const current = dequeued.key

    if (current === destKey) {
      return backtrackPath(grid, parents, dest)
    }

    const [currentI, currentJ] = keyToCoords(current)

    for (const [dI, dJ] of directions) {
      const nI = currentI + dI
      const nJ = currentJ + dJ
      if (!isInBounds(nI, nJ, grid.length, grid[0].length)) {
        continue
      }

      const neighborKey = coordsToKey(nI, nJ)
      const tentativeGScore = gScore[current] + 1

      if (tentativeGScore < (gScore[neighborKey] || Infinity)) {
        parents[neighborKey] = [currentI, currentJ]
        gScore[neighborKey] = tentativeGScore
        fScore[neighborKey] = gScore[neighborKey] + manhattanDistance(nI, nJ, dest)
        openSet.enqueue({ key: neighborKey, fScore: fScore[neighborKey] })
      }
    }
  }
  return grid
}

const backtrackPath = (
  grid: number[][],
  parents: { [key: string]: number[] },
  dest: number[]
): number[][] => {
  let curr = parents[coordsToKey(dest[0], dest[1])]
  while (grid[curr[0]][curr[1]] !== COLORS.source) {
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

// heuristic function for AStar
const manhattanDistance = (i: number, j: number, dest: number[]): number => {
  return Math.abs(i - dest[0]) + Math.abs(j - dest[1])
}
const coordsToKey = (i: number, j: number): string => `${i}-${j}`
const keyToCoords = (key: string): number[] => key.split('-').map(Number)

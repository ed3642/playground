import SimpleGrid from '@/components/simple-grid'
import { Button } from '@/components/ui/button'
import { useEffect, useMemo, useState } from 'react'

const NUM_ROWS = 20
const NUM_COLS = 20

const GameOfLife = () => {
  const initialGrid: number[][] = useMemo(() => new Array(NUM_ROWS), [])

  for (let i = 0; i < NUM_ROWS; i++) {
    initialGrid[i] = new Array(NUM_COLS).fill(0)
  }

  const [grid, setGrid] = useState(initialGrid)

  const toggleCell = (i: number, j: number) => {
    setGrid((grid) =>
      grid.map((row, row_i) =>
        row.map((cell, cell_i) =>
          row_i === i && cell_i === j ? (cell === 0 ? 1 : 0) : cell
        )
      )
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      toggleCell(0, 0)
      console.log('setting grid')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center my-2 space-x-2">
        <Button>Start</Button>
        <Button variant="secondary">Next</Button>
        <Button variant="destructive">Stop</Button>
      </div>
      <div className="mb-4">
        <SimpleGrid grid={grid} toggleCell={toggleCell} />
      </div>
    </div>
  )
}

export default GameOfLife

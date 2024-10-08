'use client'

import SimpleGrid from '@/components/simple-grid'

const initialGrid = Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => 0))

const toggleCell = (x: number, y: number) => {
  console.log(x, y)
}

const PathFinding: React.FC = () => {
  return (
    <>
      <SimpleGrid grid={initialGrid} toggleCell={toggleCell} cellSize={20} gap={2} />
    </>
  )
}

export default PathFinding

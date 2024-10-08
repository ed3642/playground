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

const initialGrid = Array.from({ length: 20 }, () => Array.from({ length: 20 }, () => 0))

const toggleCell = (x: number, y: number) => {
  console.log(x, y)
}

const PathFinding: React.FC = () => {
  const [algorithm, setAlgorithm] = useState('Djikstras')

  return (
    <div>
      <div className="flex flex-col items-center mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              {algorithm} <ChevronDown className="ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setAlgorithm('DFS')}>DFS</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setAlgorithm('BFS')}>BFS</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setAlgorithm('Djikstras')}>
              Djikstras
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setAlgorithm('SPFA')}>SPFA</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setAlgorithm('A*')}>A*</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <SimpleGrid grid={initialGrid} toggleCell={toggleCell} cellSize={20} gap={2} />
    </div>
  )
}

export default PathFinding

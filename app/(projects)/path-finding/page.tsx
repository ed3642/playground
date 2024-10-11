import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import PathFindingLoading from './loading'
import Legend from './legend'
import { Separator } from '@/components/ui/separator'

const PathFinding = dynamic(() => import('./path-finding'), {
  ssr: false,
  loading: () => <PathFindingLoading />,
})

const PathFindingPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full">
        <h1 className="md:max-w-screen-xl mx-auto text-5xl mt-5">Path Finding</h1>
        <div className="flex items-center justify-center w-full">
          <Suspense fallback={<PathFindingLoading />}>
            <PathFinding />
          </Suspense>
        </div>
      </div>
      <div className="container max-w-screen-xl">
        <div className="flex space-x-6">
          <Legend />
          <div className="flex-grow">
            <h2 className="text-xl mb-2">Algorithms</h2>
            <p>
              BFS (Breath First Search): Will get the shortest path but explores a lot of
              unnecessary locations. Like exploring in each direction equally. Implemented with a
              queue.
            </p>
            <p>
              DFS (Depth First Search): Might not get the shortest path and might also explore a lot
              more or a lot less unnecessary locations than BFS. Like picking a route and sticking
              to it until it runs out. Implemented with recursion.
            </p>
            <p>
              A* Search Algorithm: Will get the shortest path and with the right heuristic function
              will explore minimal locations. Like exploring with a compass. Implemented with a
              priority queue.
            </p>
          </div>
        </div>
        <Separator />
        <p>
          Some interesting single source shortest path algorithms on a homogeneous distance grid.
          Click on the cells to remove terrain and see the pathfinding algorithms in action.
        </p>
        <p>Note: no mobile support for this yet.</p>
      </div>
    </>
  )
}

export default PathFindingPage

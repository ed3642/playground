import PathFinding from './path-finding'

const PathFindingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="md:max-w-screen-xl mx-auto text-5xl mt-5 mb-2">Path Finding</h1>
      <div className="flex items-center justify-center w-full">
        <PathFinding />
      </div>
      <div className="mx-2">
        <p>
          Some interesting single source shortest path algorithms. Click on the squares to place
          obstacles and see the pathfinding algorithms in action.
        </p>
      </div>
    </div>
  )
}

export default PathFindingPage

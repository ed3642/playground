import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import GameOfLifeLoading from './loading'

// no ssr for game of life component
const GameOfLife = dynamic(() => import('./game-of-life'), {
  ssr: false,
  loading: () => <GameOfLifeLoading />, // Use the loading component
})

const GameOfLifePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="md:max-w-screen-xl mx-auto text-5xl mt-5">Game of Life</h1>
      <div className="flex items-center justify-center w-full">
        <Suspense fallback={<GameOfLifeLoading />}>
          <GameOfLife />
        </Suspense>
      </div>
      <div className="mx-2">
        <p>
          This is a simple implementation of Conway&apos;s game of life. Click on the squares and
          see what happens after you click start.
        </p>
        <p>The purpose of this was to test out state handling in Nextjs.</p>
        <p>
          It could have been made more efficient using canvas or a 2d library but the point was to
          make it with react states.
        </p>
      </div>
    </div>
  )
}

export default GameOfLifePage

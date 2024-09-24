'use client'

import GameOfLife from './game-of-life'

const GameOfLifePage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="md:max-w-screen-xl mx-auto text-5xl mt-5">Game of Life</h1>
      <div className="flex items-center justify-center w-full">
        <GameOfLife />
      </div>
      <p>
        This is a simple implementation of Conway&apos;s game of life. Click on
        the squares and see what happens after you click start.
      </p>
      <p>The purpose of this was to test out state handling in Nextjs.</p>
      <p>
        It could have been made more efficient using canvas or a 2d library but
        the point of making it was to use react states.
      </p>
    </div>
  )
}

export default GameOfLifePage

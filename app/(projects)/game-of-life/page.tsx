'use client'

import GameOfLife from './game-of-life'

const GameOfLifePage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="md:max-w-screen-xl mx-auto text-5xl">Game of Life</h1>
      <div className="flex items-center justify-center w-full">
        <GameOfLife />
      </div>
      <p>
        This is a simple implementation of Conway&apos;s game of life. Click on
        the squares and see what happens after you click start.
      </p>
    </div>
  )
}

export default GameOfLifePage

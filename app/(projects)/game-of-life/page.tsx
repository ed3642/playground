'use client'

import GameOfLife from './game-of-life'

const GameOfLifePage = () => {
  return (
    <div className="flex items-center">
      <h1 className="md:max-w-screen-xl">Game of Life</h1>
      <GameOfLife />
    </div>
  )
}

export default GameOfLifePage

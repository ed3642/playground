export const calculateGridDimensions = (
  cellSize: number,
  gapSize: number
): { numCols: number; cellSize: number } => {
  const viewportWidth: number = window.innerWidth
  const totalGapSize: number = gapSize * (Math.floor(viewportWidth / cellSize) - 1)
  const availableWidth: number = viewportWidth - totalGapSize
  const numCols: number = Math.floor(availableWidth / cellSize)
  return { numCols, cellSize }
}

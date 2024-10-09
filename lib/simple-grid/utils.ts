export const calculateGridDimensions = (
  cellSize: number,
  gapSize: number,
  viewWidth: number,
  viewHeight: number,
  minNumRows: number = 10
): { numCols: number; numRows: number } => {
  const totalGapSizeWidth: number = gapSize * (Math.floor(viewWidth / cellSize) - 1)
  const availableWidth: number = viewWidth - totalGapSizeWidth
  const numCols: number = Math.floor(availableWidth / cellSize) - 1

  const totalGapSizeHeight: number = gapSize * (Math.floor(viewHeight / cellSize) - 1)
  const availableHeight: number = viewHeight - totalGapSizeHeight
  const numRows: number = Math.max(Math.floor(availableHeight / cellSize), minNumRows)

  return { numCols, numRows }
}

export const getCellSize = (defaultSize: number, phoneSize: number): number => {
  const viewportWidth: number = window.innerWidth
  return viewportWidth < 768 ? phoneSize : defaultSize // use bigger cells on phone
}

export const isInBounds = (i: number, j: number, maxI: number, maxJ: number): boolean => {
  return i >= 0 && i < maxI && j >= 0 && j < maxJ
}
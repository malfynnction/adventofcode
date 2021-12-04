const fs = require('fs')
const inputToArray = require('../lib/input-to-array')

const input = inputToArray(fs.readFileSync('./input.txt')).map((row) =>
  row.split('')
)

const clone = (array) => JSON.parse(JSON.stringify(array))

const isOccupied = (seat) => seat === '#'
const isEmpty = (seat) => seat === 'L'

const printLayout = (state) =>
  console.log(state.map((row) => row.join('')).join('\n'))

const runGame = (sitDownThreshold, getUpThreshold, findRelevantSeats) => {
  let runAgain = true
  let currentState = clone(input)

  while (runAgain) {
    runAgain = false
    const newState = clone(currentState)

    for (let rowIndex = 0; rowIndex < currentState.length; rowIndex++) {
      const row = currentState[rowIndex]
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const seat = row[columnIndex]

        const occupiedAdjacentSeats = findRelevantSeats(
          rowIndex,
          columnIndex,
          currentState
        ).filter(isOccupied).length

        if (isEmpty(seat) && occupiedAdjacentSeats <= sitDownThreshold) {
          newState[rowIndex][columnIndex] = '#'
          runAgain = true
        } else if (
          isOccupied(seat) &&
          occupiedAdjacentSeats >= getUpThreshold
        ) {
          newState[rowIndex][columnIndex] = 'L'
          runAgain = true
        }
      }
    }
    currentState = clone(newState)
  }

  const occupiedCount = currentState.reduce(
    (count, row) => count + row.filter(isOccupied).length,
    0
  )

  console.log(occupiedCount)
}

// part 1
const getAdjacentSeats = (row, column, state) => {
  const result = []

  const hasSeatToTop = row != 0
  const hasSeatToBottom = row != input.length - 1
  const hasSeatToLeft = column != 0
  const hasSeatToRight = column != input[0].length - 1

  if (hasSeatToTop) {
    result.push(state[row - 1][column])
    if (hasSeatToLeft) {
      result.push(state[row - 1][column - 1])
    }
    if (hasSeatToRight) {
      result.push(state[row - 1][column + 1])
    }
  }
  if (hasSeatToBottom) {
    result.push(state[row + 1][column])
    if (hasSeatToLeft) {
      result.push(state[row + 1][column - 1])
    }
    if (hasSeatToRight) {
      result.push(state[row + 1][column + 1])
    }
  }
  if (hasSeatToLeft) {
    result.push(state[row][column - 1])
  }
  if (hasSeatToRight) {
    result.push(state[row][column + 1])
  }
  return result
}
runGame(0, 4, getAdjacentSeats)

// part 2
const getVisibleSeats = (row, column, state) => {
  const getFirstVisibleSeat = (rowAdd, columnAdd) => {
    let currentRow = row + rowAdd
    let currentColumn = column + columnAdd
    while (
      currentRow >= 0 &&
      currentRow < state.length &&
      currentColumn >= 0 &&
      currentColumn < state[0].length
    ) {
      const seat = state[currentRow][currentColumn]
      if (isOccupied(seat) || isEmpty(seat)) {
        return seat
      }
      currentRow += rowAdd
      currentColumn += columnAdd
    }
    return '.'
  }
  const result = [
    getFirstVisibleSeat(-1, -1), // top left
    getFirstVisibleSeat(-1, 0), // top
    getFirstVisibleSeat(-1, 1), // top right
    getFirstVisibleSeat(0, 1), // right
    getFirstVisibleSeat(1, 1), // bottom right
    getFirstVisibleSeat(1, 0), // bottom
    getFirstVisibleSeat(1, -1), // bottom left
    getFirstVisibleSeat(0, -1), // left
  ]
  return result.filter((seat) => seat != '.')
}
runGame(0, 5, getVisibleSeats)

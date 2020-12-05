const input = require('./input.json')

const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, i) => start + i)
}

const interpretBinary = (string, letterOne) => {
  return string
    .split('')
    .reverse()
    .reduce((number, letter, index) => {
      if (letter === letterOne) {
        return number
      }
      return number + 2 ** index
    }, 0)
}

const getSeatId = (pass) => {
  const rowInstructions = pass.slice(0, 7)
  const rowNumber = interpretBinary(rowInstructions, 'F')

  const columnInstructions = pass.slice(7)
  const columnNumber = interpretBinary(columnInstructions, 'L')

  return rowNumber * 8 + columnNumber
}

const allTakenIds = input.map(getSeatId)

// part 1
console.log(Math.max(...allTakenIds))

// part 2
const allPossibleIds = range(Math.min(...allTakenIds), Math.max(...allTakenIds))

console.log(
  allPossibleIds.find(
    (id) =>
      !allTakenIds.includes(id) &&
      allTakenIds.includes(id - 1) &&
      allTakenIds.includes(id + 1)
  )
)

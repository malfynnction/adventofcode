import fs from 'fs'
import inputToArray from '../../lib/input-to-array'
import { sum } from '../../lib/helpers'
import chunk from 'lodash.chunk'

type calledCounter = { [boardIndex: number]: number }[]

const input: string[] = inputToArray(fs.readFileSync('./input.txt'))

const calledNumbers = input[0].split(',').map(Number)
const boards: number[][][] = chunk(
  input.slice(1).map((line) => line.trim().split(/ +/g).map(Number)),
  5
)

const getScore = (boardIndex: number, lastCalledNumber: number) => {
  const uncalledNumbers = boards[boardIndex]
    .flat()
    .filter(
      (number) =>
        !calledNumbers
          .slice(0, calledNumbers.indexOf(lastCalledNumber) + 1)
          .includes(number)
    )
  return sum(uncalledNumbers) * lastCalledNumber
}

const emptyCounter = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
}
const calledRows: calledCounter = boards.map((_) => ({ ...emptyCounter }))
const calledColumns: calledCounter = boards.map((_) => ({ ...emptyCounter }))
let winningBoard: number
let winningScore: number
let losingBoard: number
let doneInNextRound = false

for (let calledNumber of calledNumbers) {
  boards.forEach((board, boardIndex) => {
    const calledRow = board.findIndex((row) => row.includes(calledNumber))

    if (calledRow > -1) {
      const calledColumn = board[calledRow].indexOf(calledNumber)

      calledRows[boardIndex][calledRow]++
      calledColumns[boardIndex][calledColumn]++
    }
  })

  // puzzle 1
  if (typeof winningBoard == 'undefined') {
    const winningRow = calledRows.findIndex((boardRows) =>
      Object.values(boardRows).some((rowCount) => rowCount >= 5)
    )
    const winningColumn = calledColumns.findIndex((boardColumns) =>
      Object.values(boardColumns).some((columnCount) => columnCount >= 5)
    )

    if (winningRow > -1) {
      winningBoard = winningRow
      winningScore = getScore(winningBoard, calledNumber)
    }

    if (winningColumn > -1) {
      winningBoard = winningColumn
      winningScore = getScore(winningBoard, calledNumber)
    }
  }

  // puzzle 2
  const unfinishedBoards = calledRows
    .map((_, i) => i)
    .filter((i) => {
      return (
        Object.values(calledRows[i]).every((count) => count < 5) &&
        Object.values(calledColumns[i]).every((count) => count < 5)
      )
    })

  console.log(
    `After calling ${calledNumber}, there are ${unfinishedBoards.length} / ${boards.length} unfinished.`
  )

  if (unfinishedBoards.length == 1) {
    losingBoard = unfinishedBoards[0]
    doneInNextRound = true
  }

  if (unfinishedBoards.length == 0 && doneInNextRound) {
    console.log(
      `losing board is ${losingBoard}, with a score of ${getScore(
        losingBoard,
        calledNumber
      )}`
    )
    break
  }
}

console.log(`winning board is ${winningBoard}, with a score of ${winningScore}`)

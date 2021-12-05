import fs from 'fs'
import inputToArray from '../../lib/input-to-array'

const input: string[] = inputToArray(fs.readFileSync('./input.txt'))

const getCoveredPoints = (line: string, ignoreDiagonals: boolean) => {
  const [a, b] = line.split(' -> ').map((point) => point.split(',').map(Number))
  const allPoints = []

  let xSorted = [a[0], b[0]].sort((a, b) => a - b)
  let ySorted = [a[1], b[1]].sort((a, b) => a - b)

  if (a[1] == b[1]) {
    // horizontal line
    for (let x = xSorted[0]; x <= xSorted[1]; x++) {
      allPoints.push([x, ySorted[0]].join(','))
    }
  } else if (a[0] == b[0]) {
    // vertical line
    for (let y = ySorted[0]; y <= ySorted[1]; y++) {
      allPoints.push([xSorted[0], y].join(','))
    }
  } else if (ignoreDiagonals) {
    return []
  } else {
    // diagonal line
    let x = a[0]
    let y = a[1]

    while (x != b[0] && y != b[1]) {
      allPoints.push([x, y].join(','))
      x += a[0] < b[0] ? 1 : -1
      y += a[1] < b[1] ? 1 : -1
    }
    allPoints.push([x, y].join(','))
  }

  return allPoints
}

const solvePuzzle = (options = { ignoreDiagonals: false }) => {
  const counter = input
    .map((line) => getCoveredPoints(line, options.ignoreDiagonals))
    .flat()
    .reduce<Record<string, number>>((acc, point) => {
      acc[point] = (acc[point] || 0) + 1
      return acc
    }, {})

  return Object.values(counter).filter((count) => count >= 2).length
}

console.log(`part 1: ${solvePuzzle({ ignoreDiagonals: true })}`)
console.log(`part 2: ${solvePuzzle()}`)

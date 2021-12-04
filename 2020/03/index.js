const fs = require('fs')

const input = fs.readFileSync('./input.txt').toString()
const rows = input.split('\n')

const getNextIndex = ([row, column], [rowAdd, columnAdd]) => [
  row + rowAdd,
  (column + columnAdd) % rows[0].length,
]

const slopes = [
  [1, 1],
  [1, 3],
  [1, 5],
  [1, 7],
  [2, 1],
]
let result = 1

for (let slope of slopes) {
  let index = [0, 0] // [row, column]
  let treeCount = 0

  while (index[0] < rows.length) {
    if (rows[index[0]][index[1]] === '#') {
      treeCount++
    }
    index = getNextIndex(index, slope)
  }
  console.log(`result for Right ${slope[1]} Down ${slope[0]}: ${treeCount}`)
  result *= treeCount
}

console.log('product of all: ', result)

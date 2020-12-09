const fs = require('fs')

const input = fs.readFileSync('./input.txt').toString().split('\n').map(Number)

const previousPoolSize = 25

const firstWrongIndex = input.findIndex((number, index) => {
  if (index < previousPoolSize) {
    return false
  }
  const previousPool = input.slice(index - previousPoolSize, index)

  return previousPool.every((i) => {
    return previousPool.every((j) => {
      return i + j !== number
    })
  })
})

// part 1
const wrongNumber = input[firstWrongIndex]
console.log(wrongNumber)

// part 2
const getRangeUntilOver = (index) => {
  let sum = 0
  const range = []
  while (sum < wrongNumber) {
    sum += input[index]
    range.push(input[index])
    index++
  }
  return range
}

let targetRange = []
for (let index of Object.keys(input)) {
  const range = getRangeUntilOver(index)
  if (
    range.length >= 2 &&
    range.reduce((sum, value) => (sum += value), 0) === wrongNumber
  ) {
    targetRange = range
    break
  }
}
console.log(Math.min(...targetRange) + Math.max(...targetRange))

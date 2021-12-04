import fs from 'fs'
import inputToArray from '../../lib/input-to-array'

const input = inputToArray(fs.readFileSync('./input.txt')).map(
  (string: string) => parseInt(string)
)

let count = 0
let previousSum = 0

for (let i = 1; i < input.length - 2; i++) {
  let currentSum = input[i] + input[i + 1] + input[i + 2]
  if (currentSum > previousSum) {
    count++
  }
  previousSum = currentSum
}

console.log(count)

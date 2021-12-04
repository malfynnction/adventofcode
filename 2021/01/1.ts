import fs from 'fs'
import inputToArray from '../../lib/input-to-array'

const input = inputToArray(fs.readFileSync('./input.txt')).map(
  (string: string) => parseInt(string)
)

let count = 0

for (let i = 1; i < input.length; i++) {
  if (input[i] > input[i - 1]) {
    count++
  }
}

console.log(count)

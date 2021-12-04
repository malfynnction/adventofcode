import fs from 'fs'
import inputToArray from '../../lib/input-to-array'

type SubmarineCommand = 'forward' | 'up' | 'down'

const input = inputToArray(fs.readFileSync('./input.txt')).map(
  (string: string) => string.split(' ')
)

let x = 0
let y = 0

input.forEach(([command, value]: [SubmarineCommand, string]) => {
  switch (command) {
    case 'forward':
      x += parseInt(value)
      break
    case 'up':
      y += parseInt(value)
      break
    case 'down':
      y -= parseInt(value)
      break
  }
})

console.log(x * y)

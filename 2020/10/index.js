const fs = require('fs')
const inputToArray = require('../lib/input-to-array')

const input = inputToArray(fs.readFileSync('./input.txt'))

const outletJoltage = 0
const deviceJoltage = Math.max(...input) + 3
input.push(outletJoltage, deviceJoltage)

const sortedInput = input.map(Number).sort((a, b) => a - b)

// part 1
const differences = sortedInput.reduce((counts, element, index) => {
  const difference = element - (sortedInput[index - 1] || 0)
  return { ...counts, [difference]: (counts[difference] || 0) + 1 }
}, {})

console.log(differences['1'] * differences['3'])

// part 2
const possibilitiesBySequenceLength = [0, 1, 1, 2, 4, 7, 11] // calculated this by hand

const consecutiveGroups = []
let group = []

sortedInput.forEach((joltage) => {
  if (joltage - group[group.length - 1] > 1) {
    consecutiveGroups.push(group)
    group = []
  }
  group.push(joltage)
})

const possibilities = consecutiveGroups.reduce(
  (sum, group) => sum * possibilitiesBySequenceLength[group.length],
  1
)

console.log(possibilities)

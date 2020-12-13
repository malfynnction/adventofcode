const fs = require('fs')
const inputToArray = require('../lib/input-to-array')
const { product } = require('../lib/helpers.js')

const [startTime, busSequence] = inputToArray(fs.readFileSync('input.txt'))
const allBusses = busSequence.split(',')
const runningBusses = allBusses.filter((bus) => bus !== 'x').map(Number)

const canTakeBus = (currentTime, bus) => currentTime % Number(bus) === 0

// part 1
let currentTime = startTime

while (!runningBusses.some((bus) => canTakeBus(currentTime, bus))) {
  currentTime++
}

console.log(
  runningBusses.find((bus) => canTakeBus(currentTime, bus)) *
    (currentTime - startTime)
)

// part 2
const getNextDeparture = (currentTime, bus) => {
  while (!canTakeBus(currentTime, bus)) {
    currentTime++
  }
  return currentTime
}

let interval = runningBusses[0]
let incorrectIndex = 1
currentTime = getNextDeparture(1000, interval)

while (true) {
  const firstUnmetBus = allBusses.find(
    (bus, i) => bus != 'x' && !canTakeBus(currentTime + i, bus)
  )
  if (typeof firstUnmetBus === 'undefined') {
    break
  }

  const newIncorrectIndex = allBusses.indexOf(firstUnmetBus)

  if (newIncorrectIndex !== incorrectIndex) {
    interval = product(
      allBusses
        .slice(0, newIncorrectIndex)
        .filter((bus) => bus !== 'x')
        .map(Number)
    )
    incorrectIndex = newIncorrectIndex
  }
  currentTime += interval
}
console.log(currentTime)

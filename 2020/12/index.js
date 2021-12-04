const fs = require('fs')
const inputToArray = require('../lib/input-to-array')

const input = inputToArray(
  fs.readFileSync('./input.txt')
).map((instruction) => [instruction.slice(0, 1), Number(instruction.slice(1))])

const possibleDirections = ['E', 'S', 'W', 'N']
let facing, shipPosition, waypointPosition

const restart = () => {
  facing = 'E'
  shipPosition = [0, 0] // [east, north]
  waypointPosition = [10, 1] // [east, north]
}

const moveInDirection = (startingPosition, direction, amount) => {
  switch (direction) {
    case 'N':
      startingPosition[1] += amount
      break
    case 'E':
      startingPosition[0] += amount
      break
    case 'S':
      startingPosition[1] -= amount
      break
    case 'W':
      startingPosition[0] -= amount
      break
  }
}

// part 1
restart()

input.forEach(([action, amount]) => {
  if (action === 'L' || action === 'R') {
    const turnAmount = amount / 90
    const directions =
      action === 'R' ? possibleDirections : [...possibleDirections].reverse()
    const oldFacingIndex = directions.indexOf(facing)
    const newfacingIndex =
      (oldFacingIndex + turnAmount) % possibleDirections.length
    facing = directions[newfacingIndex]
  } else if (action === 'F') {
    moveInDirection(shipPosition, facing, amount)
  } else {
    moveInDirection(shipPosition, action, amount)
  }
})

console.log(Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]))

// part 2
restart()

input.forEach(([action, amount]) => {
  if (action === 'L') {
    const turnAmount = amount / 90
    for (let i = 0; i < turnAmount; i++) {
      const newEast = -waypointPosition[1]
      const newNorth = waypointPosition[0]
      waypointPosition = [newEast, newNorth]
    }
  } else if (action === 'R') {
    const turnAmount = amount / 90
    for (let i = 0; i < turnAmount; i++) {
      const newEast = waypointPosition[1]
      const newNorth = -waypointPosition[0]
      waypointPosition = [newEast, newNorth]
    }
  } else if (action === 'F') {
    moveInDirection(shipPosition, 'E', waypointPosition[0] * amount)
    moveInDirection(shipPosition, 'N', waypointPosition[1] * amount)
  } else {
    moveInDirection(waypointPosition, action, amount)
  }
})
console.log(Math.abs(shipPosition[0]) + Math.abs(shipPosition[1]))

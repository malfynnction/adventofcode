import fs from 'fs'
import inputToArray from '../../lib/input-to-array'
import { average } from '../../lib/helpers'

const input: number[][] = inputToArray(fs.readFileSync('./input.txt')).map(
  (string: string) => string.split('').map((bit: string) => parseInt(bit))
)

const numbersWithMostCommonBitForPosition = (
  array: number[][],
  position: number
) => {
  const mean: number = average(array.map((line) => line[position]))
  const mostCommon: number = Math.round(mean)
  return array.filter((line) => line[position] === mostCommon)
}

let oxygenRating = input
let CO2Rating = input

let iteration = 0
while (iteration < input[0].length) {
  if (oxygenRating.length > 1) {
    oxygenRating = numbersWithMostCommonBitForPosition(oxygenRating, iteration)
  }

  if (CO2Rating.length > 1) {
    const mostCommon = numbersWithMostCommonBitForPosition(CO2Rating, iteration)
    CO2Rating = CO2Rating.filter((line) => !mostCommon.includes(line))
  }

  iteration++
}

const oxygenRatingDecimal = parseInt(oxygenRating[0].join(''), 2)
const CO2RatingDecimal = parseInt(CO2Rating[0].join(''), 2)

console.log(oxygenRatingDecimal * CO2RatingDecimal)

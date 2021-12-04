import fs from 'fs'
import inputToArray from '../../lib/input-to-array'
import { average } from '../../lib/helpers'

const input = inputToArray(fs.readFileSync('./input.txt')).map(
  (string: string) => string.split('').map((bit: string) => parseInt(bit))
)

let mostCommon: number[] = []

input[0].forEach((_: number, position: number) => {
  const mean: number = average(input.map((line: number[]) => line[position]))
  mostCommon[position] = Math.round(mean)
})

const leastCommon = mostCommon.map((bit: number) => +!bit)

const mostCommonDecimal = parseInt(mostCommon.join(''), 2)
const leastCommonDecimal = parseInt(leastCommon.join(''), 2)

console.log(mostCommonDecimal * leastCommonDecimal)

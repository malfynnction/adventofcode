const fs = require('fs')

const passwordValid1 = (line) => {
  const parts = line.split(' ')

  const [min, max] = parts[0].split('-')
  const letter = parts[1][0]
  const password = parts[2]

  const amount = password.split('').filter((l) => l === letter).length

  return amount >= Number(min) && amount <= Number(max)
}

const passwordValid2 = (line) => {
  const parts = line.split(' ')

  const [firstIndex, secondIndex] = parts[0].split('-')
  const letter = parts[1][0]
  const password = parts[2]

  const firstIndexMatch = password[firstIndex - 1] === letter
  const secondIndexMatch = password[secondIndex - 1] === letter

  return firstIndexMatch ? !secondIndexMatch : secondIndexMatch
}

const input = fs.readFileSync('./input.txt')
let count = 0
console.log(input.toString().split('\n').length)
input
  .toString()
  .split('\n')
  .forEach((line) => {
    if (passwordValid2(line)) {
      count++
    }
  })
console.log(count)

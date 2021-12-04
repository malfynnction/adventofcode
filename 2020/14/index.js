const fs = require('fs')
const inputToArray = require('../lib/input-to-array')
const { sum } = require('../lib/helpers')

const instructions = inputToArray(
  fs.readFileSync('input.txt')
).map((instruction) => instruction.split(' = '))

let storage1 = {}
let storage2 = {}
let mask = ''
const maskLength = 36

numberToBinaryArray = (number, length) => {
  const array = number.toString(2).split('')
  while (array.length < length) {
    array.unshift(0)
  }
  return array
}

binaryArrayToNumber = (array) => {
  return parseInt(array.join(''), 2)
}

// part 1
const applyMask1 = (mask, value) => {
  let valueAfterMask = numberToBinaryArray(value, maskLength)

  mask.split('').forEach((maskBit, index) => {
    if (maskBit !== 'X') {
      valueAfterMask[index] = maskBit
    }
  })

  return binaryArrayToNumber(valueAfterMask)
}

// part 2
const applyMask2 = (mask, value) => {
  const beforeMask = numberToBinaryArray(value, maskLength)

  let result = [beforeMask]

  mask.split('').forEach((maskBit, index) => {
    if (maskBit === '1') {
      result = result.map((address) => {
        address[index] = 1
        return address
      })
    }
    if (maskBit === 'X') {
      result = result.flatMap((address) => {
        const address0 = [...address]
        address0[index] = 0
        const address1 = [...address]
        address1[index] = 1
        return [address0, address1]
      })
    }
  })

  return result
}

for (let [operation, value] of instructions) {
  if (operation.startsWith('mask')) {
    mask = value
    continue
  }

  const address = Number(operation.replace('mem[', '').replace(']', ''))

  // part 1
  storage1[address] = applyMask1(mask, Number(value))
  // part 2
  for (let maskedAddress of applyMask2(mask, address)) {
    storage2[maskedAddress] = value
  }
}

console.log(sum(Object.values(storage1)))
console.log(sum(Object.values(storage2)))

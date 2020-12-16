const fs = require('fs')
const { sum, product } = require('../lib/helpers')

const input = fs.readFileSync('input.txt').toString()
const [rulesInput, myTicketInput, nearbyTicketInput] = input.split('\n\n')

const myTicket = myTicketInput.split('\n')[1].split(',').map(Number)
const nearbyTickets = nearbyTicketInput
  .split('\n')
  .slice(1)
  .filter((ticket) => ticket.length > 0)
  .map((ticket) => ticket.split(',').map(Number))
const rules = rulesInput.split('\n').reduce((acc, rule) => {
  const [field, valuesString] = rule.split(': ')
  const ranges = valuesString.split(' or ')
  acc[field] = {
    rule: (v) =>
      ranges.some((range) => {
        const [min, max] = range.split('-')
        return v >= Number(min) && v <= Number(max)
      }),
  }

  return acc
}, {})

const getInvalidValues = (ticket) =>
  ticket.filter(
    (value) => !Object.values(rules).some(({ rule }) => !!rule(value))
  )

// part 1
let scanningError = 0
nearbyTickets.forEach((ticket) => {
  scanningError += sum(getInvalidValues(ticket))
})
console.log(scanningError)

// part 2
const validTickets = nearbyTickets.filter(
  (ticket) => getInvalidValues(ticket).length === 0
)

Object.keys(rules).forEach((key) => {
  const { rule } = rules[key]
  const possibleIndices = Object.keys(validTickets[0]).filter((index) =>
    validTickets.every((ticket) => !!rule(ticket[index]))
  )
  rules[key].possibleIndices = possibleIndices
})

let recentlyUpdated = true
while (recentlyUpdated) {
  recentlyUpdated = false
  Object.keys(rules).forEach((key) => {
    const rule = rules[key]
    const stillPossibleIndices = rule.possibleIndices.filter(
      (index) =>
        !Object.values(rules).some(
          ({ definiteIndex }) => index === definiteIndex
        )
    )
    if (
      typeof rule.definiteIndex === 'undefined' &&
      stillPossibleIndices.length === 1
    ) {
      recentlyUpdated = true
      rules[key].definiteIndex = stillPossibleIndices[0]
    }
  })
}
console.log(
  product(
    Object.keys(rules)
      .filter((key) => key.startsWith('departure'))
      .map((key) => {
        const index = Number(rules[key].definiteIndex)
        return myTicket[index]
      })
  )
)

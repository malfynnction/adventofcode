const fs = require('fs')

const input = fs.readFileSync('./input.txt').toString()

const removeTrailingWhitespace = (string) => string.replace(/\s$/, '')

const parsedInput = input.split('\n').reduce((rules, line) => {
  if (line.length === 0) {
    return rules
  }
  const [outer, inner] = line.split('bags contain')
  if (inner.includes('no other')) {
    rules[removeTrailingWhitespace(outer)] = {}
    return rules
  }
  structuredRule = inner.split(/bags?/).reduce((innerBags, part) => {
    const amount = part.match(/\d+/)
    if (!amount) {
      return innerBags
    }
    const color = part.match(/[A-z][A-z|\s]*[A-z]/)[0]
    innerBags[removeTrailingWhitespace(color)] = Number(amount[0])
    return innerBags
  }, {})
  rules[removeTrailingWhitespace(outer)] = structuredRule
  return rules
}, {})

fs.writeFileSync('./parsed-input.json', JSON.stringify(parsedInput))

const fs = require('fs')

const input = fs.readFileSync('./input.txt').toString()
const passports = input.split('\n\n').map((passport) => {
  const keyValues = passport.split(/\n|\s/g)
  return keyValues.reduce((acc, keyValue) => {
    const [key, value] = keyValue.split(':')
    return { ...acc, [key]: value }
  }, {})
})

const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

const hasAllRequiredKeys = (passport) =>
  requiredKeys.every((requiredKey) =>
    Object.keys(passport).includes(requiredKey)
  )

// part 1
const hasAllRequiredKeysCount = passports.filter((passport) =>
  hasAllRequiredKeys(passport)
).length
console.log(hasAllRequiredKeysCount)

// part 2

const rules = {
  byr: (v) => Number(v) >= 1920 && Number(v) <= 2002,
  iyr: (v) => Number(v) >= 2010 && Number(v) <= 2020,
  eyr: (v) => Number(v) >= 2020 && Number(v) <= 2030,
  hgt: (v) => {
    if (!/^\d+(cm|in)$/g.test(v)) {
      return false
    }
    const number = Number(v.slice(0, v.length - 2))
    if (v.includes('cm')) {
      return number >= 150 && number <= 193
    }
    return number >= 59 && number <= 76
  },
  hcl: (v) => /^#[\d|a-f]{6}$/g.test(v),
  ecl: (v) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: (v) => /^\d{9}$/g.test(v),
  cid: () => true,
}

const validCount = passports.filter(
  (passport) =>
    hasAllRequiredKeys(passport) &&
    Object.keys(passport).every((key) => rules[key](passport[key]))
).length
console.log(validCount)

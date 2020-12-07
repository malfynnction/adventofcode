const input = require('./parsed-input.json')

const containsHowMany = (target) => {
  const directInners = input[target]
  return Object.keys(directInners).reduce(
    (count, color) => count + directInners[color] * containsHowMany(color),
    1
  )
}

console.log(containsHowMany('shiny gold') - 1)

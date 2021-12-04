const input = require('./parsed-input.json')

const eventuallyIncludes = (outer, target) => {
  const directInners = Object.keys(input[outer])
  if (directInners.length === 0) {
    return false
  }
  if (directInners.includes(target)) {
    return true
  }
  return directInners.some((inner) => eventuallyIncludes(inner, target))
}

const count = Object.keys(input).filter((outer) =>
  eventuallyIncludes(outer, 'shiny gold')
).length

console.log(count)

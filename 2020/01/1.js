const input = require('./input.json')

for (let i of input) {
  const j = input.find((num) => i + num === 2020)
  if (j) {
    console.log(i * j)
    return
  }
}

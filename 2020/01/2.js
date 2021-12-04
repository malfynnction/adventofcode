const input = require('./input.json')

for (let i of input) {
  for (let k of input) {
    const j = input.find((num) => i + k + num === 2020)
    if (j) {
      console.log(i * j * k)
      return
    }
  }
}

const sum = (array) => array.reduce((sum, value) => sum + Number(value), 0)
const product = (array) =>
  array.reduce((product, value) => product * Number(value), 1)
const average = (array) => sum(array) / array.length

module.exports = {
  sum,
  product,
  average,
}

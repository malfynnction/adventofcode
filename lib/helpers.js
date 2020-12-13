module.exports = {
  sum: (array) => array.reduce((sum, value) => sum + value, 0),
  product: (array) => array.reduce((product, value) => product * value, 1),
}

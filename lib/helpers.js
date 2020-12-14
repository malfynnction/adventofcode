module.exports = {
  sum: (array) => array.reduce((sum, value) => sum + Number(value), 0),
  product: (array) =>
    array.reduce((product, value) => product * Number(value), 1),
}

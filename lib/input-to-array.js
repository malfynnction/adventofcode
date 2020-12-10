module.exports = (buffer) => {
  return buffer
    .toString()
    .split('\n')
    .filter((e) => e.length > 0)
}

const input = [7, 12, 1, 0, 16, 2]

const roundsPartOne = 2020
const roundsPartTwo = 30000000

const lastSeenAt = {}
let previousNumber
let nextNumber

input.forEach((number, index) => {
  lastSeenAt[number] = index
  previousNumber = number
})

for (
  let currentIndex = input.length;
  currentIndex < Math.max(roundsPartOne, roundsPartTwo);
  currentIndex++
) {
  if (typeof lastSeenAt[previousNumber] === 'undefined') {
    nextNumber = 0
  } else {
    const lastPreviousIndex = lastSeenAt[previousNumber]

    nextNumber = currentIndex - 1 - lastPreviousIndex
  }
  lastSeenAt[previousNumber] = currentIndex - 1
  previousNumber = nextNumber
  if (currentIndex === roundsPartOne - 1) {
    console.log(nextNumber)
  }
  if (currentIndex === roundsPartTwo - 1) {
    console.log(nextNumber)
  }
}

const fs = require('fs')

const input = fs.readFileSync('./input.txt').toString()
const instructionsArray = input
  .split('\n')
  .filter((instruction) => instruction.length > 0) // remove newline at end of file

const runCode = (instructions) => {
  const visitedIndices = []
  let accumulator = 0
  let instructionIndex = 0
  const terminationIndex = instructions.length

  while (
    !visitedIndices.includes(instructionIndex) &&
    instructionIndex < terminationIndex
  ) {
    const instruction = instructions[instructionIndex]
    visitedIndices.push(instructionIndex)

    const [operation, amount] = instruction.split(' ')
    const number = Number(amount)

    if (operation === 'nop') {
      instructionIndex++
    } else if (operation === 'acc') {
      accumulator += number
      instructionIndex++
    } else if (operation === 'jmp') {
      instructionIndex += number
    }
  }

  return { accumulator, success: instructionIndex >= terminationIndex }
}

// part 1
console.log(runCode(instructionsArray).accumulator)

// part 2
instructionsArray.forEach((instruction, index) => {
  if (instruction.includes('acc')) {
    return
  }

  const tryInstructions = [...instructionsArray]

  if (instruction.includes('jmp')) {
    tryInstructions[index] = instruction.replace('jmp', 'nop')
  } else if (instruction.includes('nop')) {
    tryInstructions[index] = instruction.replace('nop', 'jmp')
  }

  const result = runCode(tryInstructions)

  if (result.success) {
    console.log(result.accumulator)
  }
})

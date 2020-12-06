const fs = require('fs')

const input = fs.readFileSync('./input.txt').toString()

const groups = input.split('\n\n')

// part 1
console.log(
  groups.reduce((count, group) => {
    const uniqueAnswers = [...new Set(group.replace(/\n/g, '').split(''))]
    return count + uniqueAnswers.length
  }, 0)
)

// part 2
console.log(
  groups.reduce((count, group) => {
    const answersPerPerson = group
      .split('\n')
      .filter((answer) => answer.length > 0)
    const commonAnswers = answersPerPerson[0]
      .split('')
      .filter((answer) =>
        answersPerPerson.every((personAnswer) => personAnswer.includes(answer))
      )
    return count + commonAnswers.length
  }, 0)
)

const fs = require('fs')

const blanks = [' ', '\t', '\n', '\r']
const symbolsTable = []

/* ABRE O ARQUIVO QUE SERÁ ANALISADO */
const openFile = () => {

  // Pega o TERCEIRO parâmetro da linha de comando
  const filename = process.argv[2]

  // Se houver o terceiro parâmetro
  if (filename) {
    try {
      const fileContent = fs.readFileSync(filename, 'utf-8')
      return fileContent
    }
    catch (error) {
      console.error(error)
      process.exit(-1)
    }
  }
  else {
    console.log('Usage: node lexer.js <filename>')
    console.log('No filename provided.')
    process.exit(-1)    // Termina o script com erro
  }
}

const terminate = finalState => {
  if (!blanks.includes(char)) lexeme += char
  state = finalState
  switch (finalState) {
    case 6.1: //plus
      symbolsTable.push({
        lexeme,
        token: 'plus'
      })
      break
  }

  switch (finalState) {
    case 6.2: //minus
      symbolsTable.push({
        lexeme,
        token: 'minus'
      })
      break
  }

  switch (finalState) {
    case 6.3: //times
      symbolsTable.push({
        lexeme,
        token: 'times'
      })
      break
  }

  switch (finalState) {
    case 6.4: //div
      symbolsTable.push({
        lexeme,
        token: 'div'
      })
      break
  }

  switch (finalState) {
    case 6.5: //lparen
      symbolsTable.push({
        lexeme,
        token: 'lparen'
      })
      break
  }

  switch (finalState) {
    case 6.6: //rparen
      symbolsTable.push({
        lexeme,
        token: 'rparen'
      })
      break
  }

  switch (finalState) {
    case 6.7: //keyword
      symbolsTable.push({
        lexeme,
        token: 'keyword',
        value: lexame
      })
      break
  }

  switch (finalState) {
    case 6.8: //identifier
      symbolsTable.push({
        lexeme,
        token: 'identifier',
        value: lexame
      })
      break
  }
  switch (finalState) {
    case 6.9: //number
      symbolsTable.push({
        lexeme,
        token: 'number',
        value: lexame
      })
      break
  }

  switch (finalState) {
    case 6.10: //assing
      symbolsTable.push({
        lexeme,
        token: 'assing'
      })
      break
  }

  state = 0
  lexeme = ''
}

const displayError = () => {
  console.error(`ERROR: unexpected char ${char} at ${pos} (state ${state})`)
  process.exit(1)
}

const analyze = source => {
  let state = 0

  // Percorre todo o código-fonte, caractere a caractere
  for (let pos = 0; pos < source.length; pos++) {

    // Lê um caractere do código-fonte
    const char = source.charAt(pos)

    switch (state) {
      case 0:

        if (char === 'r') advanceTo(1)
        else if (char === 'w') advanceTo(7)
        else if (char.match(/0-9/)) advanceTo(13)
        else if (char === '.') advanceTo(14)
        else if (char === ':') advanceTo(17)
        else if (char.match(/a-zA-Z/)) advanceTo(5)
        else if (char === '+') advanceTo(6.1)
        else if (char === '-') advanceTo(6.2)
        else if (char === '*') advanceTo(6.3)
        else if (char === '/') advanceTo(6.4)
        else if (char === '(') advanceTo(6.5)
        else if (char === ')') advanceTo(6.6)

        else if (blanks.includes(char)) continue

        else displayError()

        break
      case 1:
        if (char === 'e') advanceTo(2)
        else if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else displayError()
        break
      case 2:
        if (char === 'a') advanceTo(3)
        else if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else displayError()
        break
      case 3:
        if (char === 'd') advanceTo(4)
        else if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else displayError()
        break

      case 4:
        if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else if (blanks.includes(char)) terminate(6.7)
        else displayError()
        break

      case 5:
        if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else if (blanks.includes(char)) terminate(6.8)
        else displayError()
        break
      case 7:
        if (char === 'r') advanceTo(8)
        else if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else if (blanks.includes(char)) terminate(6.8)
        else displayError()
        break
      case 8:
        if (char === 'i') advanceTo(8)
        else if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else if (blanks.includes(char)) terminate(6.8)
        else displayError()
        break
      case 9:
        if (char === 't') advanceTo(8)
        else if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else if (blanks.includes(char)) terminate(6.8)
        else displayError()
        break
      case 10:
        if (char === 'e') advanceTo(8)
        else if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else if (blanks.includes(char)) terminate(6.8)
        else displayError()
        break
      case 11:
        if (char.match(/a-zA-Z0-9/)) advanceTo(5)
        else if (blanks.includes(char)) terminate(6.7)
        else displayError()
        break
      case 13:
        if (char.match(/0-9/)) advanceTo(13)
        else if (char === '.') advanceTo(14)
        else if (blanks.includes(char)) terminate(6.9)
        else displayError()
        break
      case 14:
        if (char.match(/0-9/)) advanceTo(14)
        else if (blanks.includes(char)) terminate(6.9)
        else displayError()
        break
      case 17:
        if (char === '=') advanceTo(6.10)
        else displayError()
        break
    }
  }
  console.log('------------------------simbolos-----------------------------')
  console.log(symbolsTable)
}

const source = openFile()
analyze(source)
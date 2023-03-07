const fs = require('fs')

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const blanks = [' ', '\t', '\n', '\r']
const symbolsTable = []

/* ABRE O ARQUIVO QUE SERÁ ANALISADO */
const openFile = () => {

  // Pega o TERCEIRO parâmetro da linha de comando
  const filename = process.argv[2]

  // Se houver o terceiro parâmetro
  if(filename) {
    try {
      const fileContent = fs.readFileSync(filename, 'utf-8')
      return fileContent
    }
    catch(error) {
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
  if(! blanks.includes(char)) lexeme += char 
  state = finalState
  switch(finalState){
      case 6.1: //plus
      symbolsTable.append({
          lexeme,
          token: 'plus'
      })
      break
  }

  switch(finalState){
      case 6.2: //minus
      symbolsTable.append({
          lexeme,
          token: 'minus'
      })
      break
  }

  switch(finalState){
      case 6.3: //times
      symbolsTable.append({
          lexeme,
          token: 'times'
      })
      break
  }

  switch(finalState){
      case 6.4: //div
      symbolsTable.append({
          lexeme,
          token: 'div'
      })
      break
  }

  switch(finalState){
      case 6.5: //lparen
      symbolsTable.append({
          lexeme,
          token: 'lparen'
      })
      break
  }

  switch(finalState){
      case 6.6: //rparen
      symbolsTable.append({
          lexeme,
          token: 'rparen'
      })
      break
  }

  switch(finalState){
      case 6.7: //rparen
      symbolsTable.append({
          lexeme,
          token: 'keyword',
          value: lexame
      })
      break
  }

  switch(finalState){
      case 6.8: //rparen
      symbolsTable.append({
          lexeme,
          token: 'identifier',
          value: lexame
      })
      break
  }

  state = 0
  lexeme = ''
}

const analyze = source => {
  let state = 0

  // Percorre todo o código-fonte, caractere a caractere
  for(let pos = 0; pos < source.length; pos++) {

    // Lê um caractere do código-fonte
    const char = source.charAt(pos)

    switch(state) {
      case 0:
        
        if (char ==='r') advanceTo(1)
        else if (char === 'w') advanceTo(7)
        else if (digits.includes(char)) advanceTo(13)
        else if (char === '.') advanceTo(15)
        else if (char === ':') advanceTo(17)
        else if (char.match(/a-zA-Z/)) advanceTo(5)
        else if (char === '+') advanceTo(6.1)
        else if (char === '-') advanceTo(6.2)
        else if (char === '*') advanceTo(6.3)
        else if (char === '/') advanceTo(6.4)
        else if (char === '(') advanceTo(6.5)
        else if (char === ')') advanceTo(6.6)

        else if (blanks.includes(char)) continue

            else console.error(`ERROR: unexpected char ${char} at ${pos}`)

            break
        case 1:
            if(char === 'e') advanceTo(2)
            else if (char.match(/a-zA-Z0-9/)) advanceTo(5) 
            else console.error(`ERROR: unexpected char ${char} at ${pos}`)
            break 
        case 2:
            if(char === 'a') advanceTo(3)
            else if (char.match(/a-zA-Z0-9/)) advanceTo(5) 
            else console.error(`ERROR: unexpected char ${char} at ${pos}`)
            break 
        case 3:
            if(char === 'd') advanceTo(4)
            else if (char.match(/a-zA-Z0-9/)) advanceTo(5) 
            else console.error(`ERROR: unexpected char ${char} at ${pos}`)
            break

        case 4:
            if(char.match(/a-zA-Z0-9/)) advanceTo(5)
            else if (blanks.includes(char)) terminate(6.7) 
            else console.error(`ERROR: unexpected char ${char} at ${pos}`)
            break

        case 5:
            if(char.match(/a-zA-Z0-9/)) advanceTo(5)
            else if (blanks.includes(char)) terminate(6.8) 
            else console.error(`ERROR: unexpected char ${char} at ${pos}`)
            break
    }
  }
}

const source = openFile()
analyze(source)
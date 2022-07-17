const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
    const notes = await getNotes()

      const note = {
          title,
          id: Date.now().toString()
      }
      notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green('Note was added!'))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: "utf-8"})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgGreen.inverse('Here is the list of notes:'))
    notes.forEach((note) => {
        console.log(chalk.blue(`${note.id} ${note.title}`))
    })
}

async function removeNote(id) {
    const notes = await getNotes()

    const indexOfNote = notes.findIndex(note => note.id === id)
    notes.splice(indexOfNote, 1)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.red('Note removed!'))
}

module.exports = {
    addNote, printNotes, removeNote
}
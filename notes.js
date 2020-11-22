const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

// ----------------ADD NOTE FUNCTIONALITY---------------------------

// Adding the note contents
const addNote = (title, body) => {
    const notes = loadNotes()

    // debugger;

    // Checking for Duplicate notes
    // const duplicateNotes = notes.filter((note) => {
    //     return note.title === title
    // })
    const duplicateNote = notes.find((note) => {
        return note.title === title
    })

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.black.bgGreen('New Note added successfully!'));            
    }
    else {
        console.log(chalk.black.bgRed('Note title taken!'));
    }

}


// Saving the notes to the file 
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// Loading the existing notes (if any) from the file, 
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);       
    } catch (error) {
        return []
    }
}


// ----------------------------REMOVE NOTE FUNCTIONALITY---------------------------

const removeNote = (title) => {
    // console.log('Note deleted successfully -->', title);
    const notes = loadNotes();   
    // deleteNote(notes)
    const notesToKeep = notes.filter((note) => {
        return note.title !== title
    })
    
    if(notes.length > notesToKeep.length){
        console.log(chalk.black.bgGreen('Note deleted successfully!'));
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.black.bgRed('No note deleted!'));
    }
}
 

//----------------------LISTING ALL THE NOTES FUNCTIONALITY----------------------------//

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.black.bgWhite('List of all the notes:-'));
    notes.forEach((note) => {
        console.log('Note Title-> ',note.title);
    })
}


//----------------------READING A NOTE FUNCTIONALITY------------------------- //

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.black.bgWhite(note.title));
        console.log(note.body);
    }
    else{
        console.log(chalk.red('Note not found!'));
    }
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}
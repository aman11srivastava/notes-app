const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')
const notes = require('./notes')
const { argv, title } = require('process')


// Customise yargs version
// yargs.version('1.1.0')

// Add notes

yargs.command({
    command: 'add',
    describe: 'Add a new Note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: false,
            type: 'string'
        }
    },
    handler: (argv) => {
        // console.log('Title: ' + argv.title);
        // console.log('Body: ' + argv.body);
        notes.addNote(argv.title, argv.body)

    },
})

// Remove notes
yargs.command({
    command: 'remove',
    describe: 'Removing the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        // console.log('Removing the note!');
        notes.removeNote(argv.title)
    }
})

// Read Notes
yargs.command({
    command: 'read',
    describe: 'Reading the note',
    builder: {
        title: {
            describe: 'Note title', 
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNotes(argv.title)
        // console.log('Reading this note!');

    }
})

// List Notes
yargs.command({
    command: 'list',
    describe: 'Listing out all the notes',
    handler: (argv) => {
        // console.log('Here is the list of all the notes!');
        notes.listNotes(argv.title)
    }
})


yargs.parse()
// console.log(yargs.argv);

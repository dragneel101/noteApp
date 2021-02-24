const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs')
const { removeNotes, addNotes, listNotes, readNote } = require('./notes.js');


// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        addNotes(argv.title, argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a  note',
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
    handler(argv) {
        removeNotes(argv.title)

    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler() {
        listNotes()
    }
})
//create read command
yargs.command({
    command: 'read',
    describe: 'read notes',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        readNote(argv.title);
    }
})

yargs.parse();
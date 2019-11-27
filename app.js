const fs = require('fs');
const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const Notes = require('./notes.js');

//console.log(chalk.green.inverse.bold('test'));

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
    handler: function(argv) {
        Notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        Notes.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'List the notes',
    handler: function() {
        Notes.listNotes();
    }
});

yargs.command({
    command: 'read',
    describe: 'Read the Note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        Notes.readNote(argv.title);
    }
});

yargs.parse();
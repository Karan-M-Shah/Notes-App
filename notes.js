const fs = require('fs');
const chalk = require('chalk');

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(thisNote => thisNote.title === title);

    if(note) {
        console.log(chalk.inverse.gray(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse("Note not found"));
    }
};

const addNote = (title,body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find(note => note.title === title);

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse("New note added"));
    } else {
        console.log(chalk.red.inverse('Note title taken'));
    }
};

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const buffer = fs.readFileSync('notes.json');
        const dataJSON = buffer.toString();
        return JSON.parse(dataJSON);
    } catch(err) {
        return [];
    }
}

const removeNote = title => {
    const notes = loadNotes();

    const newNotes = notes.filter(note => {
        return note.title !== title;
    });

    if(newNotes.length !== notes.length) {
        console.log(chalk.green.inverse("Note removed"));
        saveNotes(newNotes);
    } else {
        console.log(chalk.red.inverse("No note found"));
    }
};

const listNotes = () => {
    const notes = loadNotes();

    console.log(chalk.green.inverse('Your notes:\n'));

    notes.forEach(element => {
        console.log(element.title);
    });
};

module.exports = {
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes
};
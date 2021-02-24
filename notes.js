const fs = require('fs');
const chalk = require('chalk');

//load notes from json file into objects
const loadNotes = () => {
    try {
        const data = fs.readFileSync('notes.json').toString();
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

//writes the object array into json file
const saveNotes = (notes) => {
    const jdata = JSON.stringify(notes);
    fs.writeFileSync('notes.json', jdata)
}

//list all the notes
const listNotes = () => {
    console.log(chalk.bgGreen.bold.underline.black('Your Notes'))
    const notes = loadNotes();
    if (notes.length !== 0) {
        notes.forEach(note => {
            console.log(`- ${note.title}`);
        });
    } else {
        console.log(chalk.bgRed.bold('No Notes Found!!'))
    }

}

//creates new notes
const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.bgGreen('notes added'))
    }
    else {
        console.log(chalk.bgRed('Note title alredy taken'))
    }
}

//read listed notes from json and display in console
const readNote = (title) => {
    const notes = loadNotes();
    const dispNote = notes.find((note) => note.title === title);
    if (dispNote) {
        console.log(chalk.bgWhite.bold.underline.black(dispNote.title));
        console.log("");
        console.log(chalk.bgWhite.black(dispNote.body));
    }
    else {
        console.log(chalk.bgRed(chalk`no notes with title {underline.bold ${title}}`))
    }
}

//remove notes
const removeNotes = (title) => {
    const notes = loadNotes();
    const noteToRemove = notes.filter((note) => {
        return note.title !== title
    })

    if (noteToRemove.length !== notes.length) {
        console.log(chalk.bgGreen('Note removed!'))
        saveNotes(noteToRemove);
    }
    else {
        console.log(chalk.bgRed('No note found'))
    }

}




module.exports = {
    listNotes: listNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    readNote: readNote
};
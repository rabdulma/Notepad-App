const fs = require('fs')
const chalk = require('chalk')
const getNotes= function()
{
    return "Your notes.."
}

const addNotes = (title, body) =>
{
    const note = loadNotes()  // Call the loadNotes() function where we initially catch and exception
    // and return an empty array

    //Lets check for duplicate notes ...

    const duplicateNote = note.find((NOTE)=>NOTE.title === title)

    if(!duplicateNote)
    {
        note.push({       // empty array is now stored in note variable, where we push an object  
            title: title, // property: arg1
            body: body    // property: arg2
        })

        saveNotes(note) // Calling the saveNotes() function
        console.log(chalk.blue("Note successfully added"))
    
    } else {
        console.log(chalk.red("Duplicate notes found. Cannot add note"))
    }
}

// Function that removes notes

const removeNotes = (title) => {
     const noteToRemove = loadNotes()

     // If it doesn't match the title we want to remove, we save it in the new array
     // If it does match, means its the one we want to remove, so it is "removed" by
     // essentially excluding it from the new, filtered array that we plan to keep
     const filterNotes = noteToRemove.filter((match)=>match.title !== title)                              

     if(noteToRemove.length > filterNotes.length) // if length of original > flitered array, then something must have been removed
     {
        saveNotes(filterNotes)
        console.log(chalk.green("Note successfully removed"))
        
     } else {
        console.log(chalk.red("Note not found. Cannot be removed"))
     }
    
}

// In this function, we will list our notes
const listNotes = () => {

    const load = loadNotes()
    console.log(chalk.inverse("Your notes : "))
    
    load.forEach((note) => {
      
        console.log(note.title)

    })
}

const readNotes = (title) => {

    const notesToRead = loadNotes()

    const readNote = notesToRead.find((read) => read.title === title)

    if(readNote)
    {
        console.log(chalk.inverse(readNote.title))
        
        console.log(readNote.body)
        
    } else {
        console.log(chalk.red("Title does not exist"))
    }
   
}
      
// In this function, we take in the array note as a parameter
const saveNotes = (note) => {
    
    const data = JSON.stringify(note) // Array contains an object with properties, stringify it before writing it to file
    fs.writeFileSync('notes.json', data) // Writing to file
}

const loadNotes = () => {
    try // Initially, this will fail since we don't have a .json file
    {
        const dataBuffer = fs.readFileSync('notes.json')
        const string = dataBuffer.toString()
        const parsedData = JSON.parse(string)
        return parsedData
    }
 
    catch(e) // Error caused by .json file not existing is caught 
    // and an empty array is returned so that we begin to add notes to, then save it
    {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes: readNotes
}
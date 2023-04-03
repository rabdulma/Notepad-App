//const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.command({
   command: 'add',
   describe: 'Add notes',
   builder:{
     title: {
      describe: "Add title",
      demandOption: true,
      type: 'string'
     },
     
     body: {
      describe: "Add note body",
      demandOption: true,
      type: 'string'
     }
   },
   handler(argv)
   {
    notes.addNotes(argv.title, argv.body)
   }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder: {
        title: {
            describe: 'remove note',
            demandOption: true,
            type: 'string'
        }
    },

    handler(argv)
    {
        notes.removeNotes(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'lists out all notes',
    handler()
        {
            notes.listNotes()
        }
    
})

yargs.command({
    command: 'read',
    describe: 'Reads notes',
    builder:{
        title:{
            describe: 'read notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv)
    {
       notes.readNotes(argv.title)
    }
})

yargs.parse()







#!/usr/bin/env node
const { program } = require('commander');
const { readAndConvertToJson } = require('./logicFlag');

// Concat the string to array
const collect = (value, previous) => previous.concat([value]);

/**
 * Set the option cli flag
 * Only contain that flag -flag for short and --flag for long flag
 */
program
  .option('-t, --type [type]', 'convert file to json or text', collect, [])
  .option('-o, --output [location]', 'location save file', collect, []);

// Define name cli
program.name('mytools');
// Description command cli
program.usage('C:/Windows/Panther/setuperr.log <options> command');
program.addHelpText('after');
program.parse();

/**
 * Set the program option to object with
 * the key is by long flag and the default value each key is array
 */
const options = program.opts();

// Use flag t and flag o
if ((options.type && options.type.length > 0) && (options.output && options.output.length > 0)) {
  console.log('OPTIONS TYPE', options.type);
  console.log('OPTIONS OUTPUT', options.output);
}

// Use only flag t
if ((options.type || options.type) && (!options.output || !options.output.length)) {
  console.log('ONLY FLAG TYPE', options.type);
  console.log('THE FLAG OUTPUT', options.output);
  console.log(readAndConvertToJson());
}

// Use only flag o
if ((!options.type || !options.type.length) && (options.output && options.output.length > 0)) {
  console.log('ONLY FLAG OUTPUT', options.output);
  console.log('THE FLAG TYPE', options.type);
}

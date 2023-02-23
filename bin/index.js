#!/usr/bin/env node
const { program } = require('commander');

const collect = (value, previous) => previous.concat([value]);

/**
 * Set the option cli flag
 * Only contain that flag -flag for short and --flag for long flag
 */
program
  .option('-t, --type [type]', 'convert file to json or text', collect, [])
  .option('-o, --output [output]', 'location save file', collect, []);

program.parse();

/**
 * Set the program option to object with
 * the key is by long flag and the default value each key is array
 */
const options = program.opts();

console.log(options);

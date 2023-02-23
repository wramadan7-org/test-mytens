#!/usr/bin/env node 
const yargs = require('yargs');

const options = yargs
  .usage("Usage: mytools <command> [options]")
  .option("l", {
    alias: "language",
    description: "Translate to language",
    type: "string",
    demandOption: false,
  })
  .option("s", {
    alias: "sentence",
    description: "Setence to be translate",
    type: "string",
    demandOption: false,
  })
  .help(true)
  .argv;
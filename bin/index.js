#!/usr/bin/env node
const { program } = require('commander');
const {
  readAndConvertToJson, readAndConvertToText, writeFileToJson, writeFileToText,
} = require('./logicFlag');

// Default location file log in windows
const defaultFileLog = 'C:/Windows/Panther/setuperr.log';
// Default location file output to save
const defaultFileOutput = 'D:/Project/Test/TestMyTens/files';
// Input type file on flag t
const inputTypes = {
  json: 'json',
  text: 'text',
};

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
if ((options.type && options.type.length) && (options.output && options.output.length)) {
  console.log('OPTIONS TYPE', options.type);
  console.log('OPTIONS OUTPUT', options.output);
  switch (options.type[0]) {
    // Convert to JSON
    case inputTypes.json:
      console.log('Proccess to convert file in JSON...');

      readAndConvertToJson(defaultFileLog);

      console.log('Loading...');

      console.log('Success to convert file LOG to JSON...');

      console.log('Proccess to write file...');

      writeFileToJson(options.output || defaultFileOutput, defaultFileLog);

      console.log('Success to write file to JSON...');

      break;

    case inputTypes.text:
      console.log('Proccess to convert file in TEXT...');

      readAndConvertToText(defaultFileLog);

      console.log('Loading...');

      console.log('Success to convert file LOG to TEXT...');

      console.log('Proccess to write file...');

      writeFileToText(options.output || defaultFileOutput, defaultFileLog);

      console.log('Success to write file to TEXT...');

      break;

    default:
      console.log('Proccess to convert file in TEXT...');

      readAndConvertToText(defaultFileLog);

      console.log('Loading...');

      console.log('Success to convert file LOG to TEXT...');

      console.log('Proccess to write file...');

      writeFileToText(options.output || defaultFileOutput, defaultFileLog);

      console.log('Success to write file to TEXT...');

      break;
  }
}

// Use only flag t
if ((options.type && options.type.length) && (!options.output || !options.output.length)) {
  console.log('ONLY FLAG TYPE', options.type);
  console.log('THE FLAG OUTPUT', options.output);
  console.log(readAndConvertToJson(defaultFileLog));
  switch (options.type[0]) {
    case inputTypes.json:
      console.log('Proccess to convert file in JSON...');

      console.log('Loading...');

      console.log(readAndConvertToJson(defaultFileLog));

      console.log('Success to convert file LOG to JSON...');

      break;

    case inputTypes.text:
      console.log('Proccess to convert file in TEXT...');

      console.log('Loading...');

      console.log(readAndConvertToText(defaultFileLog));

      console.log('Success to convert file LOG to TEXT...');

      break;

    default:
      console.log('Proccess to convert file in TEXT...');

      console.log('Loading...');

      console.log(readAndConvertToText(defaultFileLog));

      console.log('Success to convert file LOG to TEXT...');

      break;
  }
}

// Use only flag o
if ((!options.type || !options.type.length) && (options.output && options.output.length)) {
  console.log('ONLY FLAG OUTPUT', options.output);
  console.log('THE FLAG TYPE', options.type);

  console.log('Proccess to write file...');

  writeFileToText(options.output || defaultFileOutput, defaultFileLog);

  console.log('Success to write file to TEXT...');
}

if ((!options.type || !options.type.length) && (!options.output || !options.output.length)) {
  console.log('Proccess to convert file in TEXT...');

  console.log('Loading...');

  console.log(readAndConvertToText(defaultFileLog));

  console.log('Success to convert file LOG to TEXT...');
}

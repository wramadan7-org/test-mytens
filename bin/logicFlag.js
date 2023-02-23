const fs = require('fs');

/**
 * Read and convert file log to JSON
 * @returns JSON
 */
const readAndConvertToJson = (fileParam) => {
  /**
   * Read file from file log
   * Then convert from buffer to string
   * Then delet the space use trim
   * Then split each paragraph (paragraph1, paragraph2, paragraph3)
   */
  const file = fs.readFileSync(fileParam).toString().trim().split('\n');

  const arrayDefault = [];

  file.forEach((value, index, array) => {
    const data = {
      dateTime: '',
      loggingLevel: '',
      loggingCode: '',
      loggingComponent: '',
      message: '',
    };

    let loggingCode = '';
    let loggingComponent = '';
    let message = '';

    // Create content to array and get every index of arrayFile then split when have space
    const splitingSpace = array[index].split(/\s+/);

    // Check array index 3 is start with [ or not
    if (splitingSpace[3].startsWith('[')) {
      // Set logging code
      loggingCode = splitingSpace[3];
      // Set logging component from array splitingSpace index 4
      loggingComponent = splitingSpace[4];
      // Set message
      // Choose index start use splice then join with the next element
      message = splitingSpace.splice(5).join(' ');
    } else {
      // Set logging component from array splitingSpace index 3
      loggingComponent = splitingSpace[3];
      // Set message
      // Choose index start use splice then join with the next element
      message = splitingSpace.splice(4).join(' ');
    }

    // Set value from spliting to on key
    data.dateTime = `${splitingSpace[0]} ${splitingSpace[1].slice(0, -1)}`; // Delete , in last character array index 1
    data.loggingCode = loggingCode;
    data.loggingLevel = splitingSpace[2];
    data.loggingComponent = loggingComponent;
    data.message = message;

    arrayDefault.push(data);
  });

  return JSON.stringify(arrayDefault, null, 2);
};

/**
 * Read and convert file log to TEXT
 * @returns TEXT
 */
const readAndConvertToText = (fileParam) => {
  // Convert file to json first
  const readJson = readAndConvertToJson(fileParam);
  // Parsing json
  const parseJson = JSON.parse(readJson);

  const arrayDefault = [];

  parseJson.forEach((value) => {
    // Get the value of object
    const getValueObject = Object.values(value);
    // Append new line in last index of element array
    getValueObject.push('\n');
    const joinValue = getValueObject.join(' ');

    arrayDefault.push(joinValue);
  });

  // Change to string and split with , then join it again
  const text = arrayDefault.toString().split(',').join('');

  return text;
};

/**
 * Write file JSON
 * @param { String } locationWriteFileParam
 * @param { String } locationFileFromParam
 * @returns JSON
 */
const writeFileToJson = (locationWriteFileParam, locationFileFromParam) => {
  // Convert to JSON
  const readFileJson = readAndConvertToJson(locationFileFromParam);

  // Set file name and write the data inside file (data is result of convert JSON)
  fs.writeFileSync(`${locationWriteFileParam}/errorLog.json`, readFileJson);

  return readFileJson;
};

/**
 * Write file text
 * @param { String } locationWriteFileParam
 * @param { String } locationFileFromParam
 * @returns Text|String
 */
const writeFileToText = (locationWriteFileParam, locationFileFromParam) => {
  // Convert to TEXT
  const readFileText = readAndConvertToText(locationFileFromParam);

  // Set file name and write the data inside file (data is result of convert TEXT)
  fs.writeFileSync(`${locationWriteFileParam}/errorLog.log`, readFileText);

  return readFileText;
};

module.exports = {
  readAndConvertToJson,
  readAndConvertToText,
  writeFileToJson,
  writeFileToText,
};

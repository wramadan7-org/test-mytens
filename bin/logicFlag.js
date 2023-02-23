const fs = require('fs');
// Default location file log in windows
const defaultFile = 'C:/Windows/Panther/setuperr.log';

/**
 * Read and convert file log to JSON
 * @returns JSON
 */
const readAndConvertToJson = () => {
  /**
   * Read file from file log
   * Then convert from buffer to string
   * Then delet the space use trim
   * Then split each paragraph (paragraph1, paragraph2, paragraph3)
   */
  const file = fs.readFileSync(defaultFile).toString().trim().split('\n');

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

module.exports = {
  readAndConvertToJson,
};

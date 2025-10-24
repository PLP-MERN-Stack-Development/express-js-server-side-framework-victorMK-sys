const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

async function eventLogger(request) {
  // log request method, URL, and timestamp
  const log = `METHOD: ${request.method} | URL: ${request.url} | TIMESTAMP: ${Date.now()}\n`;
  
  // Create a logs folder if it doesn't exist and returns error if failed
  try{
    if(!fs.existsSync(path.join(__dirname, 'logs', 'eventLogger.txt'))) {
      if(!fs.existsSync(path.join(__dirname, 'logs'))) fs.mkdir(path.join(__dirname, 'logs'), (err) => {
        if(err) throw new Error(err);
      });
    }

    // Write to the eventLogger.txt file inside the logs folder
    await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLogger.txt'), log, 'utf8');
  } catch(err) {
    console.error(err.message);
  }
}

function auth(request) {
  if(request.headers['public-key-pins']) console.log('API KEY found: ', request.headers.authorization);
  else console.log('API KEY NOT found!');
}

// This function checks for the authorization header in the request and compares that of the admin which is 1010
function validation(request, login) {
  // Checks the incoming headers for an authorization property and its value
  if(request.headers.authorization === login.admin.login_id) {
    return [201, "Authorized"];
  }
  else {
    return [401, 'Not Authorized!'];
  }
}

module.exports = { eventLogger, auth, validation };
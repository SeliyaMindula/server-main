const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname,'logs', 'user-log.txt');

const logMessage=(message)=>{
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const logEntry = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} - ${message}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

function getLog(callback) {
    fs.readFile(logFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading log file:', err);
        callback([]);
      } else {
        const logEntries = data.split('\n').filter(Boolean);
        callback(logEntries);
      }
    });
  }

module.exports = {logMessage, getLog};
const fs = require("fs").promises;
const path = require("path");

function main(dir) {
    const file = 'lipsum.txt';
    const filePath = path.join(dir, file);
    const fileNames = path.join(dir, 'fileNames.txt');

    // Write initial content to lipsum.txt, then start processing
    fs.writeFile(filePath, 'Hi, my name is window. How was your day? Let me know if you want anything.')
        .then(() => upperCase(filePath, fileNames))
        .then(() => lowerCase(path.join(dir, 'file1.txt'), fileNames))
        .then(() => sortTheContent(path.join(dir, 'file2.txt'), fileNames))
        .then(() => deleteFiles(dir, fileNames))
        .then(() => console.log('All files processed and deleted'))
        .catch((error) => console.error('Error:', error));
}

function upperCase(file, fileNames) {
    let upperCaseFile; 
    return fs.readFile(file, 'utf-8')
        .then((data) => {
            console.log(data);
            const upperCaseContent = data.toUpperCase();
            upperCaseFile = 'file1.txt'; // Only save the file name
            return fs.writeFile(path.join(path.dirname(file), upperCaseFile), upperCaseContent);
        })
        .then(() => fs.appendFile(fileNames, upperCaseFile + '\n')); // Append only the file name
}

function lowerCase(file, fileNames) {
    let lowerCaseFile;
    return fs.readFile(file, 'utf-8')
        .then((data) => {
            console.log(data);
            const lowerCaseSentences = data.toLowerCase().split('.').filter(Boolean).join('. ');
            lowerCaseFile = 'file2.txt'; // Only save the file name
            return fs.writeFile(path.join(path.dirname(file), lowerCaseFile), lowerCaseSentences);
        })
        .then(() => fs.appendFile(fileNames, lowerCaseFile + '\n')); // Append only the file name
}

function sortTheContent(file, fileNames) {
    let sortedFile; 
    return fs.readFile(file, 'utf-8')
        .then((data) => {
            console.log(data);
            const sortedContent = data.split('.').filter(Boolean).sort().join('. ');
            console.log(sortedContent);
            sortedFile = 'file3.txt'; // Only save the file name
            return fs.writeFile(path.join(path.dirname(file), sortedFile), sortedContent);
        })
        .then(() => fs.appendFile(fileNames, sortedFile + '\n')); // Append only the file name
}

function deleteFiles(fileNames) {
    return fs.readFile(fileNames, 'utf-8')
        .then((data) => {
            const files = data.split('\n').filter(Boolean).map(file => file.trim()); 
            const deletePromises = files.map((file) => fs.unlink(file)); 
            return Promise.all(deletePromises); // Wait for all deletions to complete
        })
        .then(()=>fs.writeFile(fileNames,''));
}

module.exports = main;

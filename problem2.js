const fs = require("fs");
const path = require("path");

function creatingNewFiles(current) {
        const fileName = path.basename(current); // getting filename by argument
        const currentPath = path.dirname(current); // getting path by argument
        let names = 'filenames.txt'; // making a file which stores all the data
        const namePath = path.join(currentPath, names);

        fs.writeFile(current, 'Hi everyone today. We can discuss about something interesting.', (error) => {
                if (error) {
                        console.log(error);
                        return;
                }
                console.log("file is created");
                contentToUpperCase(fileName, currentPath, namePath);
        });
}

function contentToUpperCase(file, currentPath, namePath) {
        const filePath = path.join(currentPath, file);
        fs.readFile(filePath, 'utf8', (error, data) => {
                if (error) {
                        console.log(error);
                        return;
                }

                let dataToUpperCase = data.toUpperCase();
                let newFileName = 'file1.txt';
                let newFilePath = path.join(currentPath, newFileName);

                fs.writeFile(newFilePath, dataToUpperCase, (error) => {
                        if (error) {
                                console.log(error);
                                return;
                        }
                        console.log('Content converted to uppercase');
                        storeTheFiles(newFileName, namePath, () => {
                                contentToLowerCase(newFileName, currentPath, namePath);
                        });
                });
        });
}

function contentToLowerCase(file, currentPath, namePath) {
        const filePath = path.join(currentPath, file);
        fs.readFile(filePath, 'utf8', (error, data) => {
                if (error) {
                        console.log(error);
                        return;
                }

                let dataToLowerCase = data.toLowerCase();
                let newFileName = 'file2.txt';
                let newFilePath = path.join(currentPath, newFileName);

                fs.writeFile(newFilePath, dataToLowerCase, (error) => {
                        if (error) {
                                console.log(error);
                                return;
                        }
                        console.log('Content converted to lowercase');
                        storeTheFiles(newFileName, namePath, () => {
                                sortTheContent(newFileName, currentPath, namePath);
                        });
                });
        });
}

function sortTheContent(file, currentPath, namePath) {
        const filePath = path.join(currentPath, file);
        fs.readFile(filePath, 'utf8', (error, data) => {
                if (error) {
                        console.log(error);
                        return;
                }

                let sentences = data.split('.').map(sentence => sentence.trim()).filter(Boolean);
                let sortedData = sentences.sort().join('. ') + '.';

                let newFileName = 'file3.txt';
                let newFilePath = path.join(currentPath, newFileName);

                fs.writeFile(newFilePath, sortedData, (error) => {
                        if (error) {
                                console.log(error);
                                return;
                        }
                        console.log('Content sorted and written to new file');
                        storeTheFiles(newFileName, namePath, () => {
                                deleteTheFiles(namePath, currentPath);
                        });
                });
        });
}

function storeTheFiles(fileName, namePath, callback) {
        fs.appendFile(namePath, fileName + '\n', (error) => {
                if (error) {
                        console.log(error);
                        return;
                }
                console.log(`${fileName} appended to ${namePath}`);
                callback();
        });
}

function deleteTheFiles(files, currentPath) {
        fs.readFile(files, 'utf8', (error, data) => {
                if (error) {
                        console.log(error);
                        return;
                }

                let allFiles = data.split('\n').map(file => file.trim()).filter(Boolean);
                let filesToDelete = allFiles.map(file => path.join(currentPath, file));

                filesToDelete.forEach(file => {
                        fs.unlink(file, (error) => {
                                if (error) {
                                        console.log(error);
                                        return;
                                }
                                console.log(`Deleted ${file}`);
                        });
                });

                // After all files are deleted, clear filenames.txt
                fs.writeFile(files, '', (error) => {
                        if (error) {
                                console.log(error);
                        } else {
                                console.log('filenames.txt cleared');
                        }
                });
        });
}

module.exports = { creatingNewFiles };

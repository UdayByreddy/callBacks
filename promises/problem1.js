/*Using promises and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously */


const fs = require('fs');
const path = require('path');

function main(currentPath) {
    let dirPath = path.join(currentPath, 'uday');

   
    fs.mkdir(dirPath, (error) => {
        if (error) {
            console.log(error);
            return;
        }

        
        makingFilesInDir(dirPath, 5)
            .then((dirPath) => {
                
                return deletingJsonFiles(dirPath);
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    });
}

function makingFilesInDir(dirPath, filesReq) {
    return new Promise((resolve, reject) => {
        let writingFiles = [];

        for (let i = 0; i < filesReq; i++) {
            let filePath = path.join(dirPath, `file${i}.json`);
            writingFiles.push(
                new Promise((resolve, reject) => {
                    fs.writeFile(filePath, '', (error) => {
                        if (error) {
                            reject('Error occurred in file creation');
                        } else {
                            resolve();
                        }
                    });
                })
            );
        }

        Promise.all(writingFiles)
            .then(() => resolve(dirPath))
            .catch((error) => reject(error));
    });
}

function deletingJsonFiles(dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, 'utf8', (error, files) => {
            if (error) {
                reject(error);
                return;
            }

            let deleteFiles = files
                .filter((file) => path.extname(file) === '.json')
                .map((file) => {
                    let filePath = path.join(dirPath, file);
                    return new Promise((resolve, reject) => { 
                        fs.unlink(filePath, (error) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve();
                            }
                        });
                    });
                });

            Promise.all(deleteFiles)
                .then(() => resolve('Files deleted successfully'))
                .catch((error) => reject(error));
        });
    });
}

module.exports = main;

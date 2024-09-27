/*Using async/await and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.*/

        const fs = require('fs').promises;
        const path = require('path');
        
        async function contentToUpperCase(file){     // reading the file and making content into uppercase
            try{
                let data = await fs.readFile(file,'utf-8');
                let upperCase = data.toUpperCase();
                let newFile = path.join(path.dirname(file),'file1.txt');
                await fs.writeFile(newFile,upperCase);
                return newFile;
            }
            catch(error){
                return error;
            }
        }
        
        async function contentToLowerCase(file) {   // reading the file and making content into lowercase
        
            try{
                let data = await fs.readFile(file,'utf-8');
                let lowerCase = data.toLowerCase();
                let newFile = path.join(path.dirname(file),'file2.txt');
                await fs.writeFile(newFile,lowerCase);
                return newFile;
            }
            catch(error){
                console.log(error);
            }
        }
        
        async function sortedTheData(file) {  // reading the file and sorted the content
            try{
                let data = await fs.readFile(file,'utf-8');
                let sortedTheData = data.split(' ').sort().join(' ');
                let newFile = path.join(path.dirname(file),'file3.txt');
                await fs.writeFile(newFile,sortedTheData);
                return newFile;
            }
            catch(error){
                console.log(error);
            }
        }
        
        async function deleteTheFiles(dir) {  // deleting the files 
            try{
                let data = await fs.readFile(dir,'utf-8');
                let files = data.split('\n').filter(Boolean);
                for(let file of files){
                    await fs.unlink(file);
                }
        
            }
            catch(error){
                console.log(error);
            }
        }
        
        async function main(dir) {
            try{
            let filePath = path.join(dir,'lipsum.txt');
            let fileNames = path.join(dir,'fileNames.txt');
            await fs.writeFile(filePath,'I am uday kiran reddy');
           let upperCasefile =  await contentToUpperCase(filePath);
            console.log('content to upperCase');
            await fs.appendFile(fileNames,upperCasefile +'\n');
            let lowerCaseFile = await contentToLowerCase(upperCasefile);
            console.log('content to lower case');
            await fs.appendFile(fileNames,lowerCaseFile +'\n'); 
            let sortedFile = await sortedTheData(lowerCaseFile);
            console.log('sort the data');
            await fs.appendFile(fileNames,sortedFile+'\n');
            await deleteTheFiles(fileNames);
            console.log('deleted the data');
            }
            catch(error){
                console.log(error);
            }
        }

module.exports = main;

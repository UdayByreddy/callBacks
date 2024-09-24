/*Using promises and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.*/

        const fs = require('fs').promises;
        const path = require('path');

        async function main(currentPath) {
            try{
            let fileName = 'lipsum.txt';
            let filePath = path.join(currentPath,fileName);
            let filenamesFile = path.join(currentPath,'filenames.txt');
            await fs.writeFile(filePath,'I am uday kiran redddy');
            
            // writing the data to upper case
            let data = await fs.readFile(filePath,'utf8');
            let newData =  data.toUpperCase();
            let newPath = path.join(currentPath,'file1.txt');
            await fs.writeFile(newPath,newData);
            await fs.appendFile(filenamesFile, newPath + '\n');
            
            // converting the data to lower case and split into sentence and written in anthor file
            data = await fs.readFile(newPath, 'utf8');
            let lowerCaseData = data.toLowerCase();
            let sentences = lowerCaseData.split('.').map(s => s.trim()).filter(Boolean).join('.\n');
            let lowerCasePath = path.join(currentPath, 'file2.txt');
            await fs.writeFile(lowerCasePath, sentences);
            await fs.appendFile(filenamesFile, lowerCasePath + '\n');
            
            // sorted the data and written in anthor file 
            data = await fs.readFile(newPath,'utf-8');
            let sortedData = data.split(' ').sort().join(' ');
            let newPath2 = path.join(currentPath,'file3.txt');
            await fs.writeFile(newPath2,sortedData);
            await fs.appendFile(filenamesFile, newPath2 + '\n');
            
            // reading the stored filename file and deleting them
            const filesData = await fs.readFile(filenamesFile, 'utf8');
            const files = filesData.split('\n').filter(Boolean);
            await Promise.all(files.map(file => fs.unlink(file)));
            }
            catch(error){
                console.log(error);
            }
            
        }
        
module.exports = main;
        
        
       
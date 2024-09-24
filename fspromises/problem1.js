/*Using promises and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously */

        const fs = require("fs").promises;
        const path = require('path');

    async function main(currentPath){
            try{
                let dir = path.join(currentPath,'randomJsonFiles');
                await fs.mkdir(dir);
                
                // creating the files
                await createFiles(dir,5);

                // deleting the files
                await deleteFiles(dir);

            }
           catch(error){
            console.log(error);
           }

        }
        async function createFiles(dir,numberOfFiles) {
        
                for(let i=0;i<=numberOfFiles;i++){
                        let filePath = path.join(dir,`file${i}.json`);
                        await fs.writeFile(filePath,'');
                }
        }
        
        async function deleteFiles(dir) {
                let data = await fs.readdir(dir,'utf-8');
              for(let file of data){
                let filePath = path.join(dir,file);
                if(path.extname(file)==='.json'){
                        await fs.unlink(filePath);
                }
              }
        }
        
module.exports = main;
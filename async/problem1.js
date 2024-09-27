/*Using promises and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously */

        const fs = require('fs').promises;
        const path = require('path');
        
        async function createFiles(dir,totalFiles){    // async function created
            try{
            for(let i=1;i<=totalFiles;i++){
                let filePath = path.join(dir,`file${i}.json`);
                await fs.writeFile(filePath,'');         // creating empty files 
            }
        }
        catch(error){
            console.log(error);
        }
        }
        
        async function deleteFiles(dir) {  
        
            try{
            let data = await fs.readdir(dir,'utf-8');  
            for(let file of data){
                let filePath = path.join(dir,file);
                await fs.unlink(filePath);    // deleting the files
            }
        }
        catch(error){
            console.log(error);
        }
        }
        
        async function main() {
            try{ 
            let dir = 'makeJsonFiles';
            await fs.mkdir(dir);          // making dir
            await createFiles(dir,5);
            console.log('created the files');   
            await deleteFiles(dir);
            console.log('deleted the files');
            }
            catch(error){
                console.log(error);
            }
        }
        
module.exports = main;
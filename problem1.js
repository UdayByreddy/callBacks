/*Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously */


const fs = require("fs");
const path = require("path");
function makeDirectory(dir,count){
fs.mkdir(dir,(error)=>{    // making a directory
    if(error){
    console.log(error);
    } 
        console.log("created the dir");
        creatingFiles(dir,count);  // now creating files inside the dir
   
});
}

function creatingFiles(dir,count){
    for(let i=1;i<=count;i++){
        let filePath = path.join(dir,`file${i}.json`);
        let fileData = JSON.stringify({id:i,name:`file${i}`});

        fs.writeFile(filePath,fileData,(error)=>{    // creating writing inside the files
            if(error){
                console.log(error);
                return ;
            }
            if(i===count){     // if files are upto the count
                console.log('deleting the created files');
                deleteTheFiles(dir);  // deleting the files
            }

        })
    }
}

function deleteTheFiles(dir){

    fs.readdir(dir,(error,files)=>{   // reading the dir files
        if(error){
            console.log(error);
            return ;
        } 
        files.forEach((file)=>{       // going to ever file and deleting that file
            let filepath = path.join(dir,file);
            fs.unlink(filepath,(error)=>{
                if(error){
                console.log(error);
                }
                console.log(`deleted ${file}`);
            });
        })
    })
}
module.exports = {makeDirectory};  // expotring the function

/*Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.*/


const fs = require("fs");
const path = require("path");
function creatingNewFiles(current){
const fileName = path.basename(current);    // getting filename by argment
const currentPath = path.dirname(current);  // getting path by arugment
let names = 'filenames.txt';        // making a file which store the all the data
const namePath = path.join(currentPath,names);
fs.writeFile(current,'Hi everyone today we can discuss about very interseted thing',(error)=>{
        if(error){
                console.log(error);
        }
        console.log("file is created");  // creating the file and send to make a upper case the content
        contentToUpperCase(fileName,currentPath,namePath);
});

}

function contentToUpperCase(file,currentPath,namePath){
        fs.readFile(file,'utf8',(error,data)=>{
                if(error){                        // reading the data
                        console.log(error);
                        return ;
                }
                let dataToUpperCase = data.toUpperCase();  // convert them to upper case
        let newFileName = 'filesname1.txt';
        let newFilePath = path.join(currentPath,newFileName);
        fs.writeFile(newFilePath,dataToUpperCase,(error)=>{  // write the upper case content in new file
                if(error){
                        console.log(error);
                        return ;
                }
                console.log('content to upper case');
                storeTheFiles(newFileName,namePath);   // storing the filename in one file
                contentToLowerCase(newFileName,currentPath,namePath);  //sending that file to convert to lower case
        });
        });

}
function contentToLowerCase(file,currentPath,namePath){
        fs.readFile(file,'utf8',(error,data)=>{
                if(error){
                        console.log(error);
                        return;
                }
                let dataToLowerCase = data.toLowerCase(); // convert the data to lower case
               // let sentences = dataToLowerCase.split('.').map(s => s.trim()).filter(Boolean);  // split data to sentence and trim the spcaes
                let newFileName = 'filesname2.txt';
                let newFilePath = path.join(currentPath,newFileName);
                fs.writeFile(newFilePath,dataToLowerCase,(error)=>{  // wrting them in new file
                        if(error){
                                console.log(error);
                                return;
                        }
                        console.log('content to lowerCase');   
                        storeTheFiles(newFileName,namePath);   // storing the file name
                        sortTheContent(newFileName,currentPath,namePath);  // sending to other function
                });
        });
}
function sortTheContent(file,currentPath,namePath){
        fs.readFile(file,'utf8',(error,data)=>{
                if(error){
                        console.log(error);
                        return;
                }
                let sentences = data.split('.').map((sentence)=>sentence.trim()).filter(Boolean);   // spilting the data into sentence
                let sortedData = sentences.sort().join('. ');   // sort them  and joining
                let newFileName = 'filename3.txt';
                let newFilePath = path.join(currentPath,newFileName);
                fs.writeFile(newFilePath,sortedData,(error)=>{  // wrting them in new file
                        if(error){
                                console.log(error);
                                return;
                        }
                        console.log('sorted the content');
                        storeTheFiles(newFileName,namePath);  // stroeing the file name
                        deleteTheFiles(namePath,currentPath);  // sending to another function
                });
        });
}

function storeTheFiles(fileName,namePath){
       fs.appendFile(namePath,fileName +'\n',(error)=>{   // fs append is used to append files one by one
        if(error){
                console.log(error);
                return ;
        }
        console.log('file append');
       })

}
function deleteTheFiles(files,currentPath){ 
        fs.readFile(files,'utf-8',(error,Files)=>{   // getting all files in stored file
                if(error){
                        console.log(error);
                        return;
                }
                let allFiles = Files.split('\n').map((file)=>file.trim()).filter(Boolean);  // split by them \n and trim the spcaes
                allFiles.forEach((file)=>{
                        let pathFile = path.join(currentPath,file);
                        fs.unlink(pathFile,(error)=>{     // deleting the all files that are stored
                                if(error){
                                        console.log(error);
                                        return;
                                }
                                else{
                                        console.log(`deleted the ${file}`);
                                }
                        });
                });
        });
}
module.exports = {creatingNewFiles}; // export the function

/*Using promises and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.*/

        const fs = require('fs');
        const path = require('path');
        function main(currentPath){
            let file = path.join(currentPath,'lipsum.txt');
        let storeFileName = path.join(currentPath,'filesname.txt');
        fs.writeFile(file,'hi my name is uday kiran reddy',(error)=>{
            if(error){
                console.log(error);
                return;
            }
            contentToUpperCase(file,storeFileName)
                .then((file1) => contentToLowerCase(file1,storeFileName))
                .then((file2) => sortTheContent(file2,storeFileName))
                .then(() => deleteFiles(storeFileName))
                .then((message) => console.log(message))
                .catch((error) => console.error(error));
        });

        }
        
        
        function contentToUpperCase(file,storeFileName){
            return new Promise((resolve,reject)=>{
                    fs.readFile(file,'utf-8',(error,data)=>{
                        if(error){
                            reject(error);
                        }
                     let uppercaseContent = data.toUpperCase();
                    let fileName = path.join(path.dirname(file),'file1.txt');
        
                     fs.writeFile(fileName,uppercaseContent,(error)=>{
                                if(error){
                                    reject(error);
                                }
                                fs.appendFile(storeFileName,fileName +'\n',(error)=>{
                                    if(error){
                                         reject(error);
                                     }
                                });
                            resolve(fileName);
                        });
                    
                });
        
            });
        }
        
        function contentToLowerCase(file,storeFileName){
            return new Promise((resolve,reject)=>{
                fs.readFile(file,'utf-8',(error,data)=>{
                    if(error){
                        reject(error);
                    }
                    let contentLowerCase = data.toLowerCase();
                    let fileName = path.join(path.dirname(file),'file2.txt');
                    fs.writeFile(fileName,contentLowerCase,(error)=>{
                        if(error){
                            reject(error);
                        }
                        fs.appendFile(storeFileName,fileName +'\n',(error)=>{
                            if(error){
                                reject(error);
                            }
                        });
                        resolve(fileName);
                    });
                   
                });
            });
        }
        
        function sortTheContent(file,storeFileName){
            return new Promise((reslove,reject)=>{
                fs.readFile(file,'utf-8',(error,data)=>{
                    if(error){
                        reject(error);
                    }
                    let sortedData = data.split('. ').sort().join('. ');
                    let fileName = path.join(path.dirname(file),'file3.txt');
                    fs.writeFile(fileName,sortedData,(error)=>{
                        if(error){
                            reject(error);
                        }
                        fs.appendFile(storeFileName,fileName +'\n',(error)=>{
                            if(error){
                                reject(error);
                            }
                        });
                        reslove(storeFileName);
                    });
                   
                });
            });
        }
        
        function deleteFiles(dirfile){
            return new Promise((reslove,reject)=>{
                
                fs.readFile(dirfile,'utf-8',(error,data)=>{
                    if(error){
                        reject(error);
                    }
                    const files = data.split('\n').filter(Boolean);
                let allFiles = files
                .filter((file)=>path.extname(file)==='.txt')
                .map((file)=>{
                   
                   return new Promise((reslove,reject)=>{
                        fs.unlink(file,(error)=>{
                            if(error){
                                reject(error);
                            }
                            else{
                                reslove();
                            }
                        });
                    });
        
              
                });
                Promise.all(allFiles)
                .then(()=>reslove('all are deleted sucessfully'))
                .catch((error)=>reject(error));
                
                });
            });
        }
module.exports = main;
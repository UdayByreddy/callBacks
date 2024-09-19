/*Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously */

const {makeDirectory} = require('../problem1');

let directory = 'randomJsonFiles'; // dir name
let count =5; // no of files want to created inside the dir

makeDirectory(directory,count);

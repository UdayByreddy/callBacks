/*1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
       and rejects after 2 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Print out "Program complete" if the promise fulfills
    6. Print out "Program failure" if the promise rejects

    HINT: Use setTimeout for the delay*/

console.log('Program started');

function makePromise(){
    return new Promise((resolve,reject)=>{
        let delay = Math.floor((Math.random()*3000)+1000);
        setTimeout(()=>{
            if(delay>2000){
                resolve('Program complete');
            }
            else{
                reject('Program failure');
            }

        },delay)
    });
}
//console.log(makePromise());
console.log('Program in progress...');

makePromise()
.then((data)=>console.log(data))
.catch((error)=>console.log(error));
/*Create a Promise that resolves with the number 10 after
3 seconds
2. Create another Promise that resolves with the number
20 after 5 seconds

How can we log out the sum (30) of these two resolved values
once, after BOTH promises successfully fulfill?

HINT: Use Google/Documentation to help find an answer
HINT2: You can Google for something like:
    "resolve 2 promises at the same time javascript"*/

console.log('Program started');

function makePromise(data,delay){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(data);
        },delay);
    })
}

/*async function additon() {

    let num1 = await makePromise(10,3000);
    
    let num2 = await makePromise(20,5000);

    console.log(num1+num2);
    
}*/

Promise.all([makePromise(10,3000),makePromise(20,5000)])
.then(([data1,data2])=>console.log(data1+data2))
.then(()=>console.log('Program end'));


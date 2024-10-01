/*1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Print out "Step 1 complete" when the first promise fulfills
    6. Have the first promise return another new Promise that will
       fulfill after 3 seconds with the message: "Step 2 Complete"

    7. Print out the message from the second promise after it
       fulfills ("Step 2 Complete")

    HINT: Use setTimeout for the delay*/

    console.log('Program started');

    function makePromise(){
        let count=1;
        return function(){
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(`step ${count++} complete`);
            },3000);
        })
    }
    }

/*let promise = async () => {
  
    let data = makePromise();
    console.log('Program in progress...');
    let data1 = await data();
    console.log(data1);
    console.log('Program in progress...');
    let data2 = await data();
    console.log(data2);
}
promise();*/

let data = makePromise();
console.log('Program in progress...');
data()
.then((output)=>{
    console.log(output);
    return data();
})
.then((output)=>{
    console.log(output);
});

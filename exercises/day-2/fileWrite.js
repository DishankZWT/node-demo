const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

try {
    rl.question('input data to enter: ' , (argument) => {
        fs.writeFile('.txt' , argument , (err) => {
            if(err){console.log(err);}
            console.log('operation successful');
        });
        rl.close();
    });
} 
catch (error) {
    console.log(error)
}
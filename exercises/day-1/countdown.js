const readline = require('node:readline');

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

rl.question(`input time:`, inputTime => {
    const timer = setInterval( () => {
        inputTime--;
        console.log(`${inputTime}`);
        if(inputTime == 0){
            console.log(`time out`);
            clearInterval(timer);
        }

    } , 1000);
    
});
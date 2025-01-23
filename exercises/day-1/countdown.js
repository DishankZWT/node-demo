const countDownTimer = process.argv[2];
if(isNaN(countDownTimer) || countDownTimer < 0)
{
    console.log('invalid input');
}
else if(countDownTimer == 0){
    console.log(`time out`);
}
else{
    try {
        let intTime = Math.round(countDownTimer);
        const timer = setInterval( () => {
            intTime--;
            console.log(`${intTime}`);
            if(intTime == 0){
                console.log(`time out`);
                clearInterval(timer);
            }
    
        } , 1000);
    } 
    catch (error) {
        console.log(error);
    }
}
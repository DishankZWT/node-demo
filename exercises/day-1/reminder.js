const reminderTimer = process.argv[2];
const reminderTask = process.argv[3];

if(isNaN(reminderTimer) || reminderTimer < 0){
    console.log('invalid time')
}
else if(reminderTimer == 0 ){
    console.log(`time to ${reminderTask}`)
}
else{
    try {
        const reminder = Math.round(reminderTimer)*1000;
        setTimeout( () => {
            console.log(`time to ${reminderTask}`);
        } , reminder);
    } 
    catch (error) {
        console.log(error);
    }
}
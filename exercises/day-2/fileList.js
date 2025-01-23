const fs = require('fs');
const { resolve } = require('path');
const readline = require('readline');
let userPath;

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

rl.question('input directory path:' , (path) => {
    try {
        userPath = path; 
        if( fs.existsSync(userPath)){
            fs.readdir(userPath , (err , files) => {
                files.forEach( (file) => {
                    console.log(file)
                })
                if(err){
                    console.log(err);
                }
            });
        }
        else{
            console.log('directory does not exist');
        }
        
        rl.close();
    } 
    catch (error) {
        console.log(error)
    }
});



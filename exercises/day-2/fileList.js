const fs = require('fs');
const path = require('path');
const readline = require('readline');
let userPath;

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

rl.question('input directory path:' , (path) => {
    userPath = path; 

    rl.question('input extension:' , (extension) => {
        inputExtension = extension; 

        try {
    
            if( fs.existsSync(userPath)){
                fs.readdir(userPath , (err , files) => {
                    
                    files.forEach( (file) => {
                        if(file.endsWith(inputExtension)){
                            console.log(file);
                        }
                    })
                    if(err){
                        console.log(err);
                    }
                });
            }
            else{
                console.log('directory does not exist');
            }
            
        } 
        catch (error) {
            console.log(error)
        }

        rl.close();
    });

});
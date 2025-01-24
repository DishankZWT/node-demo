const { default: users } = require('./../../../constants');

function getUserById(req, res, next){
    let userValid = false;
    users.forEach(element => {
        if(req.params.id == element.id){
            console.log('how are you');
            userValid = true;   
        } 
    });
    if(userValid) next();
    else return res.status(404).send('no such id exist');
}

function emailValidator(req, res, next) {
    next();
}

function roleValidator(req, res, next) {
    next();
}

module.exports = {getUserById, emailValidator, roleValidator};
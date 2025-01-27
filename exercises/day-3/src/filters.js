const { default: users } = require('./../../../constants');

function filterUsers( req, res, next){ 

    if( Object.keys(req.query).length === 0 ){
        return next();
    }
    const userQuery = req.query;
    for(let key in userQuery){
        let filtered = users.filter(f => String(f[key]) == userQuery[key]);
        console.log(filtered);
    }
    next();
}

module.exports = { filterUsers };
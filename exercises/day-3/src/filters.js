const { default: users } = require('./../../../constants');

function filterUsers( req, res, next){ 

    if( Object.keys(req.query).length === 0 ){
        console.log('hello');
        return next();
    }
    const userQuery = req.query;
    console.log(typeof(userQuery));
    next();
    // const filteredList = users.filter(ele => { 
    //     const temp = { ...ele , ...userQuery};
    //     temp == ele;
    // });
    // res.status(200).send(filteredList);
}

module.exports = { filterUsers };
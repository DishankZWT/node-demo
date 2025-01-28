const express = require('express');

const app = express();

app.use(express.json());

const path = require('path');
const dotenv = require('dotenv').config();
const port = process.env.APP_PORT;
var time = require('express-timestamp');
app.use(time.init);
const { users } = require('../../constants');
const { emailValidator, roleValidator, getUserById} = require('./src/validators');
const { filterUsers } = require('./src/filters');
const { logger } = require('./src/logger');

app.use(express.urlencoded({extended: false}));
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, './media');
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({storage});

app.use(logger);

app.get('/' , (req , res) => {
    res.send('Welcome to the User Management API!');
});

app.get('/users' , filterUsers , (req, res) => {    
    res.status(200).send(users);
});

app.get('/users/:id' , getUserById , (req, res) => {
    const userId = req.params.id;
    users.forEach(element => {
        if(element.id == userId){
            return res.status(200).send(element);
        }
    }); 
});

app.post('/users' , emailValidator, roleValidator, (req, res) => {
    const newUserId = users.length + 1;
    const newUser = {
        id : newUserId,
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
        role: req.query.role,
        isActive: req.query.isActive,
    };
    users.push(newUser);
    return res.send(newUser);
});

app.patch('/users/:id' , (req, res) => {
    let ifExists = false;
    users.forEach(element => {        
        if(req.params.id == element.id){
            ifExists = true;
            const updateUser = {
                ...element,
                ...req.body
            };
            let temp = users.indexOf(element)
            users[temp] = updateUser;
            return res.status(200).json({user : users[temp]}); 
        }
    });
    if(!ifExists){
        return res.status(404).json({message:"No Such User Exists!"});
    }
});

app.delete('/users/:id' , (req, res) => {
    users.forEach(element => {        
        if(req.params.id == element.id){
            let temp = users.indexOf(element);
            users.splice(temp, 1);
            return res.send('successfully deleted');
        }
    });
});

app.post('/upload-image' ,upload.single('inputImage'), (req, res) => {
    console.log(req.file);
    res.send(`image ${req.file.filename} is saved successfully`);
});

app.listen(port , () => {
    console.log(`server is running at http://localhost:${port}`);
});
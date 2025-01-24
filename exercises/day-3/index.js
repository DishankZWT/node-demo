const express = require('express');
const app = express();
const path = require('path');
const { default: users } = require('../../constants');
const dotenv = require('dotenv').config();
app.use(express.json());
const port = process.env.APP_PORT;
const {getUserById, emailValidator, roleValidator} = require('./src/validators');

app.get('/' , (req , res) => {
    res.send('Welcome to the User Management API!');
});

app.get('/users' , (req, res) => {
    res.status(200).send(users);
});

app.get('/users/:id' , getUserById , (req, res) => {
    const userId = req.params.id;
    users.forEach(element => {
        if(element.id == userId){
            console.log("I am in");
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
    users.forEach(element => {        
        if(req.params.id == element.id){
            const updateUser = {
                ...element,
                ...req.body
            };
            let temp = users.indexOf(element)
            users[temp] = updateUser;
            return res.send(users[temp]);
        }
    });
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

app.listen(port , () => {
    console.log(`server is running at http://localhost:${port}`);
});


// joysche,a, appschema
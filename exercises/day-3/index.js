const express = require('express');
const app = express();
const path = require('path');
const { default: users } = require('../../constants');
const dotenv = require('dotenv').config();

const port = process.env.APP_PORT;

app.get('/' , (req , res) => {
    res.send('Welcome to the User Management API!');
});

app.get('/users' , (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id' , (req, res) => {
    const userId = req.params.id;
    res.status(200).send(users[userId - 1]);
});

app.post('/users' , (req, res) => {
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
    res.send(newUser);
});

app.listen(port , () => {
    console.log(`server is running at http://localhost:${port}`);
});
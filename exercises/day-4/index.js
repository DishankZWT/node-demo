const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const { getUsers, getUserById, createUser, deleteUser, updateUser } = require('./src/database');
var time = require('express-timestamp');

const app = express();
app.use(express.json());
app.use(time.init);

const port = process.env.APP_PORT;

//get users from database
app.get('/users', async (req,res) => {
    const users = await getUsers();
    res.send(users);
});

//get user by an id
app.get('/users/:id', async (req,res) => {
    const id = req.params.id;
    const users = await getUserById(id);
    res.send(users);
});

//create new user
app.post('/users', async (req, res) => {
    const dataBody = req.body;
    const result = Object.values(dataBody);    
    const users = await createUser(result);
    res.send(users);
});

//update user
app.patch('/users/:id', async (req, res) => {
    const id = req.params.id;
    const dataBody = req.body;
    const users = await updateUser(id, dataBody);
    res.send(users);
});

//delete user
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    const users = await deleteUser(id);
    res.send(users);
});

app.listen(port , () => {
    console.log(`server is running at http://localhost:${port}`);
});
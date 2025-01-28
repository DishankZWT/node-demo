const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const { getUserProfile, getUserInfo, createUserProfile, deleteUserProfile, updateUserProfile, deleteUserImages } = require('./src/database');
var time = require('express-timestamp');

const app = express();
app.use(express.json());
app.use(time.init);

const port = process.env.APP_PORT;

//get user profile from database
app.get('/user-profile/:id', async (req,res) => {
    const id = req.params.id;
    const users = await getUserProfile(id);
    res.send(users);
});

//get user info by an id from all tables
app.get('/users/:id', async (req,res) => {
    const id = req.params.id;
    const users = await getUserInfo(id);
    res.send(users);
});

//create new user profile
app.post('/user-profile', async (req, res) => {
    const dataBody = req.body;
    const result = Object.values(dataBody);    
    const users = await createUserProfile(result);
    res.send(users);
});

//update user profile
app.put('/user-profile/:id', async (req, res) => {
    const id = req.params.id;
    const dataBody = req.body;
    const users = await updateUserProfile(id, dataBody);
    res.send(users);
});

//delete user profile
app.delete('/user-profile/:id', async (req, res) => {
    const id = req.params.id;
    const users = await deleteUserProfile(id);
    res.send(users);
});

//delete user images
app.delete('/user-images/:userId', async(req, res) => {
    const userId = req.params.id;
    const users = await deleteUserImages(id);
    res.send(users);
});

app.listen(port , () => {
    console.log(`server is running at http://localhost:${port}`);
});
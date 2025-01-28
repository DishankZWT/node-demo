const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const pool = mysql.createPool({

    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise();

async function getUsers(){
    try {
        const [getUsers] =  await pool.query(`SELECT * FROM users`);
        return getUsers;
    } catch (error) {
        return error.message;
    }
}

async function getUserById(id){
    try {
        const [getUserById] =  await pool.query(`SELECT * FROM users where id = ?`,[id]);
        return getUserById[0];
    } catch (error) {
        return error.message;
    }
}

async function createUser(dataBody){
    try {
        const [createUser] =  await pool.query(`INSERT INTO users (name, email, age, role, isActive) VALUES( ?, ?, ?, ?, ?)`,dataBody);
        const temp = createUser.insertId;
        return getUserById(temp);
    } catch (error) {
        return error.message;
    }
}

async function updateUser(id, dataBody){
    try {
        const [updateUser] = await pool.query(`UPDATE users SET ? , updatedAt=${Date.now()} WHERE id =?`,[dataBody,id]);
        successMessage = "user updated successfully"
        return successMessage;
    } catch (error) {
        return error.message;
    }
}

async function deleteUser(id){
    try {
        const [deleteUser] =  await pool.query(`DELETE FROM users WHERE id = ?`,[id]);
        successMessage = "user deleted successfully"
        return successMessage;
    } catch (error) {
        return error.message;
    }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser} ;
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const pool = mysql.createPool({

    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise();

async function getUserProfile(id){
    try {
        const [getUsers] =  await pool.query(`SELECT * FROM user_profiles WHERE id = ?`,[id]);
        return getUsers;
    } catch (error) {
        return error.message;
    }
}

async function getUserInfo(id){
    try {
        // const [getUserById] =  await pool.query(`SELECT * FROM users where id = ?`,[id]);
        // return getUserById[0];
        //join all 3 databases and show data from each table
    } catch (error) {
        return error.message;
    }
}

async function createUserProfile(dataBody){
    try {
        const [createUser] =  await pool.query(`INSERT INTO user_profiles (userId, bio, linkedInUrl, facebookUrl, instaUrl) VALUES( ?, ?, ?, ?, ?)`,dataBody);
        const temp = createUser.insertId;
        return getUserProfile(temp);
    } catch (error) {
        return error.message;
    }
}

async function updateUserProfile(id, dataBody){
    try {
        const [updateUser] = await pool.query(`UPDATE user_profiles SET ? , updatedAt=${Date.now()} WHERE id =?`,[dataBody,id]);
        successMessage = "user updated successfully"
        return successMessage;
    } catch (error) {
        return error.message;
    }
}

async function deleteUserProfile(id){
    try {
        const [deleteUser] =  await pool.query(`DELETE FROM user_profiles WHERE id = ?`,[id]);
        successMessage = "user deleted successfully"
        return successMessage;
    } catch (error) {
        return error.message;
    }
}

async function deleteUserImages(userId){
    try {
        const [deleteUser] =  await pool.query(`DELETE FROM user_profiles WHERE userId = ?`,[userId]);
        successMessage = "user deleted successfully"
        return successMessage;
    } catch (error) {
        return error.message;
    }
}

module.exports = { getUserProfile, getUserInfo, createUserProfile, updateUserProfile, deleteUserProfile, deleteUserImages} ;
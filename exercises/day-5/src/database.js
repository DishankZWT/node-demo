const mysql = require('mysql2');
const dotenv = require('dotenv').config();

const pool = mysql.createPool({

    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE

}).promise();

//query to retrieve user profile from user_profiles table
async function getUserProfile(id){
    try {
        const [getUsers] =  await pool.query(`SELECT * FROM user_profiles WHERE id = ?`,[id]);
        if(getUsers.length == 0){ return 'no profile exist for this user';}
        return getUsers;
    } catch (error) {
        return error.message;
    }
}

//query to retrieve user info from users, user_images and user_profiles after left join
async function getUserInfo(id){
    try {
        const [getUserById] =  await pool.query(`SELECT Users.id, Users.name, Users.email, User_profiles.bio, User_images.imageName, 
                                                User_images.path FROM users Users
                                                LEFT JOIN user_profiles User_profiles ON Users.id = User_profiles.userId
                                                LEFT JOIN user_images User_images ON Users.id = User_images.userId
                                                WHERE Users.id = ?
                                                GROUP BY Users.id, Users.name, Users.email, User_profiles.bio, User_images.imageName, User_images.path`,[id]);
        if(getUserById.length == 0){ return 'no such user exist';}
        return getUserById;
    } catch (error) {
        return error.message;
    }
}

//query to create user profile in user_profiles table
async function createUserProfile(dataBody){
    try {
        const [createUser] =  await pool.query(`INSERT INTO user_profiles (userId, bio, linkedInUrl, facebookUrl, instaUrl) VALUES( ?, ?, ?, ?, ?)`,dataBody);
        const temp = createUser.insertId;
        return getUserProfile(temp);
    } catch (error) {
        return error.message;
    }
}

//query to update user profile in user_profiles table
async function updateUserProfile(id, dataBody){
    try {
        const [updateUser] = await pool.query(`UPDATE user_profiles SET ? , updatedAt=${Date.now()} WHERE id =?`,[dataBody,id]);
        successMessage = "user profile updated successfully"
        return successMessage;
    } catch (error) {
        return error.message;
    }
}

//query to delete user profile from user_profiles
async function deleteUserProfile(id){
    try {
        const [deleteUser] =  await pool.query(`DELETE FROM user_profiles WHERE id = ?`,[id]);
        successMessage = "user profile deleted successfully";
        if(deleteUser.affectedRows == 0){ return 'no such user exist';}
        return successMessage;
    } catch (error) {
        return error.message;
    }
}

//query to dalate user images from user_images
async function deleteUserImages(userId){
    try {
        const [deleteUser] =  await pool.query(`DELETE FROM user_images WHERE userId = ?`,[userId]);
        successMessage = "user images deleted successfully";
        if(deleteUser.affectedRows == 0){ return 'no such user exist';}
        return successMessage;
    } catch (error) {
        return error.message;
    }
}

module.exports = { getUserProfile, getUserInfo, createUserProfile, updateUserProfile, deleteUserProfile, deleteUserImages} ;
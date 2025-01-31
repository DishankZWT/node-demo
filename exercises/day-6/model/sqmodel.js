const { dotenv } = require("dotenv").config();

dbname = process.env.MYSQL_DATABASE;
admin = process.env.MYSQL_USER;
password = process.env.MYSQL_PASSWORD;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbname, admin, password, {
  dialect: "mysql",
  freezeTableName: true,
});

//schema model for users table
const users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.ENUM("Admin", "User"),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

//schema model for user_images table
const user_images = sequelize.define(
  "user_images",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageName: {
      type: DataTypes.STRING,
    },
    path: {
      type: DataTypes.STRING,
    },
    mimeType: {
      type: DataTypes.STRING,
    },
    extension: {
      type: DataTypes.STRING(10),
    },
    size: {
      type: DataTypes.BIGINT,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

//schema model for user_profiles table
const user_profiles = sequelize.define(
  "user_profiles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
    },
    linkedInUrl: {
      type: DataTypes.STRING,
    },
    facebookUrl: {
      type: DataTypes.STRING,
    },
    instaUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

//assosiation between tables
users.hasOne(user_profiles, { onDelete: "CASCADE" });
user_profiles.belongsTo(users);

users.hasMany(user_images, { onDelete: "CASCADE" });
user_images.belongsTo(users);

sequelize
  .authenticate()
  .then()
  .catch((err) => console.log(err));

module.exports = { users, user_images, user_profiles };

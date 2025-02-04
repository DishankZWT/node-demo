require("dotenv").config();

dbname = process.env.TEST_DATABASE;
admin = process.env.MYSQL_USER;
password = process.env.MYSQL_PASSWORD;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbname, admin, password, {
  dialect: "mysql",
  freezeTableName: true,
});

//sequelize model for users table
const users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "customer"),
      defaultValue: "customer",
    },
  },
  {
    freezeTableName: true,
  }
);

//sequelize model for products table
const products = sequelize.define(
  "products",
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
    description: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
  }
);

//sequelize model for categories table
const categories = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: true,
  }
);

//sequelize model for cart table
const cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    product_id: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
  }
);

//sequelize model for wishlist table

//sequelize model for orders and order_items table (optional)

//sequelize assossiations

// sequelize
//   .sync({ alter: true })
//   .then()
//   .catch((err) => console.log(err));

sequelize
  .authenticate()
  .then()
  .catch((err) => console.log(err));

module.exports = { users, products, categories, cart };

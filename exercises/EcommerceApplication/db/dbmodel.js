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
    indexes: [
      {
        unique: true,
        fields: ["email"],
        name: "unique_email_index",
      },
    ],
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
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["name"],
        name: "unique_name_index",
      },
    ],
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
      references: {
        model: categories,
        key: "id",
      },
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
      references: {
        model: users,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: products,
        key: "id",
      },
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
const wishlist = sequelize.define(
  "wishlist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: users,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: products,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

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

module.exports = { users, products, categories, cart, wishlist };

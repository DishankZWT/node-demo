const faker = require("faker");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create dummy users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const passwordHash = await bcrypt.hash("me#123", 10);
      const role = Math.random() > 0.5 ? "Admin" : "User";

      users.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        age: faker.random.number({ min: 18, max: 99 }),
        password: passwordHash,
        role: role,
      });
    }

    await queryInterface.bulkInsert("Users", users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

const sequelize = require("./config/sequelize");
require("./models/task-model");
require("./models/token-model");
require("./models/users-model");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("db connected");

    await sequelize.sync({ alter: true });
    console.log("table synced successfully");
  } catch (err) {
    console.error("db isnt conncted", err);
  } finally {
    await sequelize.close();
  }
})();

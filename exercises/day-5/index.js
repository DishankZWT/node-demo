const express = require("express");
const env = require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.APP_PORT;
const apiRoutes = require("./src/routes/api");

app.use("/", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

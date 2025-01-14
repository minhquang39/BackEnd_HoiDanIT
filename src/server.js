// Config use env
require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");
const APIRoutes = require("./routes/api");
// Config connect sql
const connection = require("./config/database");
const { mongo } = require("mongoose");

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

//config request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config template engine
configViewEngine(app);

// Khai bao route
app.use("/", webRoutes);
app.use("/v1/api/", APIRoutes);

//test connection
(async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Error", error);
  }
})();

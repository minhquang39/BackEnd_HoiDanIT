// Config use env
require("dotenv").config();
const express = require("express");
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const webRoutes = require("./routes/web");

// Config connect sql
const connection = require("./config/database");

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

//test connection

// connection.query(
//   "SELECT * from Users u",
//   function (err, rows, fields, results) {
//     // console.log("Fields", fields);
//     // console.log("Error", err);
//     // console.log("Rows", rows);
//   }
// );

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

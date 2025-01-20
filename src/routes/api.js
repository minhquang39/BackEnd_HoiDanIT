const express = require("express");
const routerAPI = express.Router();
const {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadFileAPI,
} = require("../controller/apiController");
const {
  postCreateCustomerAPI,
  getCustomersAPI,
  putUpdateCustomerAPI,
  deleteCustomerAPI,
} = require("../controller/customerController");

routerAPI.get("/users", getUsersAPI);
routerAPI.post("/users", postCreateUserAPI);
routerAPI.put("/users", putUpdateUserAPI);
routerAPI.delete("/users", deleteUserAPI);

routerAPI.post("/files", postUploadFileAPI);

// api customer
routerAPI.post("/customers", postCreateCustomerAPI);
routerAPI.get("/customers", getCustomersAPI);
routerAPI.put("/customers", putUpdateCustomerAPI);
routerAPI.delete("/customers", deleteCustomerAPI);

module.exports = routerAPI;

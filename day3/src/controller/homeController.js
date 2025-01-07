const connection = require("../config/database");
const { post } = require("../routes/web");
// const { get } = require("../routes/web");
const {
  getAllUser,
  updateUserById,
  getUserById,
} = require("../services/CRUDService");

const getHomepage = async (req, res) => {
  let results = await getAllUser();
  return res.render("homepage.ejs", { listUsers: results });
};

const getInfo = (req, res) => {
  res.send("Hello info controller");
};

const postCreateUser = async (req, res) => {
  let { name, email, city } = req.body;
  console.log(name, email, city);

  const [results, fields] = await connection.query(
    `INSERT INTO Users (email,name,city)
    VALUES (?,?,?) `,
    [email, name, city]
  );
  console.log(results);
  res.send("Create a new user successfully");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};
const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  const [results, fields] = await connection.query(
    `SELECT *From Users where id = ?`,
    [userId]
  );
  const userInfo = results ?? results.length > 0 ? results[0] : {};
  res.render("edit.ejs", { userInfo });
};

const postUpdateUser = async (req, res) => {
  const { id, name, email, city } = req.body;
  updateUserById(id, name, email, city);
  // res.send("Update user successfully");
  res.redirect("/");
};

const getDeleteUser = async (req, res) => {
  const userId = req.params.id;
  const [results, fields] = await getUserById(userId);
  res.render("delete.ejs", { userInfo: results });
};

const postHandleRemoveUser = async (req, res) => {
  const userId = req.params.id;
  const [results, fields] = await connection.query(
    `DELETE FROM Users WHERE id = ?`,
    [userId]
  );
  res.redirect("/");
};

module.exports = {
  getHomepage,
  getInfo,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  getDeleteUser,
  postHandleRemoveUser,
};

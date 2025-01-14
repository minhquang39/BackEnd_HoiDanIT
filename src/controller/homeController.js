const connection = require("../config/database");
const { post } = require("../routes/web");

const User = require("../model/user");
const {
  getAllUser,
  updateUserById,
  getUserById,
} = require("../services/CRUDService");

const getHomepage = async (req, res) => {
  let results = [];
  const data = await User.find({});
  console.log(data);
  return res.render("homepage.ejs", { listUsers: data });
};

const getInfo = (req, res) => {
  res.send("Hello info controller");
};

const postCreateUser = async (req, res) => {
  let { name, email, city } = req.body;
  console.log(name, email, city);

  // const [results, fields] = await connection.query(
  //   `INSERT INTO Users (email,name,city)
  //   VALUES (?,?,?) `,
  //   [email, name, city]
  // );
  // console.log(results);

  await User.create({ email: email, name: name, city: city });

  res.send("Create a new user successfully");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};
const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  // const [results, fields] = await connection.query(
  //   `SELECT *From Users where id = ?`,
  //   [userId]
  // );
  // const userInfo = results ?? results.length > 0 ? results[0] : {};
  // res.render("edit.ejs", { userInfo });
  const userInfo = await User.findById(userId).exec();
  res.render("edit.ejs", { userInfo });
};

const postUpdateUser = async (req, res) => {
  const { id, name, email, city } = req.body;
  // updateUserById(id, name, email, city);
  // res.send("Update user successfully");
  await User.updateOne({ _id: id }, { name: name, email: email, city: city });
  res.redirect("/");
};

const getDeleteUser = async (req, res) => {
  const userId = req.params.id;
  const userInfo = await User.findById(userId).exec();
  res.render("delete.ejs", { userInfo });
};

const postHandleRemoveUser = async (req, res) => {
  const userId = req.params.id;
  // const [results, fields] = await connection.query(
  //   `DELETE FROM Users WHERE id = ?`,
  //   [userId]
  // );
  const result = await User.deleteOne({ _id: userId });
  console.log(result);
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

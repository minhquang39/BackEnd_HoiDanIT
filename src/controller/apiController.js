const User = require("../model/user");
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../services/uploadFile");

const getUsersAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    errorCode: 0,
    data: results,
  });
};

const postCreateUserAPI = async (req, res) => {
  const { email, name, city } = req.body;
  let user = await User.create({ email, name, city });
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const putUpdateUserAPI = async (req, res) => {
  let { email, name, city, id } = req.body;
  let user = await User.updateOne({ _id: id }, { email, name, city });
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const deleteUserAPI = async (req, res) => {
  const id = req.body.userId;
  let user = await User.deleteOne({ _id: id });
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};

const postUploadFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }
  let result;
  if (!Array.isArray(req.files.image)) {
    result = await uploadSingleFile(req.files.image);
  } else {
    result = await uploadMultipleFiles(req.files.image);
  }
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = {
  getUsersAPI,
  postCreateUserAPI,
  putUpdateUserAPI,
  deleteUserAPI,
  postUploadFileAPI,
};

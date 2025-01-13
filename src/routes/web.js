const express = require("express");
const {
  getHomepage,
  getInfo,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  getDeleteUser,
  postHandleRemoveUser,
} = require("../controller/homeController");
const router = express.Router();

//Khai bao route
// router.get("/", (req, res) => {
//   // res.send("Hello World!");
//   res.render("sample.ejs");
// });

router.get("/about", (req, res) => {
  res.send("Hello Quang and i'm your friend!");
});

router.get("/contact", (req, res) => {
  res.send("<h1>Hello</h1>");
});

router.get("/", getHomepage);
router.get("/info", getInfo);

// 1 trang để chuyển hướng đến trang tạo user,update, trang còn lại để thông báo tạo user,update thành công
// post là để tạo, cập nhật còn get là để hiển thị trang
router.post("/create-user", postCreateUser);
router.post("/update-user", postUpdateUser);
router.post("/delete-user/:id", postHandleRemoveUser);
router.get("/create", getCreatePage);
router.get("/update/:id", getUpdatePage);
router.get("/delete/:id", getDeleteUser);

module.exports = router;

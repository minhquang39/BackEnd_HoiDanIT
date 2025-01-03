const express = require("express");
const router = express.Router();

//Khai bao route
router.get("/", (req, res) => {
  // res.send("Hello World!");
  res.render("sample.ejs");
});

router.get("/about", (req, res) => {
  res.send("Hello Quang and i'm your friend!");
});

router.get("/contact", (req, res) => {
  res.send("<h1>Hello</h1>");
});

module.exports = router;

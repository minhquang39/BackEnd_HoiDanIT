const getHomepage = (req, res) => {
  res.send("Hello homepage controller");
};

const getInfo = (req, res) => {
  res.send("Hello info controller");
};

module.exports = { getHomepage, getInfo };

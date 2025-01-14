require("dotenv").config();
const { default: mongoose } = require("mongoose");

const dbState = [
  { state: "Disconnected", value: 0 },
  { state: "Connected", value: 1 },
  { state: "Connecting", value: 2 },
  { state: "Disconnecting", value: 3 },
];

const connection = async () => {
  const option = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  };
  await mongoose.connect(process.env.DB_HOST, option);
  const state = Number(mongoose.connection.readyState);
  console.log(dbState.find((item) => item.value === state).state);
};

module.exports = connection;

const connection = require("../config/database");
const getAllUser = async () => {
  let [results, fields] = await connection.query("SELECT * FROM Users");
  return results;
};
const getUserById = async (id) => {
  let [results, fields] = await connection.query(
    "SELECT * FROM Users where id = ?",
    [id]
  );
  return results;
};

const updateUserById = async (id, name, email, city) => {
  const [results, fields] = await connection.query(
    `UPDATE Users SET name = ?, email = ?, city = ? WHERE id = ?`,
    [name, email, city, id]
  );
  return results;
};

module.exports = { getAllUser, updateUserById, getUserById };

const pool = require("./pool");

async function getAllUsernames() {
  // { rows } destructures the return object and only takes .rows
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function searchUser(username) {
  const { rows } = await pool.query("SELECT * FROM usernames WHERE username LIKE $1", ["%" + username + "%"]);
  return rows;
}

async function deleteAllUsers() {
  await pool.query("DELETE FROM usernames");
}

module.exports = {
  getAllUsernames,
  insertUsername,
  searchUser,
  deleteAllUsers,
};

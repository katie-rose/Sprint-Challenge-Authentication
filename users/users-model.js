const db = require("../database/dbConfig");

module.exports = {
  add,
  find,
  findById,
  findByUsername
};

function findByUsername(username) {
  return db("users")
    .where("username", username)
    .first();
}

function find() {
  return db("users").select("id", "username");
}

function findById(id) {
  return db("users")
    .where("id", id)
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

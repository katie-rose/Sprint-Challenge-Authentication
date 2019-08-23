const db = require("../database/dbConfig");

module.exports = {
  add,
  findById,
  findBy,
  findByUsername
};

function findByUsername(username) {
  return db("users")
    .where("username", username)
    .first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

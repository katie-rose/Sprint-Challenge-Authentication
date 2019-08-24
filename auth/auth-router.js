const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersDb = require("../users/users-model");

// get users
router.get('/users', (req, res) => {
	usersDb.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(500).json(error)
		});
});

router.post("/register", (req, res) => {
  // implement registration
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;

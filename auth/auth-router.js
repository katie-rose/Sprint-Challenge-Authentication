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
  	let user = req.body;
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;

    usersDb
      .add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
});

router.post("/login", (req, res) => {
  // implement login
  	let { username, password } = req.body;

    usersDb
      .findByUsername(username)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {

          res.status(200).json({
            message: `Welcome ${user.username}`
          });
        } else {
          res.status(401).json({ message: "Invalid login credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Error communicating with database" });
      });
});

module.exports = router;

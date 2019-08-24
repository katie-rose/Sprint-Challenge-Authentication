const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersDb = require("../users/users-model");
const secrets = require("../config/secrets");

router.get("/users", (req, res) => {
  usersDb
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/register", (req, res) => {
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
  let { username, password } = req.body;

  usersDb
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwt(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid login credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error communicating with database" });
    });
});

function getJwt(user) {
	const payload = {
		subject: user.id,
		username: user.username
	}

	const options = {
		expiresIn: '8h'
	}

	return jwt.sign(payload, secrets.jwtSecret, options);
}


module.exports = router;

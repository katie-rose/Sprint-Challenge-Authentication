const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/usersModel.js");
const restricted = require("../auth/authenticate-middleware");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({ loggedInUser: req.user.username, users });
    })
    .catch(err => res.send(err));
});

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = getJwt(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;

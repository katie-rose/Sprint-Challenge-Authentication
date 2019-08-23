const router = require("express").Router();

const Users = require("./usersModel.js");
const restricted = require("../auth/authenticate-middleware");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json({ loggedInUser: req.user.username, users });
    })
    .catch(err => res.send(err));
});

module.exports = router;

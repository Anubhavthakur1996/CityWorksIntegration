const express = require("express");
const router = express.Router();
const userService = require("./users.service");

router.post("/login", signIn);
router.post("/signUp", register);

module.exports = router;

function signIn(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({
            status: "error",
            message: "Oops, wrong credentials, please try again.",
          })
    )
    .catch((err) => next(err));
}

function register(req, res, next) {
  console.log(req.body);
  userService
    .create(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res
            .status(400)
            .json({ status: "error", message: "Error while registring user" })
    )
    .catch((err) => next(err));
}

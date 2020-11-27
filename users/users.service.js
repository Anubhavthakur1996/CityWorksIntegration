const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../helpers/db"); 

const User = db.User;

module.exports = {
  authenticate, 
  create,
};

async function authenticate({ email, password }) {
  let user = await User.find({ where: { email } });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithoutHash } = user.toObject();
    const token = jwt.sign({ sub: user.id }, config.secret);

    return {
      status: "success",
      ...userWithoutHash,
      token,
    };
  }
}

async function create(userParam) {
  // validate
  let userCheck = await User.find({ where: { email: userParam.email } })
  if (userCheck && userCheck.email === userParam.email) {
    throw 'Email "' + userParam.email + '" is already taken';
  }

  const user = new User(userParam);
  if (!userParam.password) {
    throw "Password is required";
  }

  if (!userParam.email) {
    throw "Email is required";
  }

  if (!userParam.name) {
    throw "name is required";
  }

  // hash password
  user.hash = bcrypt.hashSync(userParam.password, 10);

  // save user
  await user.save();
  if (user && user.id) {
    const token = jwt.sign({ sub: user.id }, config.secret);
    return {
      status: "success",
      message: "User register successfully",
      token: token,
    };
  }
}

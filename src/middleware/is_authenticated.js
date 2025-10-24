const { response } = require("../util/helpers");
const jwt = require("jsonwebtoken");
const userModel = require("./../models/user");

const isAuthenticated = async (req, res, next) => {
  const bearerToken = req.header("Authorization");

  if (!bearerToken) return response(res, "Invalid Access Token", null, 401);

  const tokenCkunks = bearerToken.split(" ");
  if (tokenCkunks.length < 2)
    return response(res, "Invalid Access Token", null, 401);

  const token = tokenCkunks[1];

  try {
    const data = jwt.verify(token, process.env.JWT_HASH_SECRET);
    const userId = data.ide;

    const user = await userModel.findById(userId);

    if (!user) return response(res, "Invalid Access Token", null, 401);

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return response(res, "Invalid Access Token", null, 401);
  }
};

module.exports = isAuthenticated;

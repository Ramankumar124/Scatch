const userModel = require("../models/userModel");
const ownerModel = require("../models/ownerModel");
const jwt = require("jsonwebtoken");

module.exports.isLogin = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user;
    if (decoded.usertype == "user") {
      user = await userModel
        .findOne({ email: decoded.email })
        .select("-password");
    } else {
      user = await ownerModel
        .findOne({ email: decoded.email })
        .select("-password");
    }

    req.user = user;

    next();
  } catch (error) {
    req.flash("error", "Something went wrong");
    res.redirect("/");
  }
};

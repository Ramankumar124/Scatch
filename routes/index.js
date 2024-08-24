const express = require("express");
const { isLogin } = require("../middlewares/isLogin");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const { cartTotal } = require("../utils/cartTotal");
const router = express.Router();

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLogin, async function (req, res) {
  const products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});
router.get("/addToCart/:id", isLogin, async function (req, res) {
  console.log(req.user);

  const user = await userModel.findOne({ email: req.user.email });
  if (user.cart.indexOf(req.params.id) !== -1) {
    req.flash("success","product already added to cart");
    res.redirect('/shop')
  }
  else{

      user.cart.push(req.params.id);
      await user.save();
      req.flash("success", "Added To cart");
      res.redirect("/shop");
    }
});
router.get("/cart", isLogin, async function (req, res) {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  cartTotal(user);

  res.render("cart", { user });
});
router.get("/logout", isLogin, function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
});
router.get("/adminLogin", function (req, res) {
  res.render("owner-login");
});

module.exports = router;

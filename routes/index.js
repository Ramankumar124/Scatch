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
  if (user.cart.findIndex(cartItem=>cartItem.product.equals(req.params.id)) !== -1) {
    req.flash("success","product already added to cart");
    res.redirect('/shop')
  }
  else{
    
      user.cart.push({product:req.params.id});
      await user.save();
      req.flash("success", "Added To cart");
      res.redirect("/shop");
    } 
});
router.get("/cart", isLogin, async function (req, res) {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart.product");
  
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
router.get('/account', async (req, res) => {
  try {
      const user = await userModel.findById(req.user.id).populate('cart.product'); // Assuming user is logged in and req.user contains user info
      res.render('my-account', { user });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});
module.exports = router;

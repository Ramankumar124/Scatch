const express = require("express");
const { isLogin } = require("../middlewares/isLogin");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const { cartTotal } = require("../utils/cartTotal");
const router = express.Router();
const jwt=require('jsonwebtoken');
const upload = require("../config/multerConfig");

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
 const success=req.flash("success");
  res.render("cart", { user,success });
});
router.get("/logout", isLogin, function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
});
router.get("/adminLogin", function (req, res) {
  res.render("owner-login");
});




router.get('/my-account',isLogin,async(req,res)=>{
  let decoded=   jwt.verify(req.cookies.token,process.env.JWT_KEY)
  let   user=decoded.usertype;

    if(user=="Owner"){
      
      res.redirect("/owner/Create-new-product");
    }
    else res.redirect("/account");
})
router.get('/account',isLogin, async (req, res) => {
  try {
      const user = await userModel.findById(req.user.id).populate('cart.product'); // Assuming user is logged in and req.user contains user info]
      console.log(user);
      
      res.render('my-account', { user });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
});
router.post('/upload-image',upload.single("picture"),isLogin,async function(req,res){
console.log("user is ",req.body);
console.log("file is here",req.file);

const user=await userModel.findOneAndUpdate({email:req.user.email},{

  picture:req.file.buffer.toString('base64')
});


  res.redirect("/account");
})
module.exports = router;

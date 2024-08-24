const express = require("express");
const ownerModel = require("../models/ownerModel");
const { isLogin } = require("../middlewares/isLogin");
const productModel = require("../models/productModel");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");


const router = express.Router();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let { fullName, email, password, gstin } = req.body;

    let owners = await ownerModel.find({});
    console.log(owners.length);
    
    if (owners.length > 0) {
      res.status(500).send("owner already exists you can't create new");
      console.log(owners.length);

    } else {

      
      let createdOwner = await ownerModel.create({
        fullName,
        email,
        password,
        gstin,
      });

      res.status(201).send(createdOwner);
    }
  });
}

router.post("/home",async function(req,res){
  const{email,password}=req.body;

  const owner=await ownerModel.findOne({email});
    token=generateToken(owner);
    res.cookie("token",token);
   
    let success  = req.flash("success");
   const products=await productModel.find({})
  if(owner){
    if(owner.password===password){
      res.render("admin",{products,success});
    }
    else{
      res.send("wrong crendential")
    }
  }
  else res.send("wrong crendential")
})

router.get("/all-products",isLogin,async function(req,res){
  const products=await productModel.find({});
 let success  = req.flash("success");
    res.render("admin",{products,success});

})


router.get("/Create-new-product",isLogin,async function (req, res) {
  console.log(req.user);
  const owner=await ownerModel.findOne({email:req.user.email});
  console.log(owner);
  
  if(owner){
    let success= req.flash("success");
    res.render("createproducts",{success});
  }
  else{
  const error="Sorry but you are not a owner";
    res.render("error",{error});

  }
});

router.get("/delete-all",async function(req,res){
   const products=await productModel.deleteMany({});
   req.flash("success","Deleted all products");
   res.redirect("all-products");
})

module.exports = router;



const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken}=require('../utils/generateToken')

module.exports.registerUser= async function (req, res) {
    try {
        let { email, fullName,password } = req.body;
    let User=await userModel.findOne({email});
    if(User){
        req.flash("error","you already have a account please login")
       res.redirect("/");
    }
    else{

        bcrypt.genSalt(10, function (err, salt) {
            if (err) return res.send(err.message);
            bcrypt.hash(password,salt, async function (err, hash) {
                if (err) return res.send(err.message);
                const user = await userModel.create({
                    email,
                    fullName,
                    password: hash,
                });
                let token=  generateToken(user)
                res.cookie("token", token);
                console.log(token);
                
                res.send("user created succesfully");
            });
        });
    }
    } catch (error) {
      res.send(err.message);
    }
  }

module.exports.loginUser=async function(req,res){
    const {email,password} =req.body;
    let user=await userModel.findOne({email});

    if(user){
      bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token=generateToken(user);
            res.cookie("token",token);
            res.redirect("/shop");
            }

        else{
            req.flash("error","wrongs crendential");
            res.status(404).send("user and password  not found");
        }
      })
    }
    else{
        res.status(404).send("user and password not found");
    }

    
}  


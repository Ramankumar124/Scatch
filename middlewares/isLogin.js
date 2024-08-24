
const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')

module.exports.isLogin=async function(req,res,next){
    if(!req.cookies.token){
        req.flash("error","you need to login first");
        return res.redirect("/");
    }
    try {
     let decoded=   jwt.verify(req.cookies.token,process.env.JWT_KEY)
        let user=await userModel
        .findOne({email:decoded.email})
        .select("-password");
        
        req.user=user;// set the user value in  req 
        next();
    } catch (error) {
        req.flash("error","Something went wrong");
        res.redirect("/");
    }
}
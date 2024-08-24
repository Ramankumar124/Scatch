const mongoose=require('mongoose');


const ownerSchema=mongoose.Schema({
    fullName:{
        type:String,
        minLenth:3,
        trim:true
    },
    email:String,
    password:String,
    cart:{
        type:Array,
        default:[]
    },
    orders:{
        type:Array,
        default:[]
    },
    picture:String,
    gstin:String
})

const userModel=mongoose.model("owner",ownerSchema);
module.exports=userModel;
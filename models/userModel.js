const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/Scatch");
const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        minLenth:3,
        trim:true
    },
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    orders:{
        type:Array,
        default:[]
    },

    contact:Number,
    picture:String
})

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;
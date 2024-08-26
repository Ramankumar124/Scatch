const { name } = require('ejs');
const mongoose=require('mongoose');

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    discount:{
        type:Number,
        default:0
    },
    bgcolor:{
        type:String,
        default:"#41B3A2"
    },
    panelcolor:{
        type:String,
        default:"#0D7C66"
    },
    textcolor:{
        type:String,
        default:"#D7C3F1"
    },
    
    
    image:Buffer
})


const productModel=mongoose.model("product",productSchema);
module.exports=productModel;
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
    cart: [{    
        product: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'product' 
        },
        quantity: {
            type: Number,
            required: true,
            default: 1 // or any other default quantity you want
        },
        total:{
            type:Number,
            default:0
        },
            
    }],
    orders:{
        type:Array,
        default:[]
    },

    contact:Number,
    picture:String,
    
})

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;
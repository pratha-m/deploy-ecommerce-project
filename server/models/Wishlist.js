const mongoose=require("mongoose");
const wishlistProductSchema=new mongoose.Schema({
    productimage:{
        type:String
    },
    productname:{
        type:String
    },
    productprice:{
        type:Number
    },
    heart:{
        type:String
    }
})
const wishlistProduct=new mongoose.model("wishlistproduct",wishlistProductSchema);
module.exports=wishlistProduct;
const mongoose=require("mongoose");
const cartProductSchema=new mongoose.Schema({
    productimage:{
        type:String
    },
    productname:{
        type:String
    },
    productprice:{
        type:Number
    },
    productquantity:{
        type:Number
    }
})
const cartProduct=new mongoose.model("cartproduct",cartProductSchema)
module.exports=cartProduct;
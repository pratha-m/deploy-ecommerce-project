const mongoose=require("mongoose");
const saveForLatterProductSchema=new mongoose.Schema({
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
const saveForLatterProduct=new mongoose.model("saveForLatterProduct",saveForLatterProductSchema)
module.exports=saveForLatterProduct;
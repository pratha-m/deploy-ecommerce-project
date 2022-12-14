const mongoose=require("mongoose");
const productsSchema=new mongoose.Schema({
    productimage:{
        type:String
    },
    productimage1:{
        type:String
    },
    productimage2:{
        type:String
    },
    productimage3:{
        type:String
    },
    productimage4:{
        type:String
    },
    productcompanylogo:{
        type:String
    },
    productname:{
        type:String
    },
    productprice:{
        type:Number
    },
    productdeal:{
        type:String
    },
    productcompany:{
        type:String
    },
    producttype:{
        type:String
    },
    productflavor:{
        type:String
    },
    producttaste:{
        type:String
    },
    productisorganic:{
        type:String
    },
    productaddpreservatives:{
        type:String
    },
    productfoodpreference:{
        type:String
    },
    productmaximumshelftime:{
        type:String
    },
    productcontainertype:{
        type:String
    },
    heart:{
        type:String
    }
})
const product=new mongoose.model("product",productsSchema)
module.exports=product;
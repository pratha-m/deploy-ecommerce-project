const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
       type:String,
       required:true
    },
    rollno:{
       type:Number,
       required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true 
    },
    tokens:[{
        innerToken:{
            type:String,
            required:true
        }
    }]
})
studentSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
        this.confirmpassword=await bcrypt.hash(this.password,10)
    }
    next();
})
// we are generating token 
studentSchema.methods.generateAuthToken=async function(){
    try{
       const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY,{expiresIn:"15m"})
       this.tokens=this.tokens.concat({innerToken:token});
       await this.save();
       return token;
    }
    catch(error){
       console.log(error);
    }
}
const student=new mongoose.model("student",studentSchema);
module.exports=student;
require("dotenv").config()
const cors=require("cors");
const express=require("express");
const app=express();
const path=require("path")
const hbs=require("hbs");
const mongoose=require("mongoose");
const student = require("./models/studentData");
const bcrypt=require("bcryptjs");
const product = require("./models/Product");
const cartProduct = require("./models/Cart");
const saveForLatterProduct=require("./models/SaveForLater")
const wishlistProduct=require("./models/Wishlist");
const cookieParser = require('cookie-parser');
const localStorage = require("localStorage")
mongoose.connect("mongodb://localhost:27017/ecommercesite")
.then(()=>{console.log("database connection succeded")})
.catch((error)=>{console.log("database connection not succeded",error)})

const viewsPath=path.join(__dirname,"templates/views");
const partialsPath=path.join(__dirname,"templates/partials");
app.set("view engine","hbs")
app.set("views",viewsPath)
app.set("trust proxy",1)//
app.use(express.static(path.join(__dirname,"templates/views")))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
hbs.registerPartials(partialsPath);
app.use(cors({credentials:true}))//
app.use(cookieParser())

const multer=require("multer"); //cb-->call
const { response } = require("express");
const storage=multer.diskStorage({
  destination:(request,file,cb)=>{
     cb(null,"../client/public/uploads")
  },
  filename:(request,file,cb)=>{
    cb(null,file.originalname)
  }
})
let upload=multer({storage:storage});


// student details managment starts 
app.post("/createaccount",async(request,res)=>{
    try{
            const password=request.body.password;
            const confirmpassword=request.body.confirmpassword;
            if(password===confirmpassword){
                const registerStudent=new student({
                    name:request.body.name,
                    email:request.body.email,
                    rollno:request.body.rollno,
                    password:password,
                    confirmpassword:confirmpassword
                })
                const registered=await registerStudent.save();
              
                console.log("registration succeded");
                res.send("registration succeded");
            }
            else{
                res.send("passwords are not matching")
            }
        }
        catch(error){
            res.status(500).send(error)
        }
    })
    app.post("/login",async(request,res)=>{
        try{
          const email=request.body.email;
          const userPassword=request.body.password;
          console.log(email);
          const studentFindByEmail=await student.findOne({email:email});
          if(studentFindByEmail!=null){
              const databasePassword=studentFindByEmail.password;
              const matchPassword=await bcrypt.compare(userPassword,databasePassword);
              if(matchPassword){
                //   const token=await studentFindByEmail.generateAuthToken();
                res.cookie("jwt","jjfj",{httpOnly:true,path: '/'});
                  console.log(res.cookie())
                  res.send(studentFindByEmail);
                  console.log("login succeded");
                }   
                else{
                    res.send(null);
                    console.log("incorrect password");
                }
            }
            else{
                res.send(null);
                console.log("incorrect email");
            }
        }
        catch(error){
            res.status(500).send("login error",error)
            console.log(error)
        }
    })
app.delete("/logout",async(request,res)=>{
        try{
              const email=request.body.email;
              const userPassword=request.body.password;
              console.log(email)
              console.log(userPassword)
              const studentFindByEmail=await student.findOne({email:email});
              if(studentFindByEmail!=null){
              const databasePassword=studentFindByEmail.password;
              const matchPassword=await bcrypt.compare(userPassword,databasePassword);
                if(matchPassword){
                    await student.findOneAndDelete({email:email},function(error,data){
                                if(error){
                                     console.log("error in logout");
                                }
                                else{
                                     console.log("logout successfully")
                                     console.log("logout person data is :",data)
                                }
                    })
                }   
                else{
                    res.send(null);
                    console.log("incorrect password");
                }
            }
            else{
                res.send(null);
                console.log("incorrect email");
            }
        }
        catch(error){
            res.status(500).send("logout error")
            console.log("some error in logout")
        }
    })
app.post("/enteremailtoforgotpassword",async(request,res)=>{
    const useremail=request.body.email;
    const documentFindByEmail=await student.findOne({email:useremail});
    if(documentFindByEmail!=null){
        console.log("the email is correct");
        res.send(documentFindByEmail);
        const nodemailer=require("nodemailer")
        const otpOnEmail=Math.round(Math.random()*(192356-123457)+123457);
        const subject=`Forgot password`
        const html=`<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Bootstrap demo</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
          </head>
          <body>
          <div class="card">
          <div class="card-body">
            <h5 class="card-title">Forgot Password</h5>
            <p class="card-text">Otp to forgot the password is :</p>
            <button type="button" class="btn btn-primary" style="background-color:green;color:white;border-radius:20px;border:none">${otpOnEmail}</button>
            </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
          </body>
        </html>`
        let mailTransporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"jsnode02@gmail.com",
                pass:"zxxhhhrryqchjkhc"
            }
        })
        let details={
            from:"jsnode02@gmail.com",
            to:useremail,
            subject:subject,
            html:html
        }   
        mailTransporter.sendMail(details,(error)=>{
            if(error){
                res.send(error)
            }
            else{
                console.log("email has send successfully")
                app.post("/getotponemail",async(request,res)=>{
                    const userTypedOtp=request.body.otp;
                    if(userTypedOtp!=otpOnEmail){
                        console.log("you entered invalid otp")
                        res.send({otpPhase:"error"});
                    }
                    else{
                        console.log(useremail)
                        console.log("otp is correct")
                        res.send({otpPhase:"success"})
                        app.put("/createnewpassword",async(request,res)=>{
                        try{
                                let userPassword=request.body.password;
                                let userConfirmPassword=request.body.confirmpassword;
                                let hashedUserPassword=await bcrypt.hash(userPassword,10)
                                let hashedUserConfirmPassword=await bcrypt.hash(userConfirmPassword,10)
                                let updateStudentData=await student.findOneAndUpdate({email:useremail},{$set:{password:hashedUserPassword,confirmpassword:hashedUserConfirmPassword}},{new:true})
                                res.send({updatedDocument:updateStudentData});
                                console.log("updated data :",updateStudentData);
                            }
                        catch(error){
                                console.log("sorry password not updated")
                                res.send(null);
                            }
                        })
                    }
                })
            }
        })
    }
    else{
        console.log("email not in our database");
        res.send(null);
    }
})
// student details managment ends 

// products details managment starts 

// creating the product:->
app.post("/createproduct",upload.fields([
    {name:"productimage"},
    {name:"productimage1"},
    {name:"productimage2"},
    {name:"productimage3"},
    {name:"productimage4"},
    {name:"productcompanylogo"}
]),async(req,res)=>{
    try{
        const newProduct=new product({
            productname:req.body.productname,  
            productprice:req.body.productprice,  
            productdeal:req.body.productDeal,
            productcompany:req.body.productcompany,  
            producttype:req.body.producttype,
            productflavor:req.body.productflavor,
            producttaste:req.body.producttaste,
            productisorganic:req.body.productIsOrganic,
            productaddpreservatives:req.body.productAddPreservatives,
            productfoodpreference:req.body.productfoodpreference,
            productmaximumshelftime:req.body.productmaximumshelftime,
            productcontainertype:req.body.productcontainertype,
            heart:" ",
            productimage:req.files.productimage[0].originalname,
            productimage1:req.files.productimage1[0].originalname,
            productimage2:req.files.productimage2[0].originalname,
            productimage3:req.files.productimage3[0].originalname,
            productimage4:req.files.productimage4[0].originalname,
            productcompanylogo:req.files.productcompanylogo[0].originalname
        })
        const productCreated=await newProduct.save();
        // console.log(productCreated);
        res.send(productCreated);
    }
    catch(error){
        console.log("error in creating product",error);
    }
})
// get the products 
app.get("/getproducts",async(req,res)=>{
    try{
        const products=await product.find();
        // console.log(products);
        res.send(products);
    }
    catch(error){
        console.log("sorry not fetching products ");
        res.send("sorry not fetching products");
    }
})

app.post("/geteachproduct",async(req,res)=>{
    try{
         const id=req.body.id;
         const getEachProduct=await product.findById(id)
         res.send(getEachProduct);
        //  console.log(getEachProduct);
    }
    catch(error){
        console.log(error);
        res.send(error);
    }
})
app.post("/deleteproduct",async(req,res)=>{
     try{
        const id=req.body.id;
        const deleteProduct=await product.findByIdAndDelete(id);
        res.send(deleteProduct);
     }
     catch(error){
         console.log("error in deleting product");
         res.send(error);
     }
})
app.put("/editproduct",async(req,res)=>{
    try{
          const productid=req.body.productid;
          const productname=req.body.productname;
          const productprice=req.body.productprice;
          const updatedProduct=await product.findOneAndUpdate({_id:productid},{$set:{productname:productname,productprice:productprice}},{new:true});
        //   console.log(updatedProduct)
          res.send(updatedProduct);
    }catch(error){
        console.log("error in update product");
        res.send(error);
    }
})
// products details managment ends 

// cart starts 
app.post("/addtocart",async(req,res)=>{
    try{
        const id=req.body.id;
        const productname=req.body.productname;
        const productprice=req.body.productprice;
        const productimage=req.body.productimage;
        const productquantity=req.body.productquantity;
        const findDocumentId=await cartProduct.findById(id);
        if(findDocumentId==null){
                const newCartProduct=new cartProduct({
                productname:productname,
                productprice:productprice,
                productimage:productimage,
                productquantity:productquantity,
                _id:id
            })
            const cartProductCreated=await newCartProduct.save();
            // console.log(cartProductCreated)  
            res.send(cartProductCreated)  
        }
        else{
            console.log("this product is already in cart");
            res.send();
        }
    }
    catch(error){
        console.log(error);
        res.send("error in adding product to cart");
    }
})
app.get("/getcartproducts",async(req,res)=>{
    try{
        const cartProducts=await cartProduct.find();
        res.send(cartProducts)
    }
    catch(error){
        console.log("error in fetching cart products")
        res.send(error);
    }
})
app.put("/updatecart",async(req,res)=>{
    try{
       const quatityvalue=req.body.quatityvalue;
       const id=req.body.id;
       const updatedCartProduct=await cartProduct.findOneAndUpdate({_id:id},{$set:{productquantity:quatityvalue}},{new:true})
       res.send(updatedCartProduct);
    }catch(error){
        console.log("error in updating cart products");
        res.send(error)
    }
})
app.post("/removecartproduct",async(req,res)=>{
    try{
        const id=req.body.id;
        const deletedCartProduct=await cartProduct.findByIdAndDelete(id);
        // console.log(deletedCartProduct);
        res.send(deletedCartProduct);
    }
    catch(error){
        console.log("eror in deleting prduct");
        res.send(error);
    }
})
// cart ends 

// save for later starts 
app.post("/addsaveforlaterproduct",async(req,res)=>{
    try{
       const id=req.body.id;
       const findDocById=await saveForLatterProduct.findById(id);
       if(findDocById==null){
        const newSaveForLaterProduct=new saveForLatterProduct({
            productname:req.body.productname,
            productprice:req.body.productprice,
            productquantity:req.body.productquantity,
            productimage:req.body.productimage,
            _id:id
           })
           const createdSaveLater=await newSaveForLaterProduct.save();
           res.send();
       }
       else{
          console.log("already in savefor later");
          res.send();
       }
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})
app.get("/getsaveforlaterproduct",async(req,res)=>{
    try{
        const saveLaterProducts=await saveForLatterProduct.find();
        res.send(saveLaterProducts);
    }
    catch(error){
        console.log("error in getting save latter produuct");
        res.send(error)
    }
})
app.post("/removesaveforlaterproduct",async(req,res)=>{
    try{
        const id=req.body.id;
        const removedProduct=await saveForLatterProduct.findByIdAndDelete(id);
        res.send(removedProduct);
    }
    catch(error){
        console.log("error in removing save latter product");
        res.send(error)
    }
})
// save for later ends 

// add to wishlist starts 
app.post("/addtowishlist",async(req,res)=>{
    try{
      const id=req.body.id;
      const products=await product.findByIdAndUpdate(id,{heart:req.body.heart});
      const findWishlistDocById=await wishlistProduct.findById(id);
      if(findWishlistDocById==null){
             newWishlistProduct=new wishlistProduct({
                _id:id,
                productname:req.body.productname,
                productprice:req.body.productprice,
                productimage:req.body.productimage,
                heart:req.body.heart
             })
             const createdWishlistProduct=await newWishlistProduct.save();
             res.send();
      }
      else{
          console.log("this product is already in wishlist");
      }
    }catch(error){
        console.log("error in adding product To wishlist");
        res.send(error);
    }
})
app.post("/removewishlistproduct",async(req,res)=>{
    try{
        const heart=req.body.heart;
        const id=req.body.id;
        const removedWishlistProduct=await wishlistProduct.findByIdAndDelete(id);
        const updateProduct=await product.findByIdAndUpdate(id,{heart:" "},{new:true});
        res.send(updateProduct);
    }catch(error){
        console.log("error in removing ")
        res.send(error);
    }
})
app.post("/geteachwishlistproduct",async(req,res)=>{
    try{
         const id=req.body.id;
         const getWishlistProduct=await wishlistProduct.findById(id); 
         res.send(getWishlistProduct);
    }
    catch(error){
        console.log("error in getting each wishlist product");
    }
})
app.get("/getallwishlistproducts",async(req,res)=>{
    try{
        const allWishlistProducts=await wishlistProduct.find();
        res.send(allWishlistProducts);
    }catch(error){
        console.log("error in getting all wishlist products")
        res.send(error);
    }
})
// add to wishlist starts 

app.listen(3001,()=>{
    console.log(`listeing at port 3001`)
})
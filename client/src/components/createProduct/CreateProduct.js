import React, { useState } from 'react'
import Axios from "axios"
const CreateProduct = () => {  
  const [productImage,setProductImage]=useState("");
  const [productImage1,setProductImage1]=useState("");
  const [productImage2,setProductImage2]=useState("");
  const [productImage3,setProductImage3]=useState("");
  const [productImage4,setProductImage4]=useState("");
  const [productCompanyLogo,setProductCompanyLogo]=useState("");
  const [productName,setProductName]=useState("");
  const [productDeal,setProductDeal]=useState("false");
  const [productIsOrganic,setProductIsOrganic]=useState("false");
  const [productAddPreservatives,setProductAddPreservatives]=useState("false");
  const [productPrice,setProductPrice]=useState("");
  const [productCompany,setProductCompany]=useState("")
  const [productType,setProductType]=useState("")
  const [productFlavor,setProductFlavor]=useState("")
  const [productTaste,setProductTaste]=useState("")
  const [productFoodPreference,setProductFoodPreference]=useState("")
  const [productMaximumShelfTime,setProductMaximumShelfTime]=useState("")
  const [productContainerType,setProductContainerType]=useState("")
  const fileSelectedHandler=(event)=>{
    setProductImage(event.target.files[0])
  }
  const fileSelectedHandler1=(event)=>{
    setProductImage1(event.target.files[0])
  }
  const fileSelectedHandler2=(event)=>{
    setProductImage2(event.target.files[0])
  }
  const fileSelectedHandler3=(event)=>{
    setProductImage3(event.target.files[0])
  }
  const fileSelectedHandler4=(event)=>{
    setProductImage4(event.target.files[0])
  }
  const fileSelectedHandler5=(event)=>{
    setProductCompanyLogo(event.target.files[0])
  }
  const manageProductDeal=()=>{
     if(productDeal==="false"){
       setProductDeal("true");
      }
     else if(productDeal==="true"){
       setProductDeal("false");
     }
  }
  const manageProductIsOrganic=()=>{
     if(productIsOrganic==="false"){
      setProductIsOrganic("true");
      }
     else if(productIsOrganic==="true"){
      setProductIsOrganic("false");
     }
  }
  const manageProductAddedPreservatives=()=>{
     if(productAddPreservatives==="false"){
       setProductAddPreservatives("true");
      }
     else if(productAddPreservatives==="true"){
       setProductAddPreservatives("false");
     }
  }
  const createNewProduct=(event)=>{
     event.preventDefault();
     const formData=new FormData();
     formData.append("productimage",productImage)
     formData.append("productimage1",productImage1)
     formData.append("productimage2",productImage2)
     formData.append("productimage3",productImage3)
     formData.append("productimage4",productImage4)
     formData.append("productcompanylogo",productCompanyLogo)
     formData.append("productname",productName)
     formData.append("productprice",productPrice)
     formData.append("productDeal",productDeal)
     formData.append("productcompany",productCompany)
     formData.append("producttype",productType)
     formData.append("productflavor",productFlavor)
     formData.append("producttaste",productTaste)
     formData.append("productIsOrganic",productIsOrganic)
     formData.append("productAddPreservatives",productAddPreservatives)
     formData.append("productfoodpreference",productFoodPreference)
     formData.append("productmaximumshelftime",productMaximumShelfTime)
     formData.append("productcontainertype",productContainerType)
     console.log(formData);
     Axios({
      method: 'post',
      url: 'http://localhost:3001/createproduct',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
    .then((result)=>{console.log(result)})
    .catch((error)=>{console.log("error in creating product",error)}) 
  }
  return (
    <form  onSubmit={createNewProduct} method="POST" action="http://localhost:3001/createproduct" encType='multipart/form-data' style={{minHeight:"65vh"}}>
        <label>Select Front Product Image : </label><input type="file" name='productimage' onChange={fileSelectedHandler} />
        <br/><br/>
        <label>Select Product Image1 : </label><input type="file" name='productimage1' onChange={fileSelectedHandler1} alt="" />
        <br/><br/>
        <label>Select Product Image2 : </label><input type="file" name='productimage2'  onChange={fileSelectedHandler2} alt="" />
        <br/><br/>
        <label>Select Product Image3 : </label><input type="file" name='productimage3' onChange={fileSelectedHandler3} alt="" />
        <br/><br/>
        <label>Select Product Image4 : </label><input type="file" name='productimage4' onChange={fileSelectedHandler4} alt="" />
        <br/><br/>
        <label>Company Logo : </label><input type="file" name='productcompanylogo' onChange={fileSelectedHandler5} alt="" />
        <br/><br/>
        <label>Enter Product Name : </label><input type="text" name="productname" onChange={(event)=>{setProductName(event.target.value)}} />
        <br/><br/>
        <label>Enter Product Price : </label><input type="text" name="productprice" onChange={(event)=>{setProductPrice(event.target.value)}}/>
        <br/><br/>
        <label>Enter Product Company Name : </label><input type="text" name="productcompany" onChange={(event)=>{setProductCompany(event.target.value)}} />
        <br/><br/>
        <label>Product Deal Of The Day : </label><input type="checkbox" name="productdeal" onClick={manageProductDeal}/>
        <br/><br/>
        <label>Enter Product Type : </label><input type="text" name="producttype" onChange={(event)=>{setProductType(event.target.value)}} />
        <br/><br/>
        <label>Enter Product Flavor : </label><input type="text" name="productflavor" onChange={(event)=>{setProductFlavor(event.target.value)}} />
        <br/><br/>
        <label>Enter Product Taste : </label><input type="text" name="producttaste" onChange={(event)=>{setProductTaste(event.target.value)}} />
        <br/><br/>
        <label>Product Is Organic : </label><input type="checkbox" name="productisorganic" onClick={manageProductIsOrganic}/>
        <br/><br/>
        <label>Preservatives Added : </label><input type="checkbox" name="productaddpreservatives" onClick={manageProductAddedPreservatives}/>
        <br/><br/>
        <label>Food Preference : </label><input type="text" name="productfoodpreference" onChange={(event)=>{setProductFoodPreference(event.target.value)}} />
        <br/><br/>
        <label>Maximum Shelf Time: </label><input type="text" name="productmaximumshelftime" onChange={(event)=>{setProductMaximumShelfTime(event.target.value)}} />
        <br/><br/>
        <label>container type: </label><input type="text" name="productcontainertype" onChange={(event)=>{setProductContainerType(event.target.value)}} />
        <br/><br/>
        <button type='submit' >Create Product</button>
    </form>
  )
}

export default CreateProduct
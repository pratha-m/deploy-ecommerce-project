import React, { useEffect, useState } from 'react'
import "./cartPage.css"
import Axios from "axios"
const CartPage=()=>{
  const [cartProductList,setCartProductList]=useState([]);
  const [saveForLatterProductList,setSaveForLatterProductList]=useState([]);
  // const [quantityValue,setQuantityValue]=useState();
  const getRequest=()=>{
    Axios.get("http://localhost:3001/getcartproducts")
    .then((result)=>{
      setCartProductList(result.data)
      })
    .catch(()=>{console.log("error in fetching cart products")})
  }
  const saveForLatterGetRequest=()=>{
     Axios.get("http://localhost:3001/getsaveforlaterproduct")
     .then((result)=>{
      // console.log(result.data)
      setSaveForLatterProductList(result.data)
    })
     .catch(()=>{console.log("errror in fetching save for latter products")})
  }
  useEffect(()=>{
    getRequest();
    saveForLatterGetRequest();
  },[])
  const increaseQuantity=(id,index)=>{
    const quantityInput=document.getElementById(`noOfProductInput${index}`);
    quantityInput.stepUp();
    Axios.put("http://localhost:3001/updatecart",{quatityvalue:quantityInput.value,id:id})
    getRequest();
  }
  const decreaseQuantity=(id,index)=>{
    const quantityInput=document.getElementById(`noOfProductInput${index}`);
    quantityInput.stepDown();
    Axios.put("http://localhost:3001/updatecart",{quatityvalue:quantityInput.value,id:id})
    getRequest();
  }
  const removeCartProduct=(id)=>{
    Axios.post("http://localhost:3001/removecartproduct",{id:id});
    getRequest();
  }
  const addToSaveForLater=(id,name,image,price,quantity)=>{
    Axios.post("http://localhost:3001/addsaveforlaterproduct",{id:id,productname:name,productimage:image,productprice:price,productquantity:quantity})
    .then(()=>{
      removeCartProduct(id);
      saveForLatterGetRequest();
      getRequest();
    })
    .catch(()=>{console.log("error in add to savelater product")})
  }
  const removeSaveLaterProduct=(id)=>{
     Axios.post("http://localhost:3001/removesaveforlaterproduct",{id:id})
     .then(()=>{
      saveForLatterGetRequest();
      getRequest();
     })
     .catch(()=>{console.log("error in removing product from save later")})
  }
  window.addEventListener("blur",function(){
      saveForLatterGetRequest();
      getRequest();
  })
  const addToCartSavedProduct=(id,name,price,image,quantity)=>{
      Axios.post("http://localhost:3001/addtocart",{id:id,productname:name,productprice:price,productimage:image,productquantity:quantity})     
      .then(()=>{
        removeSaveLaterProduct(id);
        console.log("product add from save later to cart")
      })
      .catch(()=>{console.log("erreor in adding product from save later to cart")})
      console.log("savelater to cart")
  }
  return (
    <div className="cartPage">
      <div className="cartPageContainer">
            <div className="shoppingCartProductsAndPlaceOrderBtn">
            <div className="shoppingCartProducts">
          {cartProductList.map((eachCartProduct,index)=>{
            return(
              <div key={index} className="cartProductContainer">
            <div className="imageAndStaticText">
              <div className="imageContainer">
                <img src={`uploads/${eachCartProduct.productimage}`} alt="not found" className="productImage"/>
              </div>
              <div className="productDetailsTextContainer">
                <div className="productName">{eachCartProduct.productname}</div>
                <div className="productOtherDetails"></div>
                <div className="productPrice">₹{eachCartProduct.productprice}</div>
              </div>
            </div>
            <div className="cartProductAllButtons">
              <div className="increaseAndDecreaseProducts">
                <div className="minusBtnDiv"><button className="minusBtn" onClick={()=>{decreaseQuantity(eachCartProduct._id,index)}}  id={`minusBtn${index}`}><img src="images/minus.png" alt=""/></button></div>
                <div className="noOfProductsInputDiv"><input type="number"  min={1} max={10} defaultValue={eachCartProduct.productquantity} className="noOfProductInput" id={`noOfProductInput${index}`}/></div>
                <div className="plusBtnDiv"><button className="plusBtn" onClick={()=>{increaseQuantity(eachCartProduct._id,index)}} id={`plusBtn${index}`}><img src="images/plus.png" alt=""/></button></div>
                {/* onChange={(event)=>{setQuantityValue(event.target.value)}} */}
              </div>
              <div className="saveForLaterAndRemoveBtns">
                <div className="saveForLatter" onClick={()=>{addToSaveForLater(eachCartProduct._id,eachCartProduct.productname,eachCartProduct.productimage,eachCartProduct.productprice,eachCartProduct.productquantity)}}>Save For Later</div>
                <div className="Remove" onClick={()=>{removeCartProduct(eachCartProduct._id)}}>REMOVE</div>
              </div>
            </div>
              </div>
          )})}
            </div>
            <div className="placeOrderBtnDiv"><button>PLACEORDER</button></div>
            </div>
            <div className="billDetails"></div>        
      </div>  
      <div className="gapContainer"></div>
      <div className="shoppingCartProductsNew">
          {saveForLatterProductList.map((saveLatterProduct,newindex)=>{
            return(
              <div key={newindex} className="cartProductContainer">
            <div className="imageAndStaticText">
              <div className="imageContainer">
                <img src={`uploads/${saveLatterProduct.productimage}`} alt="not found" className="productImage"/>
              </div>
              <div className="productDetailsTextContainer">
                <div className="productName">{saveLatterProduct.productname}</div>
                <div className="productOtherDetails"></div>
                <div className="productPrice">₹{saveLatterProduct.productprice}</div>
              </div>
            </div>
            <div className="cartProductAllButtons">
              <div className="increaseAndDecreaseProducts">
                <div className="minusBtnDiv"><button className="minusBtn" style={{backgroundColor:"#d2d2d1"}} disabled><img src="images/minus.png" alt=""/></button></div>
                <div className="noOfProductsInputDiv"><input type="number" value={saveLatterProduct.productquantity} disabled  className="noOfProductInput" id={`noOfProductInput${newindex}`}/></div>
                <div className="plusBtnDiv"><button className="plusBtn" style={{backgroundColor:"#d2d2d1"}} disabled><img src="images/plus.png" alt=""/></button></div>
                {/* onChange={(event)=>{setQuantityValue(event.target.value)}} */}
              </div>
              <div className="saveForLaterAndRemoveBtns">
                <div className="saveForLatter" onClick={()=>{addToCartSavedProduct(saveLatterProduct._id,saveLatterProduct.productname,saveLatterProduct.productprice,saveLatterProduct.productimage,saveLatterProduct.productquantity)}} >ADD TO CART</div>
                <div className="Remove" onClick={()=>{removeSaveLaterProduct(saveLatterProduct._id)}} >REMOVE</div>
              </div>
            </div>
              </div>
          )})}
      </div>
    </div>
  )
}

export default CartPage
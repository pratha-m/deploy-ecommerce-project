import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "../cartPage/cartPage.css"
import "./wishlist.css"
// import "./wishlist.css"
const WIshlist = () => {
  const [wishlistProducts,setWishlistProducts]=useState([]);
  const fetchWishlistProducts=()=>{
    Axios.get("http://localhost:3001/getallwishlistproducts")
    .then((result)=>{
     setWishlistProducts(result.data)
     // console.log(result.data.length)
   })
    .catch(()=>{console.log("error in fetching wishlist")})
  }
  useEffect(()=>{
      fetchWishlistProducts();
  },[])
  const deleteWishlistProduct=(id)=>{
       console.log(id);
       Axios.post("http://localhost:3001/removewishlistproduct",{id:id})
       .then(()=>{console.log("deleted succcedde wisdhlist product")})
       .catch(()=>{console.log("error in deleting wishlisyt product")})
       fetchWishlistProducts();
  }
  return (
      <div className="myWishlistPage">
            <div className="left"></div>
            <div className="center">
                 <div className="myWishlistText">My Wishlist</div>
                 <div className="allMyWishlistsContainer">
          {wishlistProducts.map((eachWishlistProduct,index) => {
            return (
              <div key={index} className="cartProductContainer">
                <div className="imageAndStaticTextForWishlist">
                  <div className="imageContainer">
                    <img src={`uploads/${eachWishlistProduct.productimage}`} alt="not found" className="productImage" />
                  </div>
                  <div className="productDetailsTextContainer">
                    <div className="productName">{eachWishlistProduct.productname}</div>
                    <div className="productOtherDetails"></div>
                    <div className="productPrice">₹{eachWishlistProduct.productprice}</div>
                  </div>
                  <div className="cartProductAllButtonsForWishlist" onClick={()=>{deleteWishlistProduct(eachWishlistProduct._id)}}>
                  </div>
                </div>
              </div>
            )
          })}
                 </div> 
            </div>
            <div className="right"></div>
      </div>
  )
}
export default WIshlist
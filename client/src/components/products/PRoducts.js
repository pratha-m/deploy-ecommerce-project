import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
const PRoducts = () => {
  const [productList,setProductList]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
     Axios.get("http://localhost:3001/getproducts")
     .then((result)=>{
      setProductList(result.data);
    },[])
     .catch((error)=>{console.log("error in geting products",error)})
  })
  const handleClick=(id)=>{
    console.log(id)
    Axios.post(`http://localhost:3001/geteachproduct`,{id:id})
    .then((result)=>{
      console.log(result)
      navigate("/eachproductpage",{state:result.data})
    })
    .catch((error)=>{console.log("error in getting product",error)})
  }
  const addToWishlist = (id, image, name, price, index) => {
    let addToWishlistBtn = document.getElementById(`addToWishlist${index}`)
    if (addToWishlistBtn.classList.contains("changeToNormalHeart")) {
      Axios.post("http://localhost:3001/addtowishlist", {
        id: id,
        productimage: image,
        productname: name,
        productprice: price,
        heart: "changeToRedHeartImage"
      }).then(() => {
        console.log("add to wishlist")
        Axios.post(`http://localhost:3001/geteachwishlistproduct`, { id: id })
          .then((result) => {
            console.log(result.data)
            addToWishlistBtn.classList.remove("changeToNormalHeart");
            addToWishlistBtn.classList.add(`${result.data.heart}`);
          })
          .catch(() => { console.log("erorr in getting each wishlist product") })
      });
    }
    else {
      Axios.post("http://localhost:3001/removewishlistproduct",{id:id,heart:" "})
      .then((result)=>{
        console.log(result.data)
        addToWishlistBtn.classList.remove("changeToRedHeartImage");
        addToWishlistBtn.classList.add(`${result.data.heart}`);
      })
      .catch(()=>{console.log("error in updating product")})
    }
  }


  return (
    <div>
      <div className="productsContainer">
        {productList.map((eachProduct,index)=>{
          return(
            <div key={index}  style={{ color: "black", textDecoration: "none" }} className="eachItem">
              <div className="eachItemInnerDiv">
                <div className="eachItemImageDiv" onClick={()=>{handleClick(eachProduct._id)}}><img src={`uploads/${eachProduct.productimage}`}  style={{height:"100%",width:"fitContent"}} alt="" /></div>
                <div className="eachItemOtherTextDiv">
                  <div className="productName">{eachProduct.productname}</div>
                  {/* <div div className="stars">
                    <div className="eachStar star1"></div>
                    <div className="eachStar star2"></div>
                    <div className="eachStar star3"></div>
                    <div className="eachStar star4"></div>
                    <div className="eachStar star5"></div>
                  </div> */}
                  <div className="dealOfTheDayDiv">
                    {(eachProduct.productdeal==="true")?(<div className="dealOfTheDay">Deal Of The Day</div>):null}
                  </div>
                  <div className="pricesDiv">
                    <div className="showPrice">{eachProduct.productprice}Rs</div>
                    {/* <div className="cutPrice">Rs:1000</div>
                    <div className="savePrice">Save Rs:600</div> */}
                  </div>
                  {/* <div className="freeDeliveryDiv">Free Delivery</div> */}
                </div>
              </div>
              <div className={`addToWishlistButtonDiv ${(eachProduct.heart===" ")?"changeToNormalHeart":"changeToRedHeartImage"}`} id={`addToWishlist${index}`}  onClick={()=>{addToWishlist(eachProduct._id,eachProduct.productimage,eachProduct.productname,eachProduct.productprice,index)}}></div>
              {/*  */}
            </div>
          )
        })}
      <div className="gapContainer"></div>
    </div>
    </div>
)
}

export default PRoducts;
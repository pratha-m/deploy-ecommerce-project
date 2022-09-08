import React, { useEffect,useState } from 'react'
import "./eachProductPage.css"
import { useLocation,useNavigate} from 'react-router-dom';
import Axios from "axios"
const EachProductPage = () => {
    const [productQuantity,setProductQuantity]=useState(1)
    const location = useLocation();
    const productData=location.state;
    // managing product pictures 
    useEffect(()=>{
        let productImage=document.getElementById("productImage");
        let galleryImg1Div=document.getElementById("galleryImg1Div");
        let galleryImg2Div=document.getElementById("galleryImg2Div");
        let galleryImg3Div=document.getElementById("galleryImg3Div");
        let galleryImg4Div=document.getElementById("galleryImg4Div");
        let galleryImg5Div=document.getElementById("galleryImg5Div");
        let galleryImg1=document.getElementById("galleryImg1")
        let galleryImg2=document.getElementById("galleryImg2")
        let galleryImg3=document.getElementById("galleryImg3")
        let galleryImg4=document.getElementById("galleryImg4")
        let galleryImg5=document.getElementById("galleryImg5")
        galleryImg1Div.addEventListener("mouseover",function(){
            productImage.src=galleryImg1.src;
        })
        galleryImg2Div.addEventListener("mouseover",function(){
            productImage.src=galleryImg2.src;
        })
        galleryImg3Div.addEventListener("mouseover",function(){
            productImage.src=galleryImg3.src;
        })
        galleryImg4Div.addEventListener("mouseover",function(){
            productImage.src=galleryImg4.src;
        })
        galleryImg5Div.addEventListener("mouseover",function(){
            productImage.src=galleryImg5.src;
        })
        let productImageZoomerDiv = document.getElementById("productImageZoomerDiv");
        let cursorDiv = document.getElementById("cursorDiv")
        let productImageElement=document.getElementById("productImage");
        productImageElement.addEventListener("mouseenter", function () {
            productImageElement.addEventListener("mousemove", function (e, i) {
                productImageZoomerDiv.setAttribute("style", "display:flex;")
                let productZoomedImage = document.getElementById("productZoomedImage");
                let backgroundImageSrc = productImage.src
                // console.log(e.clientY)
                productZoomedImage.src = backgroundImageSrc;
                cursorDiv.setAttribute("style", `cursor:pointer;position:absolute;height:50px;width:50px;background-color:grey;border-radius:50%;top:${e.clientY - 210}px;left:${e.clientX - 146}px`)
                productZoomedImage.style.transform = `translate3d(-${e.clientX}px,0px,0px)`;
            })
        })
        productImageElement.addEventListener("mouseleave", function () {
            productImageZoomerDiv.setAttribute("style", "display:none;")
            cursorDiv.setAttribute("style", "display:none;");
        })
    })
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
    const addToCart=(id,productname,productprice,productimage)=>{
          Axios.post("http://localhost:3001/addtocart",{id:id,productname:productname,productprice:productprice,productimage:productimage,productquantity:productQuantity})     
          .then(()=>{
            console.log("product add to cart")
            navigate("/cartpage");
        })
          .catch(()=>{console.log("erreor in adding product to cart")})
    }
    return (
    <div>
    <div className="productAndItsInfoContainer">
        <div className="productContainer">
            <div className="productImageAndGallery">
                <div className="productGallery">
                    <div className="eachImagePositionContainer" id="galleryImg1Div"><img id="galleryImg1" src={`uploads/${productData.productimage}`} alt="..."/></div>
                    <div className="eachImagePositionContainer" id="galleryImg2Div"><img id="galleryImg2" src={`uploads/${productData.productimage1}`} alt="..."/></div>
                    <div className="eachImagePositionContainer" id="galleryImg3Div"><img id="galleryImg3" src={`uploads/${productData.productimage2}`} alt="..."/></div>
                    <div className="eachImagePositionContainer" id="galleryImg4Div"><img id="galleryImg4" src={`uploads/${productData.productimage3}`} alt="..."/></div>
                    <div className="eachImagePositionContainer" id="galleryImg5Div"><img id="galleryImg5" src={`uploads/${productData.productimage4}`} alt="..."/></div>
                </div>
                <div className="productImage" id="productImageDiv">
                    <img src={`uploads/${productData.productimage}`} alt="..." id='productImage'/>
                    <div id="cursorDiv"></div>
                </div>
                <div className="productImageZoomerDiv" id="productImageZoomerDiv">
                        <img src="" alt='' className="productZoomedImage" id="productZoomedImage"/>
                </div>
            </div>
            <div className="buyAndAddToCartButtonContainer">
                <div className="buttonContainer"><button className="buyNowButton button">Buy Now</button></div>
                <div className="buttonContainer"><button  onClick={()=>{addToCart(productData._id,productData.productname,productData.productprice,productData.productimage)}} className="addToCartButton button">Add To Cart</button></div>
            </div>
        </div>
        <div className="productInfoContainer">
            <div className="infoProductCompany">{productData.productcompany}</div>
            <div className="infoProductName">{productData.productname}</div>
            <div className="infoProductPrice">Rs {productData.productprice}</div>
            <div className="infoProductCompanyLogo"> <img src={`uploads/${productData.productcompanylogo}`} alt="" /></div>
           
            <div className="infoProductDeliveryDetails">
                <div className="noOfItemsAndTextDiv">
                    <div className="noOfItemsText">Products :</div>
                    <div className="noOfItemsDiv"><input  type="number" min={1} defaultValue="1" max={10} onChange={(event)=>{setProductQuantity(event.target.value)}} className="noOfItemsInput"/></div>
                </div>
               
            </div>
            <div className="infoProductDetailsOption">
                <div className="productInfoTextAndIcon">
                  <div className="productInfoText">Product Info</div>
                  <div className="productInfoIcon"></div>
                </div>
                <div className="infoProductDetails">
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Brand</div>
                        <div className="infoProductValue">{productData.productname}</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Model Name</div>
                        <div className="infoProductValue">Masala Munch</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Quantity</div>
                        <div className="infoProductValue">81g</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Type</div>
                        <div className="infoProductValue">{productData.producttype}</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Flavor</div>
                        <div className="infoProductValue">{productData.productflavor}</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Taste</div>
                        <div className="infoProductValue">{productData.producttaste}</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Organic</div>
                        <div className="infoProductValue">{(productData.productisorganic==="true")?"YES":"NO"}</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Added Preservatives</div>
                        <div className="infoProductValue">{(productData.productaddpreservatives==="true")?"YES":"NO"}</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Food prefernce</div>
                        <div className="infoProductValue">{productData.productfoodpreference}</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Maximum shelf time</div>
                        <div className="infoProductValue">{productData.productmaximumshelftime}</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Container Type</div>
                        <div className="infoProductValue">{productData.productcontainertype}</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Gournet</div>
                        <div className="infoProductValue">No</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Nutrient Content</div>
                        <div className="infoProductValue">NA</div>
                    </div>
                    <div className="infoProductDetailsRow">
                        <div className="infoProductKey">Ingredient</div>
                        <div className="infoProductValue">NA</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* {{!-- related products container starts --}} */}
    <div className="relatedProductsContainer">
    <div>
      <div className="productsContainer">
        {productList.map((eachProduct,index)=>{
          return(
            <div key={index} onClick={()=>{handleClick(eachProduct._id)}} style={{ color: "black", textDecoration: "none" }} className="eachItem">
              <div className="eachItemInnerDiv">
                <div className="eachItemImageDiv"><img src={`uploads/${eachProduct.productimage}`}  style={{height:"100%",width:"fitContent"}} alt="" /></div>
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
            </div>
          )
        })}
      <div className="gapContainer"></div>
    </div>
    </div>
    </div>
    {/* {{!-- related products container starts --}} */}
    </div>
  )
}

export default EachProductPage
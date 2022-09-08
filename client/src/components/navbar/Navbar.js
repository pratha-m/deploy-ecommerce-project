import React, { useEffect, useState } from 'react'
import "../index.css"
import {Link,useNavigate } from 'react-router-dom'
import Axios from "axios"
const Navbar = () => {
    const [cartProductsNo,setCartProductsNo]=useState(0);
    const [wishlistProductsNo,setWishlistProductsNo]=useState(0);
    const navigate=useNavigate();
    const loginFunc=()=>{
        navigate("/login");
    }
    useEffect(()=>{
        Axios.get("http://localhost:3001/getcartproducts")
        .then((result)=>{
          setCartProductsNo((result.data).length)
          })
        .catch(()=>{console.log("error in fetching cart products")})
    })
    const getWishlistProductNo=()=>{
        Axios.get("http://localhost:3001/getallwishlistproducts")
        .then((result)=>{setWishlistProductsNo((result.data).length)})
        .catch(()=>{console.log("error in fetching wishlist")}) 
    }
    useEffect(()=>{
       getWishlistProductNo();
    })
    const mouseOver=()=>{
        getWishlistProductNo();
    }
  return (
      <div className="navigationContainer">
          <div className="upperNavbar">
              <Link to="/"><div className="websiteLogoContainer"></div></Link>
              <div className="otherOptionsDiv">
                  <div className="moreOptionsAndSubmenu">
                      <div className="moreOptions" onMouseOver={()=>{mouseOver()}}><button onClick={loginFunc} id="loginBtn" className='loginBtnBackground'>Login</button></div>
                      <div className="moreOptionsSubmenu" id='moreOptionsSubmenu'>
                          <div className="eachSubmenuOption submenuSecondOption"><img src="images/createAccount.png" alt="" className="submenuIcons"/><Link to="/createaccount">Create Account</Link></div>
                          <div className="eachSubmenuOption submenuFourthOption"><img src="images/createAccount.png" alt="" className="submenuIcons"/><Link to="/logout">Logout</Link></div>
                          <div className="eachSubmenuOption submenuThirdOption"><img src="images/yourorders.png" alt="" className="submenuIcons"/><Link to="/yourorders">Your Orders</Link></div>
                          <div className="eachSubmenuOption submenuFifthOption">
                            <img src="images/wishlist.png" alt="" className="submenuIcons"/>
                            <Link to="/wishlist">wishlist</Link>
                            <div className="wishlistNo"><div className="innerNoWishlist">{wishlistProductsNo}</div></div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="lowerNavbar">
              <div className="searchAndCart">
                  <div className="searchContainer">
                      <div className="searchBar">
                          <div className="searchInputDiv"><input type="text" className="searchInput"/></div>
                          <div className="searchIconContainer"><img style={{height:"70%",width:"70%"}} src="images/search.png" alt=""/></div>
                      </div>
                  </div>
                  <div className="cartContainer">
                    <Link to="/cartpage" style={{textDecoration:"none",color:"white"}}>
                      <div className="cartDiv">
                          <div className="zeroDiv"><div className="zero">{cartProductsNo}</div></div>
                          <div className="cartTextAndImageDiv">
                              <div className="imageDiv">
                                  <img src="images/cart.png" alt='not found' height="40px" width="40px" />
                              </div>
                              <div className="cartTextDiv">Cart</div>
                          </div>
                      </div>
                    </Link>  
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Navbar
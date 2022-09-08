import React,{useState} from 'react'
import "./loginForm.css"
import Axios from 'axios';
import {Link,useNavigate} from "react-router-dom";

const LoginForm = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const checkEmail=()=>{
     Axios.post("http://localhost:3001/login",{email:email,password:password})
     .then((result)=>{
         if(result.data!==""){
           let loginBtn=document.getElementById("loginBtn");
           loginBtn.innerText=(result.data.name).toUpperCase();
           loginBtn.setAttribute("style","color:black;font-weight:bold")
           loginBtn.classList.remove("loginBtnBackground");
          //  navigate("/");
           let moreOptionsSubmenu=document.getElementById("moreOptionsSubmenu");
           moreOptionsSubmenu.setAttribute("style","height:150px")
           moreOptionsSubmenu.removeChild(moreOptionsSubmenu.children[0]);
         }
         else if(result.data===""){
           console.log("sorry incorrect login details")
         }
     })
     .catch((err)=>{
         console.log(err);
     })
  }
  return (
    <div>
      <div className="_log_createAccountOtpFormContainer" id='loginFormContainer'> 
        <div className="_log_formDiv">
            <div className="_log_otpTextDiv">
                <div className="_log_text1">Sign In</div>
            </div>
            <div className="_log_otpFormDiv">
               <div className="_log_otpForm">
                       <div className="_log_otpInputDiv"><div className="_log_otpInput"><input type="email" onChange={(event)=>{setEmail(event.target.value)}} placeholder="Email" className="_log_otpInputTag otpInputTag1" name="email"/></div></div>  
                       <div className="_log_otpInputDiv _log_passwordInputDiv">
                               <div className="_log_otpInput _log_passwordInput"><input type="password" onChange={(event)=>{setPassword(event.target.value)}} placeholder="Enter Password" className="_log_otpInputTag" name="password" id="passwordInput"/></div>
                               <div className="_log_showPasswordIcon" id="showPasswordIcon"></div>
                       </div>  
                       <div className="_log_createAccountButtonDiv"><div className="_log_createAccountButton"><input value="Sign In" type="button" className="_log_createAccountButtonTag" onClick={checkEmail}/></div></div>
               </div>
            </div>
            <div className="_log_forgotPasswordOptionDiv">
                <div className="_log_forgotPasswordOption"><Link to="/enteremailtoforgotpassword">Forgot Password</Link></div>    
            </div>
            <div className="_log_signInFormOtherOptions">
                <div className="_log_createAccountTextAndLink">    
                <div className="_log_createAccountText">If you not have Account</div>
                <div className="_log_createAccountDiv"><div className="_log_createAccountLink"><Link to="/createaccount">Create Account</Link></div></div>
                </div>
            </div>     
        </div>
      </div>
    </div>
  )
}
export default LoginForm
import React, { useState } from 'react'
import "./enterEmailToForgotPassword.css"
import { Link,useNavigate} from 'react-router-dom'
import Axios from "axios"
const EnterEmailToForgotPassword = (event) => {
  const [email,setEmail]=useState("");
  const navigate=useNavigate();
const fillEmailToForgotPassword=(event)=>{
  Axios.post("http://localhost:3001/enteremailtoforgotpassword",{email:email})
  .then((result)=>{
    console.log(result)
    if(result.data!==''){
      document.getElementById("button").disabled=true;
      document.getElementById("button").style.backgroundColor="#7e9e7e";
      console.log("we find email successfully")
      console.log(result)
      navigate("/getotponemail");
    }
    else{
      console.log("fill correct email")
    }
  })
  .catch(()=>{console.log("sorry some error otp not sends")})
}
  return (
    <div>
      <div className="ForgotPasswordEmailFormContainer">
        <div className="enterEmailFormDiv">
          <div className="forgotByEmailTextDiv">
            <div className="text0">Enter email to forgot password:</div>
            {/* <div className="text2EmailOfPerson"><a href="/">abcd123@gmail.com</a></div> */}
        </div>
        <div className="otpFormDiv0">
          <div className="otpForm0">
            <div className="otpInputDiv0"><div className="otpInput0"><input type="email" onChange={(event)=>{setEmail(event.target.value)}} placeholder="Enter Email" className="otpInputTag0" name="email"/></div></div>
            <div className="createAccountButtonDiv0"><Link to='' id="anchor" style={{color:"white",textDecoration:"none"}} className="createAccountButton0"><input type="button" id="button" onClick={fillEmailToForgotPassword} value="Continue" className="createAccountButtonTag0"/></Link></div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EnterEmailToForgotPassword
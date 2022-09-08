import React, {useState} from 'react'
import Axios from "axios";
import "./createAccount.css"
import {Link,useNavigate} from "react-router-dom";
const CreateAccount = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [rollno,setRollno]=useState("");
  const [password,setPassword]=useState("");
  const [confirmpassword,setConfirmPassword]=useState("");
  const navigate=useNavigate();
  const submitForm=()=>{  
      Axios.post("http://localhost:3001/createaccount",{name:name,email:email,rollno:rollno,password:password,confirmpassword:confirmpassword})
      .then(()=>{navigate("/registrationsucceded")})
  } 
  return (
    <div className="createaccount_createAccountFormContainer">
    <div className="createaccount_createAccountTextAndFormDiv">
         <div className="createaccount_createAccountText">Create Account</div>
         <div style={{height:"100vh"}}>
         <div className="createaccount_createAccountFormDiv">
                 <div className="createaccount_eachInfoDiv createaccount_nameDiv"><div className="createaccount_inputTextDiv">Name:</div><div className="createaccount_inputDiv"><div className="createaccount_input"><input onChange={(event)=>{setName(event.target.value)}} type="text" name="name"/></div></div></div>
                 <div className="createaccount_eachInfoDiv createaccount_phoneNumberDiv"><div className="createaccount_inputTextDiv">Email:</div><div className="createaccount_inputDiv"><div className="createaccount_input"><input onChange={(event)=>{setEmail(event.target.value)}} type="text" /></div></div></div>
                 <div className="createaccount_eachInfoDiv createaccount_phoneNumberDiv"><div className="createaccount_inputTextDiv">Roll No:</div><div className="createaccount_inputDiv"><div className="createaccount_input"><input onChange={(event)=>{setRollno(event.target.value)}} type="text" /></div></div></div>
                 <div className="createaccount_eachInfoDiv createaccount_passwordDiv"><div className="createaccount_inputTextDiv">Password:</div><div className="createaccount_inputDiv"><div className="createaccount_input createaccount_passwordInput"><input onChange={(event)=>{setPassword(event.target.value)}} type="password"/><div className="createaccount_showPasswordIconDiv"></div></div></div></div>
                 <div className="createaccount_eachInfoDiv createaccount_passwordDiv"><div className="createaccount_inputTextDiv">Confirm Password:</div><div className="createaccount_inputDiv"><div className="createaccount_input createaccount_passwordInput"><input onChange={(event)=>{setConfirmPassword(event.target.value)}} type="password"/><div className="createaccount_showPasswordIconDiv"></div></div></div></div>
                 <div className="createaccount_eachInfoDiv createaccount_continueButtonDiv">
                 <div className="createaccount_ifAlreadyAccountExists">
                     <div className="createaccount_ifAlreadyAccountExistsText">or If you already have account</div>
                     <div className="createaccount_ifAlreadyAccountExistsLink"><Link to="/login">Sign In</Link></div>
                 </div>
                 <div className="createaccount_continueButtonOutDiv"><button onClick={submitForm} className="createaccount_continueButton" id='continueButton'>Submit</button></div></div>
         </div>
         </div>
    </div> 
</div> 
  )
}
export default CreateAccount
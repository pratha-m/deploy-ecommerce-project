import React, { useState } from 'react'
import "./createNewPassword.css"
import Axios from "axios";
const CreateNewPassword = () => {
  const [newPassword,setNewPassword]=useState("");
  const [confirmNewPassword,setconfirmNewPassword]=useState("");
  const manageNewPassword=()=>{
      if(newPassword!==confirmNewPassword){
        console.log("password and confirm password must be same");
      }
      else{
          Axios.put("http://localhost:3001/createnewpassword",{password:newPassword,confirmpassword:confirmNewPassword})
          .then((result)=>{
               console.log(result)
           })
          .catch(()=>{console.log("some error in updating password")})
      }
  }
  return (
    <div>
      <div className="createNewPasswordFormContainer">
        <div className="createNewPasswordFormAndHeadingDiv">
          <div className="createNewPasswordHeadingDiv">Create New Password</div>
          <div className="createNewPasswordFormDiv">
            <form className="createNewPasswordForm" method="POST" action="/create_new_password">
              <div className="createNewPassswordInputContainer">
                <div className="createNewPasswordInputAndIconDiv">
                  <div className="createNewPasswordInputDiv"><input type="password" onChange={(event)=>{setNewPassword(event.target.value)}} name="password" className="createNewPasswordInput" placeholder="new password" id="passwordInput"/></div>
                  <div className="showPasswordIconDiv" id="showPasswordIcon"></div>
                </div>
              </div>
              <div className="retypePassswordInputContainer">
                <div className="retypePasswordInputAndIconDiv">
                  <div className="retypePasswordInputDiv"><input type="password" onChange={(event)=>{setconfirmNewPassword(event.target.value)}} name="confirmpassword" className="retypePasswordInput" placeholder="retype password" id="confirmPasswordInput"/></div>
                  <div className="showRetypePasswordIconDiv" id="showRetypePasswordIcon"></div>
                </div>
              </div>
              <div className="signInButtonContainer">
                <div className="signInButtonDiv"><input type="submit" value="Sign In" className="signInButton" onClick={manageNewPassword}/></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewPassword
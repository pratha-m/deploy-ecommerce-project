import React,{useState} from 'react'
import "./getOtpOnEmail.css";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
const GetOtpOnEmail = () => {
  const [otp,setOtp]=useState("");
  const navigate=useNavigate();
  const manageOtpFunct=()=>{
            Axios.post("http://localhost:3001/getotponemail",{otp:otp})
            .then((result)=>{
                console.log(result.data.otpPhase);
                if(result.data.otpPhase==="success"){
                  document.getElementById("otpBtn").disabled=true;
                  document.getElementById("otpBtn").style.backgroundColor="#7e9e7e";
                  navigate("/createnewpassword")
                }
                else{
                  console.log("invalid otp");
                }
            })
            .catch((error)=>{
              console.log("error in otp mangament");
            })
  }
  return (
    <div>
      <div className="createAccountOtpFormContainer1">
        <div className="otpFormDiv1">
          <div className="otpTextDiv1">
            <div className="text11">You will get the otp on Email:</div>
            <div className="text2EmailOfPerson1"><a href="/">abcd123@gmail.com</a></div>
          </div>
          <div className="otpInnerFormDiv">
            <div className="otpForm1">
              <div className="otpInputDiv1"><div className="otpInput1"><input onChange={(event)=>{setOtp(event.target.value)}} type="text" placeholder="Enter Otp" className="otpInputTag1"/></div></div>
              <div className="createAccountButtonDiv1"><div className="createAccountButton1"><input type="button" id='otpBtn' onClick={manageOtpFunct} value="Continue" className="createAccountButtonTag1"/></div></div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default GetOtpOnEmail
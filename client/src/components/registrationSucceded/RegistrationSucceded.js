import React from 'react'
import { Link } from 'react-router-dom'
import "./registrationSuccded.css"
const RegistrationSucceded = () => {
  return (
    <div className='registrationSuccededPage'>
      <div className='regConatiner'>
        <h1>Registration Succeded</h1>
        <h3>Click Here To Login <a href="/login">Login</a></h3>
      </div> 
    </div>
  )
}

export default RegistrationSucceded
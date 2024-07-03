import React from "react";
import { useState } from "react";
import { redirect } from 'react-router-dom';

import '../App.css';
import Navbar from '../components/Navbar';

const SignUp = () => {

  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

    const formSubmitHandler = (e) => {
      e.preventDefault();
      fetch('http://localhost:4000/api/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        })
      })
      .then((res) => {
        console.log(res.status);
        if(res.status === 400 || res.status === 401) {
          alert('Error');
        } else if (res.status === 200) {
          window.sessionStorage.setItem('username', username);
          window.location.href = '/messenger';
        }
      })
    }

    return (
      <>
      <Navbar/>
        <div className="signup-form wrapper">
            <form>
              <div className="form-group">
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Password <span>(*6 or more characters required)</span> </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Repeat Password</label>
                <input type="password"/>
              </div>
              <div className="form-group" style={{display:"inline-block"}}>
                <button onClick={(e) => formSubmitHandler(e)}>Sign Up</button>
                <a href="#0">terms & conditions</a>
              </div>
            </form>
        </div>
      </>
    )
}

export default SignUp;
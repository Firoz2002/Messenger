import React from "react";
import { useState } from "react";

import '../App.css';
import Navbar from '../components/Navbar';

const SignIn = () => {

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

    const formSubmitHandler = async (e) => {
      e.preventDefault();
      const res = await fetch('http://localhost:4000/api/signin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password,
        })
      })
      if(res.status === 400 || res.status === 401) {
        alert('Error');
      } else if (res.status === 201) {
        window.sessionStorage.setItem('username', username);
        window.location.href = '/messenger';
      }
    }

    return (
      <>
      <Navbar/>
        <div className="signin-form wrapper">
            <form>
              <div className="form-group">
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className="form-group">
                <label>Password </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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

export default SignIn;
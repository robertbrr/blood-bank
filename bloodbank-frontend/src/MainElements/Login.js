  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import { useNavigate, useLocation } from "react-router-dom";
  import "../styles.css";
  import UserContext from '../user-context';
  import { useContext } from 'react';

function Login() {
  const [user, setUser] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');  
  const navigate = useNavigate();
  const location = useLocation();
  const to = location.state?.from?.pathname
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //form submit handler
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };

  fetch('http://localhost:8080/v1/login', requestOptions)
    .then(async res => {
      if(!res.ok){
        const text = await res.text();
        throw new Error(text);
      }
      return res.json();
    })
    .then(res=> {  
      const role=res?.role;
      const uuid = res?.uuid;
      console.log(res);
      console.log({"role":`${role}`, "uuid":`${uuid}`})
      
      let path='';
      if (role === "ADMIN") {
        path = "/admin/home";
      } else if (role === "DONOR") {
        path = "/donor/home";
      } else if (role === "DOCTOR"){
        path = "/doctor/home";
      }
      setUser({ id: uuid });
      navigate(to || path, {replace : false});
    
    })
    .catch(e => {
      setErrorMessage(e.message);
      setUser(null);
      return e.message;
    });
  }
  
  //login form jsx
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>

        <div className="input-container">
          <label>Username </label>
          <input 
            type="text" 
            name="uname" 
            required 
            onChange={(event) => setUsername(event.target.value)}/>
        </div>

        <div className="input-container">
          <label>Password </label>
          <input 
            type="password" 
            name="pass" 
            required  
            onChange={(event) => setPassword(event.target.value)} />
        </div>
        
        {errorMessage && <div className="error"> {errorMessage} </div>}

        <div className="button-container">
          <input type="submit" value = "Log in"/>
        </div>

        <Link to="/register">
            <button type ="signup" >Don't have an account?</button>
        </Link>

      </form>
    </div>
  );

  return (
    <div className="app">
      <h1 className="title">WELCOME!</h1>
        <div className="login-form">
          {renderForm}
        </div>
    </div>
  );
}

  export default Login;
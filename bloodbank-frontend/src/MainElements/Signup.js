import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles.css';
import { bloodTypes } from '../utils';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [bloodType, setBloodType] = useState(bloodTypes[0].value);
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { username: username, 
          password: password,
          confirmPassword: confirmPassword,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          bloodType: bloodType
        })
    };

    //save donor
    fetch('http://localhost:8080/v1/donors', requestOptions)
      .then(async res => {
        if(!res.ok){
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      }
      )
      .then(res=> {  
        alert("Success!");
        navigate('../', {replace : true});
      })
      .catch(e => {
        setErrorMessage(e.message);
      });
  }

  //handle select bloodType select
  const handleBloodTypeChange = event => {
    setBloodType(event.target.value);
  }

  //render first form column
  const renderFormFirstColumn =(
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

      <div className="input-container">
        <label>Confirm password </label>
        <input 
          type="password" 
          name="passConfirm" 
          required  
          onChange={(event) => setConfirmPassword(event.target.value)} />
      </div>

      <div className="input-container">
            <label>Email Address </label>
            <input 
              type="text" 
              name="email" 
              required  
              onChange={(event) => setEmail(event.target.value)} />
      </div>
    </form>
  )

  //render second form column
  const renderFormSecondColumn =(
    <form onSubmit={handleSubmit}>
      <div className="input-container">
          <label>First name</label>
          <input 
            type="text" 
            name="fname" 
            required  
            onChange={(event) => setFirstName(event.target.value)} />
      </div>

      <div className="input-container">
          <label>Last name</label>
          <input 
            type="text" 
            name="lname" 
            required  
            onChange={(event) => setLastName(event.target.value)} />
      </div>

      <div className="input-container">
          <label>Phone number </label>
          <input 
            type="text" 
            name="phoneNumber"
            value={phoneNumber} 
            required  
            onChange={(event) => setPhoneNumber(event.target.value)} />
        </div>

        <div className="input-container">
            <label>Blood Type</label>
            <select id ='select' onChange={handleBloodTypeChange} class = "styled-select" >             
                {bloodTypes.map(item => {
                  return (<option key={item.id} value={item.value}> {item.name}</option>);
                })}
            </select>
        </div>
    </form>
  )

  //Form JSX
  return (
    <div className="app">
      <h1 className="title">Enter your information:</h1>
      <div className="split-form-container">
        <div className="split-form">
          {renderFormFirstColumn}
          {renderFormSecondColumn}
        </div>
        <form onSubmit={handleSubmit}>
        {errorMessage && <div className="error"> {errorMessage} </div>}
        <div className="button-container">
          <input type="submit" value = "Sign Up"/>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Signup;
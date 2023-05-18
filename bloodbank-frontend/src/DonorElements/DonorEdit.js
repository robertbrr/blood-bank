import React, { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../user-context';
import { useContext } from 'react';
import '../styles.css';
import { bloodTypes } from '../utils';

const DonorEdit = () => {

  //get uuid from state
  const [user, setUser] = useContext(UserContext)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber,setPhoneNumber] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  
  const navigate = useNavigate();

  useEffect(() => {
    //get donor info
    fetch("http://localhost:8080/v1/donors/" + user.id)
      .then((res) => {
          return res.json();
      }).then((res) => {
          setUsername(res.username);
          setPassword(res.password);
          setConfirmPassword(res.password);
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setEmail(res.email);
          setPhoneNumber(res.phoneNumber);
          setBloodType(res.bloodType);
      }).catch((err) => {
          console.log(err.message);
      });
  },[]);

  const DeleteSelf = () => {
        if (window.confirm('Are you sure you want to delete your account?')) {
            fetch("http://localhost:8080/v1/donors/" + user.id, {
                method: "DELETE"
            }).then((res) => {
                alert('Account successfully deleted.')
                navigate('/');
                setUser(null);
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

  //handle select bloodType select
  const handleBloodTypeChange = event => {
    setBloodType(event.target.value);
  }

  //handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { id: user.id,
          username: username, 
          password: password,
          confirmPassword: confirmPassword,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          bloodType: bloodType
        })
    };

    fetch('http://localhost:8080/v1/donors', requestOptions)
      .then(async res => {
        console.log(res);
        console.log(requestOptions.body);
        if(!res.ok){
          const text = await res.text();
          throw new Error(text);
        }
        return res.text();
      })
      .then(res=> {  
        alert("Success!");
        navigate('/donor/home', {replace : true});
      })
      .catch(e => {
        setErrorMessage(e.message);
        console.log(e.message);
      })
  }

  //render first form column
  const renderFormFirstColumn =(
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label>Username </label>
        <input 
          value = {username}
          type="text" 
          name="uname" 
          required 
          onChange={(event) => setUsername(event.target.value)}/>
      </div>

      <div className="input-container">
        <label>Password </label>
        <input 
          value = {password}
          type="password" 
          name="pass" 
          required  
          onChange={(event) => setPassword(event.target.value)} />
      </div>

      <div className="input-container">
        <label>Confirm password </label>
        <input 
          value={confirmPassword}
          type="password" 
          name="passConfirm" 
          required  
          onChange={(event) => setConfirmPassword(event.target.value)} />
      </div>

      <div className="input-container">
            <label>Email Address </label>
            <input 
              value = {email}
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
            value = {firstName}
            type="text" 
            name="fname" 
            required  
            onChange={(event) => setFirstName(event.target.value)} />
      </div>

      <div className="input-container">
          <label>Last name</label>
          <input 
            value = {lastName}
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
            <select id ='select' onChange={handleBloodTypeChange} class = "styled-select" value = {bloodType} >             
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
            <input type="submit" value = "Confirm"/>
          </div>
        </form>
        <div className="button-container">
          <button onClick={() => { DeleteSelf() }} type="delete-account">Delete Account?</button>
        </div>
      </div>
    </div>
  );
}

export default DonorEdit;
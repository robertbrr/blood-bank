import React, { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from '../user-context';
import { useContext } from 'react';
import '../styles.css';

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
      }).catch((err) => {
          console.log(err.message);
      });
  },[]);

  const DeleteSelf = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {

            //delete appointmnets first because i don't wanna change the db!
            await fetch("http://localhost:8080/v1/donors/" + user.id +"/appointments", {
              method: "DELETE"
            }).catch((err) => {
              console.log(err.message)
            })

            //then delete account
            await fetch("http://localhost:8080/v1/donors/" + user.id, {
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
          phoneNumber: phoneNumber
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

  //form JSX
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input 
            value ={username}
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
            value={password}
            required  
            onChange={(event) => setPassword(event.target.value)} />
        </div>

        <div className="input-container">
          <label>Confirm Password </label>
          <input 
            type="password" 
            name="pass" 
            value={confirmPassword}
            required  
            onChange={(event) => setConfirmPassword(event.target.value)} />
        </div>

        <div className="input-container">
          <label>First name </label>
          <input 
            type="text" 
            name="fname" 
            value={firstName}
            required  
            onChange={(event) => setFirstName(event.target.value)} />
        </div>

        <div className="input-container">
          <label>Last name </label>
          <input 
            type="text" 
            name="lname" 
            value={lastName}
            required  
            onChange={(event) => setLastName(event.target.value)} />
        </div>

        <div className="input-container">
          <label>Email Address </label>
          <input 
            type="text" 
            name="email"
            value={email} 
            required  
            onChange={(event) => setEmail(event.target.value)} />
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

        {errorMessage && <div className="error"> {errorMessage} </div>}

        <div className="button-container">
          <input type="submit" value = "Confirm"/>
        </div>
      </form>
      <div className="button-container">
        <button onClick={() => { DeleteSelf() }} type="delete-account">Delete Account?</button>
      </div>
    </div>
  );

  return (
    <div className="app">
      <h1 className="title">Enter the information:</h1>
        <div className="login-form">
          {renderForm}
        </div>
    </div>
  );
}

export default DonorEdit;
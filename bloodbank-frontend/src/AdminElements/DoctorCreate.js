import React, { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../styles.css';

const DoctorCreate = () => {

  var [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cnp,setCnp] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  const [centers, setCenters] = useState([]);
  const [center, setCenter] = useState('');

  //get donation centers for select
  useEffect(()=>{
    fetch('http://localhost:8080/v1/donation-centers')
      .then(async res => {
        console.log(res);
        if(!res.ok){
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      }
      )
      .then(res=> {  
        setCenters(res);
        if(res.length >0){
          setCenter(res[0].id);
        }
        console.log(centers);
      })
      .catch(e => {
        setErrorMessage(e.message);
        console.log(e.message);
      });
  },[]);

  //handle select change event
  const handleSelectChange = event => {
    setCenter(event.target.value);
  };

  //submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { 
          username: username, 
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
          cnp:cnp,
          donationCenterId: center
        })
    };

  fetch('http://localhost:8080/v1/doctors', requestOptions)
    .then(async res => {
      console.log(res);
      console.log(requestOptions.body);
      if(!res.ok){
        const text = await res.text();
        throw new Error(text);
      }
      return res.text();
    }
    )
    .then(res=> {  
      alert("Success!");
      navigate('/admin/doctors', {replace : true});
    })
    .catch(e => {
      setErrorMessage(e.message);
      console.log(e.message);
    });
  }

  //form jsx
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
            type="text" 
            name="pass" 
            required  
            onChange={(event) => setPassword(event.target.value)} />
        </div>

        <div className="input-container">
          <label>First name </label>
          <input 
            type="text" 
            name="fname"     
            required  
            onChange={(event) => setFirstName(event.target.value)} />
        </div>

        <div className="input-container">
          <label>Last name </label>
          <input 
            type="text" 
            name="lname" 
            required  
            onChange={(event) => setLastName(event.target.value)} />
        </div>

        <div className="input-container">
          <label>Email Address </label>
          <input 
            type="text" 
            name="email"
            required  
            onChange={(event) => setEmail(event.target.value)} />
        </div>

        <div className="input-container">
          <label>CNP</label>
          <input 
            type="text" 
            name="email" 
            required  
            onChange={(event) => setCnp(event.target.value)} />
        </div>

        <div className="input-container">
            <label>Donation Center</label>
            <select onChange={handleSelectChange}>
                {centers.map(item => 
                    {return (<option key={item.id} value={item.id}> {item.name +', ' + item.address}</option>);
                })}
            </select>   
        </div>

        {errorMessage && <div className="error"> {errorMessage} </div>}

        <div className="button-container">
          <input type="submit" value = "Confirm"/>
        </div>
      </form>
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

export default DoctorCreate;
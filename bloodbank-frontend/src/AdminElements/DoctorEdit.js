import React, { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import '../styles.css';

const DoctorEdit = () => {
  //get uuid
  const url = window.location.pathname;
  const docid= url.substring(url.lastIndexOf('/')+1);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cnp,setCnp] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [center, setCenter] = useState('');
  const [centers,setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //get doctor info
    fetch("http://localhost:8080/v1/doctors/" + docid)
      .then((res) => {
          return res.json();
      }).then((res) => {
          setUsername(res.username);
          setPassword(res.password);
          setFirstName(res.firstName);
          setLastName(res.lastName);
          setEmail(res.email);
          setCnp(res.cnp);
          setCenter(res.donationCenter.id);
      }).catch((err) => {
          console.log(err.message);
      });

    //get all centers for select box      
    fetch('http://localhost:8080/v1/donation-centers')
      .then(async res => {
        console.log(res);
        if(!res.ok){
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then(res=> {  
        setCenters(res);
        //console.log(centers);
      })
      .catch(e => {
        setErrorMessage(e.message);
        console.log(e.message);
      });
  },[]);

  //handle select donation center change event
  const handleSelectChange = event => {
    setCenter(event.target.value);
  };

  //handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { id: docid,
          username: username, 
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
          cnp:cnp,
          donationCenter: {id: center}
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
      })
      .then(res=> {  
        alert("Success!");
        navigate('/admin/doctors', {replace : true});
      })
      .catch(e => {
        setErrorMessage(e.message);
        console.log(e.message);
      })
  }

   //render first form column
   const renderFormFirstColumn = (
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
        <label>Password</label>
        <input 
          value = {password}
          type="text" 
          name="pass" 
          required  
          onChange={(event) => setPassword(event.target.value)} />
      </div>

      <div className="input-container">
        <label>First name</label>
        <input 
          value={firstName}
          type="text" 
          name="fname"     
          required  
          onChange={(event) => setFirstName(event.target.value)} />
      </div>

      <div className="input-container">
        <label>Last name</label>
        <input 
          value={lastName}
          type="text" 
          name="lname" 
          required  
          onChange={(event) => setLastName(event.target.value)} />
      </div>
    </form>
)

const renderFormSecondColumn = (
  <form onSubmit={handleSubmit}>
    <div className="input-container">
      <label>Email Address </label>
      <input 
        value={email}
        type="text" 
        name="email"
        required  
        onChange={(event) => setEmail(event.target.value)} />
    </div>

    <div className="input-container">
      <label>CNP</label>
      <input 
        value = {cnp}
        type="text" 
        name="email" 
        required  
        onChange={(event) => setCnp(event.target.value)} />
    </div>

    <div className="input-container">
        <label>Donation Center</label>
        <select onChange={handleSelectChange} class = "styled-select" value={center}>
            {centers.map(item => 
                {return (<option key={item.id} value={item.id}> {item.name +', ' + item.address}</option>);
            })}
        </select>   
    </div>
  </form>
)

return (
  <div className="app">
    <h1 className="title">Enter the information:</h1>
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
      </div>
  </div>
  );
}
export default DoctorEdit;
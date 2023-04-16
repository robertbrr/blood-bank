import React, { useState ,useEffect} from 'react';
import {useNavigate, useLocation } from "react-router-dom";
import UserContext from '../user-context';
import { useContext } from 'react';
import '../styles.css';

const AppointmentCreate = () => {

  //get uuid from state
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate();
  const [date,setDate] = useState(new Date().toISOString().split("T")[0]);
  const [errorMessage,setErrorMessage] = useState('');
  const {state:center} = useLocation();

  useEffect(()=>{console.log(date)});

  const handleDateChange = event => {
    setDate(event.target.value);
    // console.log(date);
  };

  //from date to LocalDate
  const convertToDate = () => {
    const selDate = new Date(date)
    const year = selDate.getFullYear();
    const month = selDate.getMonth() + 1; //0 index in JS
    const day = selDate.getDate();
    //this certainly does things
    const localDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    console.log(localDate);
    return localDate;
  };

  //handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { donorId: user.id,
          date: convertToDate(),
          donationCenter: center
        })
    };

    fetch('http://localhost:8080/v1/appointments', requestOptions)
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
        alert("Appointment scheduled successfully!");
        navigate('/donor/centers');
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
          <label>Date </label>
          <input type="date" value = {date} onChange={(e)=>handleDateChange(e)} />
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
      <h1 className="title">Schedule at {center.name}</h1>
        <div className="login-form">
          {renderForm}
        </div>
    </div>
  );
}

export default AppointmentCreate;
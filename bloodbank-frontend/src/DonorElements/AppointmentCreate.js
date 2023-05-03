import React, { useState ,useEffect} from 'react';
import {useNavigate, useLocation } from "react-router-dom";
import UserContext from '../user-context';
import { useContext } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import '../styles.css';

const AppointmentCreate = () => {

  //get uuid from state
  const [user, setUser] = useContext(UserContext)
  const navigate = useNavigate();
  const months_available = 3;
  const currDate = new Date().toISOString().split("T")[0];
  const [date,setDate] = useState(new Date().toISOString().split("T")[0]);
  const [fullDays, setFullDays] = useState([]);
  const [errorMessage,setErrorMessage] = useState('');
  const {state:center} = useLocation();

  const options = [
    {id: 1, name: "Email"},
    {id: 2, name: "SMS"}
  ]

  const [reminderType, setReminderType] = useState(options[0].name);

  useEffect(()=>{
    //fetch full days
    fetch(`http://localhost:8080/v1/donation-centers/${center.id}/full-days?maxDonationsPerDay=${center.maxDonationsPerDay}` + 
          `&dateLimit=${convertToDate(dayjs(currDate).add(months_available, 'month'))}`)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then(res =>{
          console.log(res) 
          setFullDays(res)
        })
        .catch(e => {
          console.log(e.message);
        })},[]);


  //from date to LocalDate
  const convertToDate = (date_param) => {
    const selDate = new Date(date_param)
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

  
  //disable dates
  //i made it so a user can only schedule x months in advance
  function disableDates(date) {
    let convertedDate = convertToDate(date);
    return dayjs(date).isBefore(dayjs(currDate))
    || dayjs(date).isAfter(dayjs(currDate).add(months_available, 'month'))
    || date.getDay() === 0 || date.getDay() === 6 || fullDays.includes(convertedDate); 
  }

  function handleDateChange(date) {
    setDate(date);
    console.log(date);
  };

  //handle select change reminder option event
  const handleSelectChange = event => {
    setReminderType(event.target.value);
  };

  //handle form submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        { donorId: user.id,
          date: convertToDate(date),
          donationCenter: center,
          reminderType: reminderType
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker 
                defaultValue = {dayjs(new Date().toISOString().split("T")[0])}
                
                shouldDisableDate={(e)=>disableDates(e.$d)}
                onChange={(e)=>handleDateChange(e.$d)}
              />
           </DemoContainer>
          </LocalizationProvider> 
        </div>

        <div className="input-container">
            <label>Notify me by</label>
            <select id ='select' onChange={handleSelectChange} >             
                {options.map(item => {
                  return (<option key={item.id} value={item.id}> {item.name}</option>);
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
      <h1 className="title">Schedule at {center.name}</h1>
        <div className="login-form">
          {renderForm}
        </div>
    </div>
  );
}

export default AppointmentCreate;
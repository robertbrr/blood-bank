import {Link, NavLink } from 'react-router-dom'
import UserContext from '../user-context';
import '../navbar.css'
import { useContext, useState,useEffect } from 'react';

const DoctorNavbar = () => {
  const [user, setUser] = useContext(UserContext);
  const [center, setCenter] = useState('')

  useEffect(()=>{
    fetch("http://localhost:8080/v1/doctors/" + user.id + "/donation-center")
            .then((res) => {
                return res.json();
            }).then((res) => {
                setCenter(res);
                //console.log(res);
            }).catch((err) => {
                console.log(err.message);
            });
  },[])

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-elements">
          <ul>
          <li>
              <NavLink to="/doctor/home">Home</NavLink>
            </li>
            <li>
            <NavLink to={"/doctor/appointments"} state={center}>View Appointments at {center.name}</NavLink>
            </li>
            <NavLink to ='/' onClick={() =>setUser(null)} >Log Out</NavLink>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default DoctorNavbar
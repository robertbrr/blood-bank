import { NavLink } from 'react-router-dom'
import UserContext from '../user-context';
import '../navbar.css'
import { useContext } from 'react';

const DonorNavbar = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-elements">
          <ul>
          <li>
              <NavLink to="/donor/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/donor/centers">Donation Centers</NavLink>
            </li>
            <li>
              <NavLink to="/donor/appointments">View Appointments</NavLink>
            </li>
            <li>
              <NavLink to="/donor/edit">Edit Info</NavLink>
            </li>
              <NavLink to ='/' onClick={() =>setUser(null)} >Log Out</NavLink>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default DonorNavbar
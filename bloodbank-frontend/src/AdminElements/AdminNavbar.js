import {Link, NavLink } from 'react-router-dom'
import UserContext from '../user-context';
import '../navbar.css'
import { useContext } from 'react';

const AdminNavbar = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-elements">
          <ul>
          <li>
              <NavLink to="/admin/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/admin/doctors">Doctors</NavLink>
            </li>
              <NavLink to ='/' onClick={() =>setUser(null)} >Log Out</NavLink>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from './user-context';

import Login from "./MainElements/Login";
import Signup from "./MainElements/Signup";

import AdminNavbar from './AdminElements/AdminNavbar';
import AdminPage from "./AdminElements/AdminPage";
import DoctorEdit from "./AdminElements/DoctorEdit";
import DoctorListing from "./AdminElements/DoctorListing";
import DoctorCreate from "./AdminElements/DoctorCreate";

import DonorNavbar from "./DonorElements/DonorNavbar";
import DonorEdit from './DonorElements/DonorEdit';
import DonorPage from './DonorElements/DonorPage';
import CenterListing from "./DonorElements/CenterListing";
import AppointmentCreate from "./DonorElements/AppointmentCreate"
import AppointmentListing from "./DonorElements/AppointmentListing"

import DoctorNavbar from "./DoctorElements/DoctorNavbar";
import DoctorPage from "./DoctorElements/DoctorPage";
import AppointmentListingDoctor from "./DoctorElements/AppointmentListingDoctor";

function App() {

    return (
      <UserProvider>
       <BrowserRouter>
         <Routes>
          
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />

          <Route path="/admin/home" element={<> <AdminNavbar/> <AdminPage/> </>}/>
          <Route path="/admin/doctors" element={<> <AdminNavbar/> <DoctorListing/> </>}/>
          <Route path="/admin/doctors/edit/:id" element={<> <AdminNavbar/> <DoctorEdit/> </>}/>
          <Route path="/admin/doctors/create" element={<> <AdminNavbar /> <DoctorCreate /> </>}/>

        
          <Route path='/donor/home' element={<> <DonorNavbar/> <DonorPage/> </>}/>
          <Route path='/donor/centers' element={<> <DonorNavbar/> <CenterListing/> </>}/>
          <Route path='/donor/edit' element={<> <DonorNavbar/> <DonorEdit/> </>}/>
          <Route path='/donor/schedule' element={<> <DonorNavbar/> <AppointmentCreate/> </>}/>
          <Route path='/donor/appointments' element={<> <DonorNavbar/> <AppointmentListing/> </>}/>
        
          <Route path='/doctor/home' element={<> <DoctorNavbar/> <DoctorPage/> </>}/>
          <Route path='/doctor/appointments' element={<> <DoctorNavbar/> <AppointmentListingDoctor/> </>}/>

        </Routes>
      </BrowserRouter>
    </UserProvider>
        
    );
}

export default App;

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../styles.css'
import { viewAppointmentsOptions } from "../utils";

const AppointmentListingDoctor = () => {
    const [appointmentsData, appointmentsDataChange] = useState([]);
    const {state:center} = useLocation();
    const [pageNo,setPageNo] = useState(1);
    const pageSize = 8;
    const [pageCount,setPageCount] = useState(0);
    const [showPages,setShowPages] = useState(true);
    const [currOpt,setCurrOpt] = useState(1);
    const navigate = useNavigate();

    const handleSelectChange = event => {
        console.log(event.target.value);
        setCurrOpt(event.target.value);
        if(event.target.value == 1){
            setShowPages(true);
            fetchAllAppointments(pageNo,pageSize);
        }else{
            setShowPages(false);
            fetchTodayAppointments()
        }
      };

    //confirm appt handler    
    const ConfirmAppointment = (id) =>{
        navigate(`/doctor/appointments/${id}/confirm`);
    }

    //view results handler    
    const ViewResults = (id) =>{
        navigate(`/doctor/appointments/${id}/blood-report`);
    }

    //fetch all appts
    function fetchAllAppointments(pageNoParam, pageSizeParam){
        fetch(`http://localhost:8080/v1/donation-centers/${center.id}/appointments?pageNo=${pageNoParam-1}&pageSize=${pageSizeParam}`)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                console.log(resp);
                appointmentsDataChange(resp.content);

                setPageCount(resp.totalPages);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    //fetch all appts today
    function fetchTodayAppointments(){
        fetch(`http://localhost:8080/v1/donation-centers/${center.id}/appointments-today`)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                console.log(resp);
                appointmentsDataChange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    useEffect(() => {fetchAllAppointments(pageNo,pageSize)},[]);

    const handlePageChange = (event,value) => {
        setPageNo(value);
        fetchAllAppointments(value,pageSize);
        console.log(value);
      };

    return (
        <div className="app2">
            <h6></h6>
            <select id ='select' onChange={handleSelectChange} class = "styled-select">             
                {viewAppointmentsOptions.map(item => {
                return (<option key={item.id} value={item.id}> {item.name}</option>);
                })}
            </select> 
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class = "left-align">Donation Center</th>
                            <th class = "left-align">Date</th>
                            <th class = "left-align">Status</th>
                            <th class = "left-align">Donor</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentsData &&
                            appointmentsData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.donationCenter.name+', '+item.donationCenter.address+', '+item.donationCenter.area}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                    <td>{item.donor.firstName +' ' + item.donor.lastName}</td>
                                    <td class = "center-align">{item.status === "PENDING" && <button onClick={() => { ConfirmAppointment(item.id) }} type="edit">Confirm</button> ||
                                    item.status === "CONFIRMED" && <button onClick={() => { ViewResults(item.id) }} type="edit">View Results</button>}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {showPages &&
                <Stack spacing={2}>
                    <Pagination count={pageCount} page={pageNo} onChange={handlePageChange} />
                </Stack>}
        </div>
    );
}

export default AppointmentListingDoctor;



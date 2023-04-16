import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AppointmentListingDoctor = () => {
    const [appointmentsData, appointmentsDataChange] = useState([]);
    const {state:center} = useLocation();

    //confirm appt handler    
    const ConfirmAppointment = (id) =>{
        if (window.confirm('Are you sure you want to confirm the selected appointment?')) {
            fetch("http://localhost:8080/v1/appointments/" + id+'/confirm', {
                method: "PUT",

            })
            .then(async res => {
                console.log(res);
                if(!res.ok){
                  const text = await res.text();
                  throw new Error(text);
                }
                return res.text();
            })
            .then((res) => {
                alert(res);
                fetchAppointments();
            }).catch((err) => {
                console.log(err.message);
                alert(err.message);
            })
        }
    }

    //fetch appts
    function fetchAppointments(){
        fetch("http://localhost:8080/v1/donation-centers/"+center.id+"/appointments")
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

    useEffect(() => {fetchAppointments()},[]);

    return (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Donation Center</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Donor</th>
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
                                        <td><button onClick={() => { ConfirmAppointment(item.id) }} type="edit">Confirm</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
    );
}

export default AppointmentListingDoctor;



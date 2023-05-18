import { useEffect, useState } from "react";
import UserContext from '../user-context';
import { useContext } from 'react';
import { convertToDate } from "../utils";
import { useNavigate } from "react-router-dom";

const AppointmentListing = () => {
    const [appointmentsData, appointmentsDataChange] = useState([]);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    //view results handler    
    const ViewResults = (id) =>{
        navigate(`/donor/appointments/${id}/blood-report`);
    }

    //cancel appointment handler
    const CancelAppointment = ({ id: id, date: date }) => {
        if (window.confirm('Are you sure you want to cancel the selected appointment?')) {
            fetch("http://localhost:8080/v1/appointments/" + id, {
                method: "DELETE",
                body: JSON.stringify(convertToDate(date)),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(async res => {
                    console.log(res);
                    if (!res.ok) {
                        const text = await res.text();
                        throw new Error(text);
                    }
                    return res.text();
                })
                .then((res) => {
                    alert(res);
                    //window.location.reload();
                    fetchAppointments();
                })
                .catch((err) => {
                    console.log(err.message);
                    alert(err.message);
                })
        }
    }

    //fetch appts
    function fetchAppointments() {
        fetch(`http://localhost:8080/v1/appointments/donors/${user.id}`)
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

    useEffect(() => { fetchAppointments(); console.log(user) }, []);

    return (
        <div className="app2">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="left-align">Donation Center</th>
                            <th class="left-align">Date</th>
                            <th class="left-align">Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointmentsData &&
                            appointmentsData.map(item => (
                                <tr key={item.id}>
                                    <td>{item.donationCenter.name + ', ' + item.donationCenter.address + ', ' + item.donationCenter.area}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        {item.status === "CONFIRMED" && <button onClick={() => {ViewResults(item.id) }} type="edit">Results</button>}
                                        {item.status === "PENDING" && <button onClick={() => { CancelAppointment({ id: item.id, date: item.date }) }} type="delete">Cancel</button>}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppointmentListing;



import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../user-context';
import dayjs from 'dayjs';

const CenterListing = () => {
    const [centers, centersDataChange] = useState(null);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const DURATION_BETWEEN_APPOINTMENTS = 6;

    //schedule button handler
    const ScheduleAppointment = (center) => {
        //we check if we can actually schedule an appointment
        fetch(`http://localhost:8080/v1/donors/${user.id}/appointments?canScheduleCheck=true`)
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            console.log(res);
            if(res.length === 0){
                navigate('/donor/schedule',{state:center});
            }
            else{
                alert(
                    `Can not schedule appointment.\n`+
                    `Your last appointment was scheduled on ${res[0].date}!\n`+
                    `You can donate again starting from ${dayjs(res[0].date).add(DURATION_BETWEEN_APPOINTMENTS, 'month').format().split("T")[0]}.`)
            }
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    //time parsers
    function hourParser(time){
        let k = parseInt(Number(time)/100);
        if(k<10){
            return '0' + k;
        }
        else return k;
    }

    function minuteParser(time){
        let k = parseInt(Number(time))%100;
        if(k<10){
            return '0'+k;
        }
        else return k;
    }

    function scheduleParser(startHour, endHour){
        return hourParser(startHour) + ':'+ minuteParser(startHour) + ' - ' +
               hourParser(endHour) + ':'+ minuteParser(endHour);
    }

    //fetch centers
    function fetchCenters(){
        fetch("http://localhost:8080/v1/donation-centers")
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                console.log(resp);
                centersDataChange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    useEffect(() => {fetchCenters()},[]);

    return (
        <div className="app2">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th class = "left-align">Name</th>
                                <th class = "left-align">Address</th>
                                <th class = "left-align">Location</th>
                                <th class = "left-align">Schedule</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {centers &&
                                centers.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.area}</td>
                                        <td>{scheduleParser(item.startHour, item.endHour)}</td>
                                        <td><button onClick={() => { ScheduleAppointment(item) }} type="edit">Schedule</button>
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

export default CenterListing;



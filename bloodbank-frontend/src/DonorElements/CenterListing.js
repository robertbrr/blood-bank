import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CenterListing = () => {
    const [centers, centersDataChange] = useState(null);
    const navigate = useNavigate();

    //schedule button handler
    const ScheduleAppointment = (center) => {
        navigate('/donor/schedule',{state:center});
    }

    //time parsers
    function hourParser(time){
        let k = parseInt(Number(time)/100);
        if(k<10){
            return '0'+k;
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
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Location</th>
                                <th>Schedule</th>
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
                                        <td>{
                                            hourParser(item.startHour) + ':'+ minuteParser(item.startHour)+' - '+
                                            hourParser(item.endHour) + ':'+ minuteParser(item.endHour)
                                        }</td>
                                        <td><button onClick={() => { ScheduleAppointment(item) }} type="edit">Schedule</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
    );
}

export default CenterListing;



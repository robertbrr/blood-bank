import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorListing = () => {
    const [doctorData, doctorDataChange] = useState(null);
    const navigate = useNavigate();

    //edit button handler
    const EditDoctor = (id) => {
        navigate("edit/" + id);
    }

    //delete button handler
    const DeleteDoctor = (id) => {
        if (window.confirm('Are you sure you want to remove the selected doctor?')) {
            fetch("http://localhost:8080/v1/doctors/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                //window.location.reload();
                fetchDocs();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    //fetch docs (in useEffect, once, and after we remove a doctor)
    function fetchDocs(){
        fetch("http://localhost:8080/v1/doctors")
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                console.log(resp);
                doctorDataChange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    useEffect(() => {fetchDocs()},[]);

    //table JSX
    return (
        <div className="app2">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th class = "left-align">Username</th>
                                <th class = "left-align">Password</th>
                                <th class = "left-align">First Name</th>
                                <th class = "left-align">Last Name</th>
                                <th class = "left-align">Email</th>
                                <th class = "left-align">CNP</th>
                                <th class = "left-align">Center</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctorData &&
                                doctorData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.username}</td>
                                        <td>{item.password}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.cnp}</td>
                                        <td>{item.donationCenter.name + ', '+ item.donationCenter.address}</td>
                                        <td><button onClick={() => { EditDoctor(item.id) }} type="edit">Edit</button>
                                            <button onClick={() => { DeleteDoctor(item.id) }} type="delete">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <button type = "edit" onClick={()=>navigate("create")}>+</button>
                </div>
        </div>
    );
}

export default DoctorListing;


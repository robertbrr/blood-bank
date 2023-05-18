import { bloodReport } from "../utils";
import { useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../user-context';

const BloodReportFiller = () => {
  const [inputValues, setInputValues] = useState(Array(16).fill(''));
  const { id } = useParams()
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext)

  const handleChange = (index, value) => {
    const newValues = [...inputValues];
    newValues[index] = value;
    setInputValues(newValues);
  };

  //confirm appt and save results handler   
  const ConfirmAppointment = () => {


    if (window.confirm('Are you sure you want to confirm the selected appointment?')) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          { glucose: inputValues[0],
            sodium: inputValues[1],
            potassium: inputValues[2],
            chloride: inputValues[3],
            magnesium: inputValues[4],
            calcium: inputValues[5],
            cholesterol: inputValues[6],
            protein: inputValues[7],
            iron: inputValues[8],
            bilirubin: inputValues[9],
            albumin: inputValues[10],
            globulin: inputValues[11],
            wbc: inputValues[12],
            rbc: inputValues[13],
            hgb: inputValues[14],
            hct: inputValues[15],
            appointment: {id: id},
            doctor: {id: user.id}
          })
      };

      //first we add the blood report 
      const addBloodReport = fetch(`http://localhost:8080/v1/blood-reports`, requestOptions)
        .then(async res => {
          console.log(res);
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text);
          }
          return res.text();
        })
        .then((res) => {
          console.log(inputValues);
          //then we confirm the appointment
          return fetch(`http://localhost:8080/v1/appointments/${id}/confirm`, {method: "PUT"});
        })

      //handling fetch result  
      addBloodReport.then(async res => {
        console.log(res);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.text();
      })
        .then((res) => {
          alert(res);
          console.log(inputValues);
          navigate("/doctor/home");
        }).catch((err) => {
          console.log(err.message);
          alert(err.message);
        })
    }
  }

  return (
    <div className="app2">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th class="left-align">Test</th>
              <th class="left-align">Result</th>
              <th class="left-align">Units</th>
              <th class="left-align">Reference range</th>
            </tr>
          </thead>
          <tbody>
            {bloodReport.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="text"
                    onChange={(e) => handleChange(index, e.target.value)}
                  />
                </td>
                <td>{item.units}</td>
                <td>{item.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button onClick={() => { ConfirmAppointment() }} type="edit">Confirm</button>
      </div>
      <h1>{'\u00A0'}</h1>
    </div>
  );
}

export default BloodReportFiller;
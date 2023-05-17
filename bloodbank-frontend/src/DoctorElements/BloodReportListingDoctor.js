
import '../styles.css'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BloodReportListingDoctor = () => {
  const [bloodReport, setBloodReport] = useState(null);
  const [bloodReportArray, setBloodReportArray] = useState(null);
  const { appointmentId } = useParams()

  const extractFields = (bloodReportParam) => {
      const fieldsToExtract = ['glucose', 'sodium', 'potassium', 'chloride',
          'magnesium', 'calcium', 'cholesterol', 'protein', 'iron', 'bilirubin',
          'albumin', 'globulin', 'wbc', 'rbc', 'hgb', 'hct'];
      const extractedFieldsArray = fieldsToExtract.map((field) => bloodReportParam[field]);
      setBloodReportArray(extractedFieldsArray);
  }

  const fetchBloodReport = (id) =>{
      fetch(`http://localhost:8080/v1/blood-reports/${id}`,
          { method: "GET", headers: { 'Content-Type': 'application/json' } })
          .then(async res => {
              console.log(res);
              if (!res.ok) {
                  const text = await res.text();
                  throw new Error(text);
              }
              return res.text();
          })
          .then(async (res) => {
              setBloodReport(res);
              console.log(bloodReport);
              return res;
          })
          .then((res)=>{extractFields(res); console.log(bloodReportArray)})
          .catch((err) => {
              console.log(err.message);
              alert(err.message);
          })
  }
  useEffect(() => { fetchBloodReport(1751) },[]);
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
                      {bloodReport && bloodReport.map((item, index) => (
                          <tr key={index}>
                              <td>{item.name}</td>
                              <td>{bloodReportArray[index]}</td>
                              <td>{item.units}</td>
                              <td>{item.reference}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          <h1>{'\u00A0'}</h1>
      </div>
  );
}

export default BloodReportListingDoctor;
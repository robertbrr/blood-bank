import '../styles.css'
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bloodReport } from '../utils';

const BloodReportListingDoctor = () => {
  let bloodReportObject;
  const [bloodReportArray, setBloodReportArray] = useState([]);
  const { id } = useParams()

  const extractFields = async () => {
      const fieldsToExtract = ['glucose', 'sodium', 'potassium', 'chloride',
          'magnesium', 'calcium', 'cholesterol', 'protein', 'iron', 'bilirubin',
          'albumin', 'globulin', 'wbc', 'rbc', 'hgb', 'hct'];
      const extractedFields = fieldsToExtract.map((field) => bloodReportObject[field]);
      setBloodReportArray(extractedFields);
      
  }

  const fetchBloodReport = () =>{
      fetch(`http://localhost:8080/v1/blood-reports/${id}`,
          { method: "GET" })
          .then(async res => {
              console.log(res);
              if (!res.ok) {
                  const text = await res.text();
                  throw new Error(text);
              }
              return res.json();
          })
          .then(async (res) => {
              bloodReportObject = res;
              extractFields(res)
              console.log("RES",res);
              console.log("bloodreport",bloodReportObject);
              console.log("bloodreportArray",bloodReportArray);
          })
          .catch((err) => {
              console.log(err.message);
              alert(err.message);
          })
  }
  useEffect(() => { fetchBloodReport(); },[]);
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
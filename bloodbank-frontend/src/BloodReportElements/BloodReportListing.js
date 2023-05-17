import { bloodReport } from "../utils";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../user-context';

const BloodReportListing = (appointmentId) => {
    const [bloodReport, setBloodReport] = useState('');
    const [bloodReportArray, setBloodReportArray] = useState(Array(16).fill(''));

    const extractFields = (bloodReportParam) => {
        const fieldsToExtract = ['glucose', 'sodium', 'potassium', 'chloride',
            'magnesium', 'calcium', 'cholesterol', 'protein', 'iron', 'bilirubin',
            'albumin', 'globulin', 'wbc', 'rbc', 'hgb', 'hct'];
        const extractedFieldsArray = fieldsToExtract.map((field) => bloodReportParam[field]);
        setBloodReportArray(extractedFieldsArray);
    }

    function fetchBloodReport() {
        fetch(`http://localhost:8080/v1/blood-reports/${appointmentId}`,
            { method: "GET", headers: { 'Content-Type': 'application/json' } })
            .then(async res => {
                console.log(res);
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text);
                }
                return res.text();
            })
            .then((res) => {
                setBloodReport(res);
                console.log(bloodReportArray);
            })
            .then(extractFields(bloodReport))
            .catch((err) => {
                console.log(err.message);
                alert(err.message);
            })
    }
    useEffect(() => { fetchBloodReport() });
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

export default BloodReportListing;
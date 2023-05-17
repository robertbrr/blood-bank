import { bloodReport, bloodTypes } from "../utils";
import { useState, useEffect } from "react";
import "../styles.css"
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"
import { renderToStaticMarkup } from "react-dom/server"
const BloodReportListing = (id) => {
    let bloodReportObject;
    const [donorName,setDonorName] = useState('');
    const [date,setDate] = useState('');
    const [doctorName,setDoctorName] =  useState('');
    const [donationCenter, setDonationCenter] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [bloodReportArray, setBloodReportArray] = useState([]);

    const extractFields = async () => {
        const fieldsToExtract = ['glucose', 'sodium', 'potassium', 'chloride',
            'magnesium', 'calcium', 'cholesterol', 'protein', 'iron', 'bilirubin',
            'albumin', 'globulin', 'wbc', 'rbc', 'hgb', 'hct'];
        const extractedFields = fieldsToExtract.map((field) => bloodReportObject[field]);
        setBloodReportArray(extractedFields);
    }

    const getBloodTypeEntry = (value) => {
        return bloodTypes.find(x => x.value === value);
    };

    const ExportAsPDF = () => {
        const doc = new jsPDF('portrait', 'pt', 'a4');
        
        //this converts the jsx code of the table to html for jsPDF
        const table1 = document.createElement('table')
        const staticElement = renderToStaticMarkup(apptInfoTable)
        table1.innerHTML = staticElement

        //render table1 (header)
        doc.html(table1);
        autoTable(doc, { html: table1 });
    
        //render table2 (content)
        let table2 = document.getElementById('table2');
        doc.html(table2);
        autoTable(doc, { html: table2, startY: doc.autoTable.previous.finalY + 10 });

        doc.save('blood-report.pdf');

    }

    const fetchBloodReport = () => {
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
                //get blood report info
                setDonorName(res.appointment.donor.firstName + ' ' + res.appointment.donor.lastName);
                setDate(res.appointment.date);
                setDoctorName(res.doctor.firstName + ' ' + res.doctor.lastName);
                setDonationCenter(res.appointment.donationCenter.name);
                //get the name from the value
                //ex AB_POS to AB+
                const bloodTypeEntry = getBloodTypeEntry(res.appointment.donor.bloodType)
                setBloodType(bloodTypeEntry.name);
                console.log("RES", res);
                console.log("bloodreport", bloodReportObject);
                console.log("bloodreportArray", bloodReportArray);
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message);
            })
    }
    useEffect(() => { fetchBloodReport(); }, []);

    //data about the appointment
    const apptInfoTable = (
        <table id = "table1">
            <thead>
                <tr>
                    <th class="left-align">Name</th>
                    <th class="left-align">Date</th>
                    <th class="left-align">Donation Center</th>
                    <th class="left-align">Doctor</th>
                    <th class="left-align">Blood Type</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                   <td>{donorName}</td>
                   <td>{date}</td>
                   <td>{donationCenter}</td>
                   <td>{doctorName}</td>
                   <td>{bloodType}</td>
                </tr>
            </tbody>
        </table>
    )

    //data about blood
    const reportTable = (
        <table id = 'table2'>
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
                        <td class>{bloodReportArray[index]}</td>
                        <td>{item.units}</td>
                        <td>{item.reference}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )


    return (
        <div className="app2">
            <div className="table-container">
                {/* {apptInfoTable} */}
                {reportTable}
            </div>
            <button onClick={ExportAsPDF} type="edit">Download</button>
            <h1>{'\u00A0'}</h1>
        </div>
    );
}

export default BloodReportListing;
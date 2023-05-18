export const bloodTypes = [
    {id: 1, name: 'O+', value: 'O_POS'},
    {id: 2, name: 'O-', value: 'O_NEG'},
    {id: 3, name: 'A+', value: 'A_POS'},
    {id: 4, name: 'A-', value: 'A_NEG'},
    {id: 5, name: 'B+', value: 'B_POS'},
    {id: 6, name: 'B-', value: 'B_NEG'},
    {id: 7, name: 'AB+', value: 'AB_POS'},
    {id: 8, name: 'AB-', value: 'AB_NEG'}
];

export const notificationOptions = [
    {id: 1, name: "EMAIL"},
    {id: 2, name: "SMS"}
];

export const viewAppointmentsOptions = [
    {id: 1, name: "All appointments"},
    {id: 2, name: "Today's appointments"}
];

//from date to LocalDate
export const convertToDate = (date_param) => {
    const selDate = new Date(date_param)
    const year = selDate.getFullYear();
    const month = selDate.getMonth() + 1; //0 index in JS
    const day = selDate.getDate();
    //this certainly does things
    const localDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
    console.log(localDate);
    return localDate;
};

export const bloodReport = [
    {id : 1, name: "GLUCOSE", units: "mg/dL", reference: "65 - 125" },
    {id : 2, name: "SODIUM", units: "mmol/L", reference: "136 - 144" },
    {id : 3, name: "POTASSIUM", units: "mmol/L", reference: "3.6 - 5.1" },
    {id : 4, name: "CHLORIDE", units: "mmol/L", reference: "99 - 109" },
    {id : 5, name: "MAGNESIUM", units: "g/dL", reference: "1.5 - 2.5" },
    {id : 6, name: "CALCIUM", units: "mg/dL", reference: "8.8 - 10.3" },
    {id : 7, name: "CHOLESTEROL", units: "mg/dL", reference: "120 - 199" },
    {id : 8, name: "PROTEIN", units: "g/dL", reference: "6.5 - 8.3" },
    {id : 9, name: "IRON", units: "mg/dL", reference: "50 - 170" },
    {id : 10, name: "BILIRUBIN", units: "mg/dL", reference: "0.2 - 1.5" },
    {id : 11, name: "ALBUMIN", units: "g/dL", reference: "4.0 - 5.0" },
    {id : 12, name: "GLOBULIN", units: "g/dL", reference: "2.1 - 3.6" },
    {id : 13, name: "WBC", units: "Thousands/mm^3", reference: "3.9 - 11.1"},
    {id : 14, name: "RBC", units: "Millions/mm^3", reference: "4.2 - 5.7"},
    {id : 15, name: "HGB", units: "g/dL", reference: "13.2 - 16.9"},
    {id : 16, name: "HCT", units: "(%)", reference: "38.5 - 49.0"}
]
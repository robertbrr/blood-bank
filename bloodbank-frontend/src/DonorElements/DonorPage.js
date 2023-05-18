import React from 'react';
import '../styles.css';
import bananaCat from '../images/banana-crying-cat.gif'

function DonorPage() {
  return (
    <div className="welcome-page" >
        <h1 style={{ marginTop: '20px' }}>WELCOME, DONOR!</h1>
        <img src={bananaCat} alt="Banana-cat." style={{ width: 'auto', height: '400px' }} />
    </div>
  );
}

export default DonorPage;

import React from 'react';
import '../styles.css';
import florks from '../images/florks.png'

function AdminPage() {
  return (
    <div className="welcome-page" >
        <h1 style={{ marginTop: '20px' }}>WELCOME, ADMIN!</h1>
        <img src={florks} alt="Florks." style={{ width: 'auto', height: '400px' }} />
    </div>
  );
}

export default AdminPage;

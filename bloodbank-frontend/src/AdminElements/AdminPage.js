import React from 'react';

import florks from '../images/florks.png'
function AdminPage() {
  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}>
        <img src={florks} alt="Florks." />
    </div>
  );
}

export default AdminPage;

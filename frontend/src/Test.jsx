import React from 'react';

function Test() {
  return (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: 'white', 
      color: 'black',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ color: '#c9a227', marginBottom: '1rem' }}>Website Test</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Jika Anda melihat teks ini, berarti React berjalan dengan baik!
      </p>
      <div style={{ 
        padding: '1rem 2rem', 
        backgroundColor: '#c9a227', 
        color: 'white', 
        borderRadius: '8px',
        fontWeight: 'bold'
      }}>
        ✅ React App Working!
      </div>
    </div>
  );
}

export default Test;
import React from 'react';

function Home() {
  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#6f42c1', // morado bootstrap similar
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '0 1rem',
    }}>
      <h1>Bienvenido a la plataforma To-Do-List</h1>
    </div>
  );
}

export default Home;

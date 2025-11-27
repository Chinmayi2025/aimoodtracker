import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleSphere from '../components/ParticleSphere';

const LoginPage = () => {
  return (
    <div style={containerStyle}>
     
      <div style={backgroundStyle}></div>

      {/* 3D Canvas Background */}
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <ParticleSphere count={250} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Login Form Overlay */}
      <div style={overlayStyle}>
        <h1 style={{ marginBottom: '1rem' }}>Welcome Back</h1>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <input type="text" placeholder="Username" style={inputStyle} />
          <input type="password" placeholder="Password" style={inputStyle} />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
      </div>
    </div>
  );
};

// Container style
const containerStyle = {
  width: '100vw',
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
};

// Gradient background
const backgroundStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg,rgb(205, 207, 212),rgb(183, 197, 222),rgba(243, 235, 245, 0.9))', // blue-teal gradient
  zIndex: 0,
};

// Login overlay
const overlayStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backdropFilter: 'blur(10px)',
  padding: '2rem',
  borderRadius: '12px',
  background: 'rgba(0,0,0,0.5)',
  width: '320px',
  textAlign: 'center',
  color: '#fff',
  zIndex: 10
};

// Input style
const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  margin: '0.5rem 0',
  borderRadius: '8px',
  border: 'none',
  outline: 'none',
  fontSize: '1rem',
  background: 'rgba(255,255,255,0.1)',
  color: '#fff'
};

// Button style
const buttonStyle = {
  width: '100%',
  padding: '0.8rem',
  marginTop: '1rem',
  borderRadius: '8px',
  border: 'none',
  background: '#4db6ac',
  color: '#fff',
  fontSize: '1rem',
  cursor: 'pointer'
};

export default LoginPage;

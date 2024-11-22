import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1337/api/content')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="App">
      <header>
        <h1>{data.title}</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <section id="home">
        <h2>Home</h2>
        <p>{data.homeContent}</p>
      </section>
      <section id="about">
        <h2>About Us</h2>
        <p>{data.aboutContent}</p>
      </section>
      <section id="services">
        <h2>Our Services</h2>
        {data.services.map(service => (
          <div className="service" key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </section>
      <section id="contact">
        <h2>Contact Us</h2>
        <form id="contact-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>
      <footer>
        <p>© 2024 BETT'S inc. All rights reserved.</p>
      </footer>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {/* Add your Three.js objects here */}
      </Canvas>
    </div>
  );
}

export default App;
    

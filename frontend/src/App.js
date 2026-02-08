import React from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/shop';
import Contact from './components/cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import './App.css';
import Fish from './components/Fish';
import Shimp from './components/Shrimp';
import Plants from './components/Plants ';
import Tools from './components/Tools ';

function App(){
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<About />} />
        <Route path="/cart" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="Navbar" element={<Navbar />} />
        <Route path="/fish" element ={<Fish />} />
        <Route path="/shrimp" element ={<Shimp />} />
        <Route path="/plants" element ={<Plants />} />
        <Route path='tools' element={<Tools />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
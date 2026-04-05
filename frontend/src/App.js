import React, { useEffect } from 'react';
import {BrowserRouter as Router,Route,Routes, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/shop';
import Contact from './components/cart';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import Fish from './components/Fish';
import Shimp from './components/Shrimp';
import Plants from './components/Plants ';
import Tools from './components/Tools ';
import BusinessDashboard from './components/Businesspage/busimain';
import Footer from './components/Footer';
import NewPates from './components/Businesspage/NewPates';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Use both window.scrollTo and document scroll
    window.scrollTo({top: 0, left: 0, behavior: 'instant'});
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  
  return null;
}

function App(){
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
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
        <Route path="/business" element={<BusinessDashboard />} />
        <Route path="/customer" element={<Home />} />
        <Route path="/new-pates" element={<NewPates />} />
      </Routes>
      
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import Signup from './components/signup';
import Login from './components/login';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <ToastContainer />
     <BrowserRouter>
    <Navbar/>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
         </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

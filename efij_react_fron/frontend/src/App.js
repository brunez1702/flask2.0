
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UsersList from '../src/components/UsersList'
import Home from '../src/components/Home'

function App() {
   return (
       <Router>
           <Routes>
               <Route path="/" element={<Login />} />
               <Route path="/user" element={<UsersList />} />
               <Route path="/home" element={<Home />} />
               {/* Aquí agregarás otras rutas más adelante */}
           </Routes>
       </Router>
   );
}

export default App;





// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Later add: Dashboard, CityWeatherView */}
        <Route path="/dashboard" element={<Dashboard />} />
                                                                                                                          
      </Routes>
    </Router>
  );
}

export default App;


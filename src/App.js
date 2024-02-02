import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Admin from "./Admin";
import Home from "./Home";
import Navigation from "./Navigation";
import AdminLogin from "./AdminLogin";


function App() {
  return (
    <div className="app">
      <Navigation />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/adminlog" element={<AdminLogin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

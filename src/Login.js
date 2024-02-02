import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./Login.css";
import { useNavigate } from "react-router-dom"; 
import { HiUserCircle } from "react-icons/hi2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      
      await signInWithEmailAndPassword(auth, email, password);

      console.log("Login successful!");

     
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="wrapper">
      <HiUserCircle className="icon" />
      
      <div className="input-group2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group2">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

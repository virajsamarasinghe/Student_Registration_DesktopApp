import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth, database } from "./firebase";
import "./Registration.css"; 

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      
      if (password !== confirmPassword) {
        console.error("Passwords do not match.");
        return;
      }

     
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

   
      const user = userCredential.user;

     
      await set(ref(database, `students/${user.uid}`), {
        firstName,
        lastName,
        email: user.email,
        birthday,
        registrationNumber,
        
      });

      console.log("Registration successful!");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.error("This email is already in use.");
      } else {
        console.error("Registration error:", error.message);
      }
    }

    navigate("/login");
  };

  return (
    <div className="container1">
      <h2>Registration</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegistration}>Register</button>
      
    </div>
  );
};

export default Registration;

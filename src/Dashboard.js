import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { auth, database } from "./firebase";
import './Dashboard.css';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [marksData, setMarksData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   
    const user = auth.currentUser;

    if (!user) {
      
      navigate("/login");
      return;
    }

    
    const userRef = ref(database, `students/${user.uid}`);

    const unsubscribeUser = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      setUserData(userData);

     
      if (userData && userData.registrationNumber) {
        const marksRef = ref(
          database,
          `students/marks/${userData.registrationNumber}/marks`
        );

        const unsubscribeMarks = onValue(marksRef, (snapshot) => {
          const marksData = snapshot.val();
          setMarksData(marksData);
        });

       
        return () => {
          unsubscribeMarks();
        };
      }
    });

    
    return () => {
      unsubscribeUser();
    };
  }, [navigate]);

  return (
    <div className="container8">
      <h2>Dashboard</h2>
      {userData ? (
        <div>
          <p>Username: {userData.firstName}</p>
          <p>Email: {userData.email}</p>
          <p>Registration Number: {userData.registrationNumber}</p>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {marksData ? (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(marksData).map(([subject, marks]) => (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading marks...</p>
      )}
    </div>
  );
};

export default Dashboard;

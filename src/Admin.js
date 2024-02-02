import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, get, set } from "firebase/database";
import { database } from "./firebase";
import "./Admin.css";

const Admin = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [studentData, setStudentData] = useState(null);
  const navigate = useNavigate();

  const subjects = ["Math", "Science", "English", "History", "Geography"];

  useEffect(() => {
    
    const fetchStudentDetails = async () => {
      try {
        const studentRef = ref(database, `students`);
        const snapshot = await get(studentRef);

        if (snapshot.exists()) {
          const students = snapshot.val();

          
          const foundStudent = Object.values(students).find(
            (student) => student.registrationNumber === registrationNumber
          );

          setStudentData(foundStudent);
        }
      } catch (error) {
        console.error("Fetch student details error:", error.message);
      }
    };

    if (registrationNumber) {
      fetchStudentDetails();
    }
  }, [registrationNumber]);

  const handleSaveMarks = async () => {
    try {
      if (!studentData) {
        console.error(
          "Student not found with the provided registration number."
        );
        return;
      }
      console.log("studentData:", studentData);
      console.log("subject:", subject);
      console.log("marks:", marks);

     
      await set(
        ref(
          database,
          `students/marks/${studentData.registrationNumber}/marks/${subject}`
        ),
        parseFloat(marks)
      );

      console.log("Marks saved successfully!");
    } catch (error) {
      console.error("Save marks error:", error.message);
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel - Add Student Marks</h2>
      <div className="input-group3">
        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </div>
      {studentData && (
        <div className="student-details">
          <p>
            Student Name: {`${studentData.firstName} ${studentData.lastName}`}
          </p>
          <p>Email: {studentData.email}</p>
          
        </div>
      )}
      <div className="select-group">
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="">Select Subject</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group3">
        <input
          type="text"
          placeholder="Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />
      </div>
      <button className="button5" onClick={handleSaveMarks}>
        Add Marks
      </button>
    </div>
  );
};

export default Admin;

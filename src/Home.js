import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="container3">
      <h2>Welcome to NextGen</h2>

      <p className="P">Explore our features and services.</p>

      <div className="button1">
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div className="button2">
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

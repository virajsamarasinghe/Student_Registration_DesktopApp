import React, { useState, useEffect } from "react";
import { IoHome } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { TiThMenu } from "react-icons/ti";

import { HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Navigation.css"; 

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (event) => {
    if (
      isSidebarOpen &&
      event.target.closest(".sidebar") === null &&
      event.target.closest(".header") === null
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", closeSidebar);

    return () => {
      document.body.removeEventListener("click", closeSidebar);
    };
  }, [isSidebarOpen]);

  return (
    <div className="container5">
      <div
        className={`header ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        <TiThMenu />
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h3>NextGen</h3>
        <Link to="/">
          <button>
            {" "}
            <IoHome className="i" />
            Home
          </button>
        </Link>
        <Link to="/adminlog">
          <button>
            {" "}
            <MdAdminPanelSettings className="i" />
            Admin
          </button>
        </Link>
        <Link to="/login">
          <button>
            {" "}
            <HiOutlineLogout className="i" />
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;

import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  const handleLogout = () => {
    // Xóa token trong localStorage
    localStorage.removeItem("token");
    // Điều hướng về trang login
    window.location.href = "/login";
  };
  return (
    <div className="sidebar bg-dark text-white d-flex flex-column align-items-center pt-4">
      <h2 className="mb-5 ">Education</h2>
      <ul className="list-unstyled w-100 mt-3">
        <li className="mb-3">
          <Link
            to="/dashboard"
            className="text-decoration-none text-white d-flex align-items-center px-3 py-2 mx-1">
            <i class="fas fa-chart-simple"></i> Dashboard
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/course"
            className="text-decoration-none text-white d-flex align-items-center px-3 py-2 mx-1">
             <i className="fas fa-briefcase"></i> My Course
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/document"
            className="text-decoration-none text-white d-flex align-items-center px-3 py-2 mx-1">
            <i class="fas fa-book"></i>Document
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/schedule"
            className="text-decoration-none text-white d-flex align-items-center px-3 py-2 mx-1">
            <i class="fa-solid fa-calendar-days"></i> Schedule
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/findwork"
            className="text-decoration-none text-white d-flex align-items-center px-3 py-2 mx-1">
            <i className="fas fa-tasks"></i> Find Work
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/chatbot"
            className="text-decoration-none text-white d-flex align-items-center px-3 py-2 mx-1">
            <i class="fas fa-comment"></i> Chatbot
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/profile"
            className="text-decoration-none text-white d-flex align-items-center px-3 py-2 mx-1">
            <i class="fas fa-user"></i> Profile
          </Link>
        </li>
        <li className="mb-3">
          <Link
            to="/setting"
            className="text-decoration-none text-white d-flex align-items-center px-3 py-2 mx-1">
            <i class="fas fa-gear"></i> Settings
          </Link>
        </li>

        {/* <li>
          <button onClick={handleLogout} className="btn btn-danger w-100">
           Đăng xuất
          </button>
        </li> */}
      </ul>
      <div className="w-100 mt-auto px-2">
        <button onClick={handleLogout} className="btn btn-danger w-100">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;

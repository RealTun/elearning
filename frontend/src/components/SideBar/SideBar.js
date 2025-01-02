import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <nav id="Sidebar">
      <ul className="list-unstyled">
        <li>
          <Link to="/home" className="logo text-decoration-none">
            <img src="" alt="Logo" />
            <span className="nav-item">TRANG CHỦ</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-decoration-none">
            <i className="fas fa-home"></i> Tổng quan
          </Link>
        </li>
        <li>
          <Link to="/ranking" className="text-decoration-none">
            <i className="fas bi bi-stars"></i> Bảng xếp hạng
          </Link>
        </li>
        <li>
          <Link to="/summary" className="text-decoration-none">
            <i className="fas fa-wallet"></i> Bảng tổng hợp
          </Link>
        </li>
        <li>
          <Link to="/report" className="text-decoration-none">
            <i className="fas fa-chart-bar"></i> Báo cáo điểm nhóm
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="text-decoration-none">
            <i className="fas fa-tasks"></i> Công việc
          </Link>
        </li>
        <li>
          <Link to="/settings" className="text-decoration-none">
            <i className="fas fa-cog"></i> Cài đặt
          </Link>
        </li>
        <li>
          <Link to="/help" className="text-decoration-none">
            <i className="fas fa-question-circle"></i> Giúp đỡ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;

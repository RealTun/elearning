import React from "react";
import "./Dashboard.css";
import Header from "../../Header/Header";

const Dashboard = () => {
  return (
    // <div className={`Dashboard`}>
    //   <h1>Đây là Component Dashboard</h1>
    // </div>
    <div className="dashboard-container">
      <Header userName="HuongPTA">
        <h4 className="dashboard-title">Tổng quan</h4>
      </Header>
      {/* Nội dung khác */}
    </div>
  );
};

export default Dashboard;

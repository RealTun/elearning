import React from "react";
import "./Dashboard.css";
import Header from "../../Header/Header";
import InfoCard from "../../CardDashboard/CardDashboard";
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

      <div className="row">
        <div className="col-md-9">
          <div className="row justify-content-center">

            <div className="col-md-3 col-sm-6 mb-3">
              <InfoCard
                icon={<i className="bi bi-calendar-plus text-success"></i>}
                title="Course in process"
                value={5}
              />
            </div>
            <div className="col-md-3 col-sm-6 mb-3">
              <InfoCard
                icon={<i className="bi bi-check-circle-fill text-success"></i>}
                title="Course completed"
                value={5}
              />
            </div>
            <div className="col-md-3 col-sm-6 mb-3">
              <InfoCard
                icon={<i className="bi bi-award-fill text-success"></i>}
                title="CTS cấp mới"
                value={20}
               
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

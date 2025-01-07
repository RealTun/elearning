import React, { useState } from "react";
import "./Dashboard.css";
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";
import TableCourse from "../../components/Table/TableCourse";
import TableSchedule from "../../components/Table/TableSchedule";

import InfoCard from "../../components/Card/CardDashboard";
const Dashboard = () => {
  // const [username,setUsername] = useState("HuongPTA");
  // const content = (<div><div>Tuan</div> <select><option>1</option><option>2</option></select></div>)
  return (
    <div className="dashboard">
      <Header 
        username="HuongPTA" 
        title="Tổng quan"
        middleContent = {<SearchItem/>}      
        >
      </Header>
      {/* Nội dung khác */}
      <div className="m-4">
      </div>


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

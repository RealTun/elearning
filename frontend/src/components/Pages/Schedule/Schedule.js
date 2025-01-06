import React from "react";
import "./Schedule.css";
import Header from "../../Header/Header";
import SearchItem from "../../SearchItem/SearchItem";
import TableSchedule from "../../Table/TableSchedule/TableSchedule";

const Schedule = () => {
  return (
    // <div className={`Schedule`}>
    //   <h1>Đây là Component Schedule</h1>
    // </div>
    <div className="schedule">
      <Header 
        username="HuongPTA" 
        title="Lịch học"   
      >
      </Header>
      {/* Nội dung khác */}
      <div className="m-4">
        <div className="d-flex mb-3">
          <h5>Tuần</h5>
          <input className="form-control-sm border-black"></input>
        </div>
        <TableSchedule/>
      </div>
    </div>
  );
};

export default Schedule;

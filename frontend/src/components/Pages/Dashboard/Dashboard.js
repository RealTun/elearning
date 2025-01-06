import React, { useState } from "react";
import "./Dashboard.css";
import Header from "../../Header/Header";
import SearchItem from "../../SearchItem/SearchItem";
import TableCourse from "../../Table/TableCourse/TableCourse";
import TableSchedule from "../../Table/TableSchedule/TableSchedule";

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

    </div>
  );
};

export default Dashboard;

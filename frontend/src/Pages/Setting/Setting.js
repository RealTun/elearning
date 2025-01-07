import React from "react";
import "./Setting.css";
import Header from "../../layouts/Header/Header";


const Setting = () => {
  return (
    // <div className={`Setting`}>
    //   <h1>Đây là Component Setting</h1>
    // </div>
    <div className="setting">
      <Header 
        username="HuongPTA" 
        title="Cài đặt"     
        >
      </Header>
      {/* Nội dung khác */}
    </div>
  );
};

export default Setting;

import React from "react";
import "./FindWork.css";
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";

const FindWork = () => {
  return (
    // <div className={`FindWork`}>
    //   <h1>Đây là Component FindWork</h1>
    // </div>
    <div className="findwork">
      <Header 
        username="HuongPTA" 
        title="Tìm việc"
        middleContent = {<SearchItem/>}      
        >
      </Header>
      {/* Nội dung khác */}
    </div>
  );
};

export default FindWork;

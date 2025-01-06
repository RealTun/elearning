import React from "react";
import "./Course.css";
import Header from "../../Header/Header";
import SearchItem from "../../SearchItem/SearchItem";


const Course = () => {
  return (
    <div className="course">
      <Header 
        username="HuongPTA" 
        title="Khóa học"
        middleContent={
          <div className="d-flex justify-content-between align-items-center">
            <SearchItem />
            {/* <FilterItem /> */}
          </div>
        }     
      >
      </Header>
      {/* Nội dung khác */}
    </div>
  );
};

export default Course;

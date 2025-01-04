import React from "react";
import "./Course.css";
import Header from "../../Header/Header";

const Course = () => {
  return (
    // <div className={`Course`}>
    //   <h1>Đây là Component Course</h1>
    // </div>
    <div className="course-container">
      <Header userName="HuongPTA">
        <h4 className="course-title">Khóa học</h4>
      </Header>
      {/* Nội dung khác */}
    </div>
  );
};

export default Course;

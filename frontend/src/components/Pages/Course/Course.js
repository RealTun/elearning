import React from "react";
import "./Course.css";
import Header from "../../Header/Header";
import Card from "../../CardCourse/CardCourse";
import img from "../../../assets/images/python.jpg"

const Course = () => {
  return (
    // <div className={`Course`}>
    //   <h1>Đây là Component Course</h1>
    // </div>
    <div className="course-container">
      <Header userName="HuongPTA">
        <h4 className="course-title">Khóa học</h4>
      </Header>

      <h2>Đề xuất</h2>
      <div className="tab-content">
        <div className="row">
          <div className="col-md-3 mt-3">
            <Card
              image={img}
              title="Lập trình python" />
          </div>
          <div className="col-md-3 mt-3">
            <Card
              image={img}
              title="Lập trình python" />
          </div>
          <div className="col-md-3 mt-3">
            <Card
              image={img}
              title="Lập trình python" />
          </div>
          
          <div className="col-md-3 mt-3">
            <Card
              image={img}
              title="Lập trình python" />
          </div>

        </div>

      </div>

      <h2 className="mt-3 ">Khóa học</h2>
      <div className="tab-content">
        <div className="row">
          <div className="col-md-3 mt-3">
            <Card
              image={img}
              title="Lập trình python"
              lessons="12"
            />
          </div>
          <div className="col-md-3 mt-3">
            <Card
              image={img}
              title="Lập trình python"
              lessons="12" />

          </div>
          <div className="col-md-3 mt-3">
            <Card
              image={img}
              title="Lập trình python"
              lessons="12" />
          </div>
          <div className="col-md-3 mt-3">
            <Card image={img}
              title="Lập trình python" />
          </div>

        </div>

      </div>

      <h2 className="mt-3">Lộ trình khóa học </h2>
      {/* Nội dung khác */}
    </div>
  );
};

export default Course;

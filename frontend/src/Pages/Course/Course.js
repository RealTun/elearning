import React from "react";
import "./Course.css";
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";

import Card from "../../components/Card/CardCourse";
import img from "../../assets/images/python.jpg"

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

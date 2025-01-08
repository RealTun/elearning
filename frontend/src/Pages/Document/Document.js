import React from "react";
import "./Document.css";
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Card from "../../components/Card/CardCourse";
import img from "../../assets/images/python.jpg"


const Document = () => {
  return (
    // <div className={`Document`}>
    //   <h1>Đây là Component Document</h1>
    // </div>

    <div className="document">
      <Header
        username="HuongPTA"
        title="Tài liệu"
        middleContent={<SearchItem />}
      >
      </Header>
      {/* Nội dung khác */}

      <div className="row">
        <div className="col-md-9">
        <h2 className="mt-3">Đề xuất</h2>
        </div>
        <div className="col-md-3">
            <button className="create-plan-button">
              Tạo lộ trình
            </button>
        </div>
      </div>
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
          

        </div>

      </div>

      <h2 className="mt-3">Lộ trình khóa học </h2>
      {/* Nội dung khác */}
    </div>
    
  );



};

export default Document;

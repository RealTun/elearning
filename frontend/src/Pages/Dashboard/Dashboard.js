import React, { useState } from "react";
import "./Dashboard.css";
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";
import InfoCard from "../../components/Card/CardDashboard";
import CourseProgressCard from "../../components/Card/CourseProgressCard.js";
import CardSchedule from "../../components/Card/CardSchedule.js";

const Dashboard = () => {
  const [date, setDate] = useState("Thứ 4,8/1/2024");

  console.log(JSON.parse(localStorage.getItem("user"))); 
  

  return (
    <div className="dashboard">
      {/* Phần header */}
      <Header
        username="" //truyền username
        title="Tổng quan"
        middleContent={<SearchItem />}
      ></Header>

      <div className="main-content container-fluid m-4">
        <div className="row">
          {/* Phần bên trái */}
          <div className="dashboard-main-content-left col-md-8">
            {/* Phần card thống kê */}
            <div className="row mb-3">
              <div className="col-md-4">
                <InfoCard
                  icon={
                    <i class="fas fa-book" style={{ color: "#569AE3" }}></i>
                  }
                  title="Đang học"
                  value={5}
                  bgColor="bg-blue"
                />
              </div>
              <div className="col-md-4 mb-3">
                <InfoCard
                  icon={
                    <i className="bi bi-check-circle-fill text-success"></i>
                  }
                  title="Đã hoàn thành"
                  value={5}
                  bgColor="bg-green"
                />
              </div>
              <div className="col-md-4 mb-3">
                <InfoCard
                  icon={
                    <i class="fas fa-award" style={{ color: "#FDAB5F" }}></i>
                  }
                  title="Chứng chỉ đạt được"
                  value={3}
                  bgColor="bg-orange"
                />
              </div>
            </div>

            {/*Biểu đồ  */}
            <div className="dashboard-chart row mb-3">
              <div className="col-md-8">
                <iframe
                  src="https://chart.googleapis.com/chart?cht=bvg&chs=250x200&chd=t:10,20,30,40,50&chl=Jan|Feb|Mar|Apr|May"
                  width="100%"
                  height="300px"
                  title="Biểu đồ 2"
                  style={{ border: "1px solid #ccc", borderRadius: "15px" }}
                ></iframe>
              </div>
              <div className="col-md-4">
                <iframe
                  src="https://chart.googleapis.com/chart?cht=bvg&chs=250x200&chd=t:10,20,30,40,50&chl=Jan|Feb|Mar|Apr|May"
                  width="100%"
                  height="300px"
                  title="Biểu đồ 2"
                  style={{ border: "1px solid #ccc", borderRadius: "15px" }}
                ></iframe>
              </div>
            </div>

            {/* Phần Course Progress Card */}
            <div className="row">
              <div className="col-md-12">
                <h5 className="fw-bold">Khóa học của tôi</h5>

                <div>
                  <CourseProgressCard
                    title="Lập trình Python"
                    lessons={10}
                    progress={50}
                  />
                </div>

                <div>
                  <CourseProgressCard
                    title="Lập trình Java"
                    lessons={15}
                    progress={75}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Phần bên phải */}
          <div className="main-contain-right col-md-4 px-5">
            <div className="d-flex">
              <div className="">
                <h5 className="fw-bold">Lịch học</h5>
                <h6>{date}</h6>
              </div>
            </div>
            {/* <div className="cardschedule">
            <div>
              <CardSchedule
                time="10:00 AM"
                label="Học"
                title="Lập trình Python"
              />
            </div>

            <div>
              <CardSchedule
                time="20:00 PM"
                label="Học"
                title="Lập trình Java"
              />
            </div>
          </div> */}
            <div className="listschedule">
              {[
                { time: "10:00 AM", label: "Học", title: "Lập trình Python" },
                { time: "14:00 PM", label: "Học", title: "Lập trình C++" },
                {
                  time: "16:00 PM",
                  label: "Học",
                  title: "Lập trình JavaScript",
                },
                { time: "20:00 PM", label: "Học", title: "Lập trình Java" },
              ].map((schedule, index) => (
                <div key={index}>
                  <CardSchedule
                    time={schedule.time}
                    label={schedule.label}
                    title={schedule.title}
                  />
                </div>
              ))}
            </div>
            <button className="btn btn-outline-dark rounded-pill py-2 my-3 w-100 fw-bold">
              Tất cả lịch học
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

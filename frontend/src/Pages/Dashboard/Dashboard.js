import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";
import InfoCard from "../../components/Card/CardDashboard";
import CourseProgressCard from "../../components/Card/CourseProgressCard.js";
import CardSchedule from "../../components/Card/CardSchedule.js";
import API_URL from "../../config/API_URL";
import axios from "axios";

const Dashboard = () => {
  const [date, setDate] = useState("Thứ 4,8/1/2024");
  const [courseProgress, setCourseProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${API_URL}/user/getUserCourseProgress`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          setCourseProgress(response.data.data); // Lưu tiến trình các khóa học
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseProgress();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  return (
    <div className="dashboard">
      {/* Phần header */}
      <Header
        username="" // Truyền username nếu có
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
                    <i className="fas fa-book" style={{ color: "#569AE3" }}></i>
                  }
                  title="Đang học"
                  value={courseProgress.length}
                  bgColor="bg-blue"
                />
              </div>
              <div className="col-md-4 mb-3">
                <InfoCard
                  icon={
                    <i className="bi bi-check-circle-fill text-success"></i>
                  }
                  title="Đã hoàn thành"
                  value={
                    courseProgress.filter(
                      (course) =>
                        course.progress.split("/")[0] ===
                        course.progress.split("/")[1]
                    ).length
                  }
                  bgColor="bg-green"
                />
              </div>
              <div className="col-md-4 mb-3">
                <InfoCard
                  icon={
                    <i
                      className="fas fa-award"
                      style={{ color: "#FDAB5F" }}
                    ></i>
                  }
                  title="Chứng chỉ đạt được"
                  value={3} // Thay giá trị thực nếu có
                  bgColor="bg-orange"
                />
              </div>
            </div>

            {/* Phần Course Progress Card */}
            <div className="row">
              <div className="col-md-12">
                <h5 className="fw-bold">Khóa học của tôi</h5>
                {courseProgress.map((course, index) => (
                  <div key={index}>
                    <CourseProgressCard
                      title={course.course}
                      lessons={course.progress.split("/")[1]}
                      progress={Math.round(
                        (parseInt(course.progress.split("/")[0]) /
                          parseInt(course.progress.split("/")[1])) *
                          100
                      )}
                    />
                  </div>
                ))}
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
            <div className="listschedule">
              {[
                // Lịch học mẫu
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

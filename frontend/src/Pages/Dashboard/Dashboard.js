import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";
import InfoCard from "../../components/Card/CardDashboard";
import CourseProgressCard from "../../components/Card/CourseProgressCard.js";
import CardSchedule from "../../components/Card/CardSchedule.js";
import API_URL from "../../config/API_URL";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading/Loading";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [date, setDate] = useState("Thứ 4,8/1/2024");
  const [courseProgress, setCourseProgress] = useState([]);
  const [loading, setLoading] = useState(true);

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
        if (err.response && err.response.status === 404) {
          toast.info("Bạn chưa tham gia khóa học nào");
        } else {
          toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseProgress();
  }, []);

  // Chuẩn bị dữ liệu biểu đồ
  const chartData = {
    labels: courseProgress.map((course) => course.course), // Tên khóa học
    datasets: [
      {
        label: "Số bài đã học",
        data: courseProgress.map((course) =>
          parseInt(course.progress.split("/")[0])
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Màu cột đã học
        borderWidth: 1,
      },
      {
        label: "Tổng số bài",
        data: courseProgress.map((course) =>
          parseInt(course.progress.split("/")[1])
        ),
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Màu cột tổng
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      {loading && <Loading />}
      <ToastContainer />

      {/* Phần header */}
      <Header
        username="" // Truyền username nếu có
        title="Tổng quan"
        middleContent={<SearchItem />}
      ></Header>

      <div className="main-content p-3">
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
                  value={courseProgress.length} // Thay giá trị thực nếu có
                  bgColor="bg-orange"
                />
              </div>
            </div>
            {/* Biểu đồ tiến trình học */}
            <div className="dashboard-chart row mb-3 w-100">
              <h5 className="fw-bold">Tiến trình học</h5>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Tiến trình học tập theo khóa",
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Phần bên phải */}
          <div className="main-contain-right col-md-4">
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { useState, useEffect } from "react";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css"; // Import css files
import "slick-carousel/slick/slick-theme.css"; // Import css files

import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";
import CardCourse from "../../components/Card/CardCourse";
import img from "../../assets/images/python.jpg";
import "./Course.css";

import API_URL from "../../config/API_URL.js";
import axios from "axios";

// Tùy chỉnh nút mũi tên
const CustomNextArrow = ({ onClick }) => {
  return (
    <a
      class="carousel-control-next  rounded-4"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="next"
      onClick={onClick}
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
  );
};

const CustomPrevArrow = ({ onClick }) => {
  return (
    <a
      class="carousel-control-prev rounded-4"
      href="#carouselExampleIndicators"
      role="button"
      data-slide="prev"
      onClick={onClick}
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
  );
};

const Course = () => {
  // Cấu hình Slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // Số lượng card hiển thị mỗi lần
    slidesToScroll: 1, // Số lượng card cuộn mỗi lần
    nextArrow: <CustomNextArrow />, // Sử dụng nút điều hướng tùy chỉnh
    prevArrow: <CustomPrevArrow />, // Sử dụng nút điều hướng tùy chỉnh
    responsive: [
      {
        breakpoint: 1200, // Màn hình nhỏ hơn 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992, // Màn hình nhỏ hơn 768px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, // Màn hình nhỏ hơn 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/studyMaterials?page=1&limit=27`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        const data = response.data.data;
        setCourses(data);
        console.log(data[0]._id);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

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
      ></Header>

      <div className="wrapper p-3">
        <h2>Đề xuất</h2>
        <Slider {...settings}>
          <CardCourse image={img} title="Lập trình python" />
          <CardCourse image={img} title="Lập trình python" />
          <CardCourse image={img} title="Lập trình python" />
          <CardCourse image={img} title="Lập trình python" />
          <CardCourse image={img} title="Lập trình python" />
        </Slider>

        <h2 className="mt-3 ">Khóa học</h2>
        <Slider {...settings}>
          {courses.map((course, index) => (
            
              <CardCourse
                key={index}
                image={img}
                title={course.playlist_title}
                lessons={course.list_video.length}
                playlistId={course._id} // Truyền ID để sử dụng trong "Xem chi tiết"
              />
          ))}
        </Slider>

        <h2 className="mt-3">Lộ trình khóa học</h2>
        {/* Nội dung khác */}
      </div>
    </div>
  );
};

export default Course;

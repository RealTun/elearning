// import React from "react";
// import "./Course.css";
// import Header from "../../layouts/Header/Header";
// import SearchItem from "../../components/SearchItem/SearchItem";

// import Card from "../../components/Card/CardCourse";
// import img from "../../assets/images/python.jpg"

// const Course = () => {
//   return (
//     <div className="course">
//       <Header
//         username="HuongPTA"
//         title="Khóa học"
//         middleContent={
//           <div className="d-flex justify-content-between align-items-center">
//             <SearchItem />
//             {/* <FilterItem /> */}
//           </div>
//         }
//       >
//       </Header>

//       <h2>Đề xuất</h2>
//       <div className="tab-content">
//         <div className="row">
//           <div className="col-md-3 mt-3">
//             <Card
//               image={img}
//               title="Lập trình python" />
//           </div>
//           <div className="col-md-3 mt-3">
//             <Card
//               image={img}
//               title="Lập trình python" />
//           </div>
//           <div className="col-md-3 mt-3">
//             <Card
//               image={img}
//               title="Lập trình python" />
//           </div>

//           <div className="col-md-3 mt-3">
//             <Card
//               image={img}
//               title="Lập trình python" />
//           </div>

//         </div>

//       </div>

//       <h2 className="mt-3 ">Khóa học</h2>
//       <div className="tab-content">
//         <div className="row">
//           <div className="col-md-3 mt-3">
//             <Card
//               image={img}
//               title="Lập trình python"
//               lessons="12"
//             />
//           </div>
//           <div className="col-md-3 mt-3">
//             <Card
//               image={img}
//               title="Lập trình python"
//               lessons="12" />

//           </div>
//           <div className="col-md-3 mt-3">
//             <Card
//               image={img}
//               title="Lập trình python"
//               lessons="12" />
//           </div>
//           <div className="col-md-3 mt-3">
//             <Card image={img}
//               title="Lập trình python" />
//           </div>

//         </div>

//       </div>

//       <h2 className="mt-3">Lộ trình khóa học </h2>
//       {/* Nội dung khác */}
//     </div>
//   );
// };

// export default Course;

import React from "react";
import Slider from "react-slick"; // Import React Slick
import "slick-carousel/slick/slick.css"; // Import css files
import "slick-carousel/slick/slick-theme.css"; // Import css files

import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";
import CardCourse from "../../components/Card/CardCourse";
import img from "../../assets/images/python.jpg";
import "./Course.css";

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
    dots: true,
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
          <CardCourse image={img} title="Lập trình python" lessons="12" />
          <CardCourse image={img} title="Lập trình python" lessons="12" />
          <CardCourse image={img} title="Lập trình python" lessons="12" />
          <CardCourse image={img} title="Lập trình python" lessons="12" />
          <CardCourse image={img} title="Lập trình python" lessons="12" />
          <CardCourse image={img} title="Lập trình python" lessons="12" />
          <CardCourse image={img} title="Lập trình python" />
        </Slider>

        <h2 className="mt-3">Lộ trình khóa học</h2>
        {/* Nội dung khác */}
      </div>

      <div className="wrapper" style={{ padding: "30px" }}>
        <h2>Đề xuất</h2>
        <div className="tab-content">
          <div className="row">
            <div className="col-md-3 mt-3 d-flex justify-content-center">
              <CardCourse image={img} title="Lập trình python" />
            </div>
            <div className="col-md-3 mt-3 d-flex justify-content-center">
              <CardCourse image={img} title="Lập trình python" />
            </div>
            <div className="col-md-3 mt-3 d-flex justify-content-center">
              <CardCourse image={img} title="Lập trình python" />
            </div>

            <div className="col-md-3 mt-3 d-flex justify-content-center">
              <CardCourse image={img} title="Lập trình python" />
            </div>
          </div>
        </div>

        <h2 className="mt-3 ">Khóa học</h2>
        <div className="tab-content">
          <div className="row">
            <div className="col-md-3 mt-3 d-flex justify-content-center">
              <CardCourse image={img} title="Lập trình python" lessons="12" />
            </div>
            <div className="col-md-3 mt-3 d-flex justify-content-center">
              <CardCourse image={img} title="Lập trình python" lessons="12" />
            </div>
            <div className="col-md-3 mt-3 d-flex justify-content-center">
              <CardCourse image={img} title="Lập trình python" lessons="12" />
            </div>
            <div className="col-md-3 mt-3 d-flex justify-content-center">
              <CardCourse image={img} title="Lập trình python" />
            </div>
          </div>
        </div>

        <h2 className="mt-3">Lộ trình khóa học </h2>
        {/* Nội dung khác */}
      </div>
    </div>
  );
};

export default Course;

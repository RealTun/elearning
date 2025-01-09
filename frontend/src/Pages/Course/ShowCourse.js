import React from "react";
import "./ShowCourse.css";

const ShowCourse = () => {
  const sections = [
    {
      title: "1. Giới thiệu",
      lessons: [
        "ReactJS là gì? Tại sao nên học ReactJS?",
        "SPA/MPA là gì?",
        "Ưu điểm của SPA",
      ],
    },
    {
      title: "2. Ôn lại ES6+",
      lessons: ["Arrow functions", "Destructuring", "Modules"],
    },
    {
      title: "3. React, ReactDOM",
      lessons: ["React basics", "ReactDOM"],
    },
  ];

  return (
    <div className="show-course">
      {/* Header */}
      <div className="header d-flex align-items-center justify-content-between px-3 py-2 bg-dark text-white">
        <div className="logo">
          <span className="fw-bold">Chinh phục mục tiêu cùng Dũng Lại Nhấn Tab</span>
        </div>
        <h5 className="m-0">Xây Dựng Website với ReactJS</h5>
        <div className="help">
          <button className="btn btn-outline-light btn-sm">Hướng dẫn</button>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="row h-100">
        {/* Trình phát video */}
        <div className="col-md-9 p-0 video-player-container">
          <div className="video-player bg-dark text-center">
            <iframe
              className="video-frame"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="React Course"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Nội dung khóa học */}
        <div className="col-md-3 p-0">
          <div className="course-content bg-light p-3 overflow-auto">
            <h6 className="fw-bold">Nội dung khóa học</h6>
            {sections.map((section, index) => (
              <div key={index} className="mb-3">
                <button
                  className="btn btn-light w-100 text-start fw-bold"
                  data-bs-toggle="collapse"
                  data-bs-target={`#section-${index}`}
                >
                  {section.title}
                </button>
                <div className="collapse" id={`section-${index}`}>
                  <ul className="list-unstyled mt-2">
                    {section.lessons.map((lesson, i) => (
                      <li key={i}>
                        <span>✔️</span> {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Điều hướng footer */}
      <div className="footer-nav d-flex justify-content-between p-1 bg-white border-top">
        <button className="btn btn-secondary">Bài trước</button>
        <button className="btn btn-primary">Bài tiếp theo</button>
      </div>
    </div>
  );
};

export default ShowCourse;

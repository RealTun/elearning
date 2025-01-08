import React from "react";
import "./CourseProgressCard.css";

const CourseProgressCard = ({ title, lessons, progress }) => {
  return (
    <div className="course-card shadow-sm my-3">
      <div className="course-info">
        <h5 className="course-title fw-bold mb-1">{title}</h5>
        <p className="course-lessons text-muted mb-2">{lessons} bài</p>
      </div>

      <div className="progress-container">
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar"
            style={{ width: `${progress}%`, backgroundColor: "#FF6B6B" }}
          ></div>
        </div>
        <span className="progress-text">{progress}%</span>
      </div>

      <button className="btn btn-outline-dark btn-sm continue-btn fw-bold">Tiếp tục</button>
    </div>
  );
};

export default CourseProgressCard;
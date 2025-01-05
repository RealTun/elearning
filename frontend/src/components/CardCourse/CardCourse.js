import React from "react";
import "./CardCourse.css";

// const CardCourse = () => {
//   return (
//     <div className={`card-course`}>
//       <h1>Đây là Component CardCourse</h1>
//     </div>
//   );
// };

// export default CardCourse;




const Card = ({ image, title, level, lessons }) => {
  return (
    <div className="card shadow-lg text-center rounded-4 border-0">
      <div className="card-header p-0 rounded-top-4 overflow-hidden">
        {/* Hiển thị hình ảnh */}
        <img src={image} alt={title} className="img-fluid card-image" />
      </div>
      <div className="card-body bg-light">
        <h5 className="card-title fw-bold text-primary">{title}</h5>
        <p className="card-subtitle text-muted">{level}</p>
        <p className="card-text text-secondary fw-semibold">{lessons} bài</p>
        {/* Nút bấm */}
        <button className="btn btn-white btn-sm rounded-pill mt-2">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};



// PropTypes for validation


export default Card;

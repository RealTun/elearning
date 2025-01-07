import React from "react";
import PropTypes from "prop-types";
import './CardDashboard.css'

const InfoCard = ({ icon, title, value, bgColor = "bg-light" }) => {
  return (
    <div className={`info-card d-flex align-items-center justify-content-between p-3 rounded ${bgColor}`}>
      <div className="icon-container me-3">{icon}</div>
      <div>
        <p className="info-title mb-1 text-muted">{title}</p>
        <h5 className="info-value fw-bold mb-0">{value}</h5>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  icon: PropTypes.node.isRequired, // Biểu tượng (React Node)
  title: PropTypes.string.isRequired, // Tiêu đề
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Giá trị
  bgColor: PropTypes.string, // Màu nền (tùy chọn)
};

export default InfoCard;
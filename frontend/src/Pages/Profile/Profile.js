import React from "react";
import Header from "../../layouts/Header/Header";
import "./Profile.css";

const Profile = () => {
  const studentInfo = {
    avatar: "", // Thay đường dẫn ảnh đại diện tại đây
    name: "Hường",
    id: "",
    department: "Khoa Công nghệ thông tin",
    major: "Hệ thống thông tin",
    class: "63HTTT1",
  };

  const generalInfo = {
    phone: "0327362739",
    gender: "Nữ",
    birthDate: "08/02/2003",
    birthPlace: "Vũ Hội - Vũ Thư - Thái Bình",
  };

  const gpa = {
    system4: 3.12,
    system10: 7.85,
  };

  return (
    <div className="profile">
      {/* Header Component */}
      <Header userName="HuongPTA" title="Thông tin cá nhân"></Header>

      {/* Nội dung chính */}
      <div className="profile-header">
        <div
          className="profile-avatar"
          style={{
            backgroundImage: studentInfo.avatar
              ? `url(${studentInfo.avatar})`
              : "none",
          }}
        ></div>
        <div className="profile-name-id">
          <div className="profile-name">{studentInfo.name}</div>
          <div className="profile-id">Mã sinh viên: {studentInfo.id}</div>
        </div>
      </div>

      <h1 className="profile-title">THÔNG TIN CÁ NHÂN</h1>

      <div className="profile-card">
        {/* Cột trái */}
        <div className="profile-left-column">
          {/* Thông tin sinh viên */}
          <div className="profile-info-box">
            <h3>Thông tin sinh viên</h3>
            <p>
              <strong>Khoa:</strong> {studentInfo.department}
            </p>
            <p>
              <strong>Ngành:</strong> {studentInfo.major}
            </p>
            <p>
              <strong>Lớp:</strong> {studentInfo.class}
            </p>
          </div>

          {/* Thông tin chung */}
          <div className="profile-info-box">
            <h3>Thông tin chung</h3>
            <p>
              <strong>Điện thoại:</strong> {generalInfo.phone}
            </p>
            <p>
              <strong>Giới tính:</strong> {generalInfo.gender}
            </p>
            <p>
              <strong>Ngày sinh:</strong> {generalInfo.birthDate}
            </p>
            <p>
              <strong>Nơi sinh:</strong> {generalInfo.birthPlace}
            </p>
          </div>
        </div>

        {/* Cột phải */}
        <div className="profile-right-column">
          <h3>Điểm số</h3>
          <div className="gpa-chart">
            {/* GPA Hệ 4 */}
            <div className="gpa-item">
              <div
                className="gpa-circle"
                style={{
                  "--gpa": gpa.system4 * 25, // Tỉ lệ phần trăm GPA Hệ 4
                  "--gpa-color": "#007bff", // Màu xanh dương cho GPA Hệ 4
                }}
              >
                <span className="gpa-value">{gpa.system4}/4</span>
              </div>
              <p>GPA Hệ 4</p>
            </div>

            {/* GPA Hệ 10 */}
            <div className="gpa-item">
              <div
                className="gpa-circle"
                style={{
                  "--gpa": gpa.system10 * 10, // Tỉ lệ phần trăm GPA Hệ 10
                  "--gpa-color": "#28a745", // Màu xanh lá cây cho GPA Hệ 10
                }}
              >
                <span className="gpa-value">{gpa.system10}/10</span>
              </div>
              <p>GPA Hệ 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React from "react";
import Header from "../../layouts/Header/Header";
import "./Profile.css";

const Profile = () => {
  const studentInfo = {
    avatar: "", // Thay đường dẫn ảnh đại diện tại đây
    name: "Hường",
    id: "2151160535",
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

      {/* Thông tin chính */}
      <div className="profile-header card shadow-sm">
        <div className="profile-avatar">
          <img
            src={studentInfo.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
          />
        </div>
        <div className="profile-details">
          <h2 className="profile-name">{studentInfo.name}</h2>
          <p className="profile-id">Mã sinh viên: {studentInfo.id}</p>
        </div>
      </div>

      <div className="card p-3">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12 mb-2">
                <div className="card">
                  <div className="card-header">Thông tin sinh viên</div>
                  <div className="card-body">
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
                </div>
              </div>
              <div className="col-md-12 mb-2">
                <div className="card">
                  <div className="card-header">Thông tin chung</div>
                  <div className="card-body">
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
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">Học vụ</div>
              <div className="card-body">
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
        </div>
      </div>
    </div>
  );
};

export default Profile;

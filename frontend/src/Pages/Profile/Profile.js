import React from "react";
import Header from "../../layouts/Header/Header";
import "./Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <div className="profile">
      {/* Header Component */}
      <Header userName="HuongPTA" title="Thông tin cá nhân"></Header>

      {/* Thông tin chính */}
      <div className="profile-header card shadow-sm">
        <div className="profile-avatar">
          <img
            src={user.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
          />
        </div>
        <div className="profile-details text-center">
          <h2 className="profile-name">{user.full_name}</h2>
          <p className="profile-id">Mã sinh viên: {user.uid}</p>
        </div>
      </div>

      <div className="card p-3">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-5 mb-2">
                <div className="card">
                  <div className="card-header">Thông tin sinh viên</div>
                  <div className="card-body">
                    <p>
                      <strong>Khoa:</strong> {user.department}
                    </p>
                    <p>
                      <strong>Ngành:</strong> {user.major}
                    </p>
                    <p>
                      <strong>Lớp:</strong> {user.class}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-7 mb-2">
                <div className="card">
                  <div className="card-header">Thông tin chung</div>
                  <div className="card-body">
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Giới tính:</strong>{" "}
                      {user.gender === "M" ? "Nam" : "Nữ"}
                    </p>
                    <p>
                      <strong>Ngày sinh:</strong> {user.date_of_birth}
                    </p>
                    <p>
                      <strong>Hạng thành viên:</strong> {user.role === "paid_user" ? "Thành viên VIP" : "Thành viên miễn phí"}
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
                        "--gpa": user.gpa * 25, // Tỉ lệ phần trăm GPA Hệ 4
                        "--gpa-color": "#007bff", // Màu xanh dương cho GPA Hệ 4
                      }}
                    >
                      <span className="gpa-value">{user.gpa}/4</span>
                    </div>
                    <p>GPA Hệ 4</p>
                  </div>

                  {/* GPA Hệ 10 */}
                  <div className="gpa-item">
                    <div
                      className="gpa-circle"
                      style={{
                        "--gpa": user.system10 * 10, // Tỉ lệ phần trăm GPA Hệ 10
                        "--gpa-color": "#28a745", // Màu xanh lá cây cho GPA Hệ 10
                      }}
                    >
                      <span className="gpa-value">{user.system10}/10</span>
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

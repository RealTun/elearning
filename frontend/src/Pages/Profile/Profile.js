import React from "react";
import Header from "../../layouts/Header/Header";
import "./Profile.css";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  //   {
  //     "_id": "677e49ed0a5dfc4eaeb6f79c",
  //     "username": "dunghq23",
  //     "password": "$2b$10$6/xDyl02FPcs8ygToIVHkun.dBa0cibhNkNTDnB/Cd1Zr.cxfiIHy",
  //     "role": "paid_user",
  //     "study_schedule": [
  //         {
  //             "subjectName": "Hệ thống kinh doanh thông minh",
  //             "subjectCode": "Hệ thống kinh doanh thông minh-1-24 (63HTTT1)",
  //             "timetables": [
  //                 {
  //                     "weekIndex": 3,
  //                     "startHour": "09:45",
  //                     "endHour": "12:25"
  //                 },
  //                 {
  //                     "weekIndex": 6,
  //                     "startHour": "09:45",
  //                     "endHour": "12:25"
  //                 }
  //             ],
  //             "startDate": "11-11-2024",
  //             "endDate": "05-01-2025"
  //         },
  //         {
  //             "subjectName": "Chuyên đề hệ thống thông tin",
  //             "subjectCode": "Chuyên đề hệ thống thông tin-1-24 (63HTTT1)",
  //             "timetables": [
  //                 {
  //                     "weekIndex": 3,
  //                     "startHour": "07:00",
  //                     "endHour": "09:40"
  //                 },
  //                 {
  //                     "weekIndex": 6,
  //                     "startHour": "07:00",
  //                     "endHour": "09:40"
  //                 }
  //             ],
  //             "startDate": "11-11-2024",
  //             "endDate": "05-01-2025"
  //         },
  //         {
  //             "subjectName": "Đa phương tiện",
  //             "subjectCode": "Đa phương tiện-1-24 (63HTTT1)",
  //             "timetables": [
  //                 {
  //                     "weekIndex": 5,
  //                     "startHour": "07:00",
  //                     "endHour": "08:45"
  //                 },
  //                 {
  //                     "weekIndex": 2,
  //                     "startHour": "07:00",
  //                     "endHour": "08:45"
  //                 }
  //             ],
  //             "startDate": "11-11-2024",
  //             "endDate": "05-01-2025"
  //         },
  //         {
  //             "subjectName": "Đa phương tiện",
  //             "subjectCode": "Đa phương tiện-7-24 (63HTTT1 ( TH1 ))",
  //             "timetables": [
  //                 {
  //                     "weekIndex": 4,
  //                     "startHour": "07:00",
  //                     "endHour": "09:40"
  //                 }
  //             ],
  //             "startDate": "25-11-2024",
  //             "endDate": "05-01-2025"
  //         }
  //     ],
  //     "list_mark": [
  //         {
  //             "subjectName": "An toàn và bảo mật thông tin",
  //             "mark": 9,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Cấu trúc dữ liệu và giải thuật",
  //             "mark": 9.2,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Cơ sở dữ liệu",
  //             "mark": 9.8,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Công nghệ phần mềm",
  //             "mark": 7.8,
  //             "mark4": 3,
  //             "charmark": "B"
  //         },
  //         {
  //             "subjectName": "Công nghệ Web",
  //             "mark": 6.1,
  //             "mark4": 2,
  //             "charmark": "C"
  //         },
  //         {
  //             "subjectName": "Hệ quản trị cơ sở dữ liệu",
  //             "mark": 9.2,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Hệ thống thông tin địa lý",
  //             "mark": 8.5,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Học máy",
  //             "mark": 8.7,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Khai phá dữ liệu",
  //             "mark": 7,
  //             "mark4": 3,
  //             "charmark": "B"
  //         },
  //         {
  //             "subjectName": "Kiến trúc máy tính",
  //             "mark": 6.3,
  //             "mark4": 2,
  //             "charmark": "C"
  //         },
  //         {
  //             "subjectName": "Lập trình nâng cao",
  //             "mark": 8.4,
  //             "mark4": 3,
  //             "charmark": "B"
  //         },
  //         {
  //             "subjectName": "Lập trình Python",
  //             "mark": 9.2,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Lập trình Windows",
  //             "mark": 7.5,
  //             "mark4": 3,
  //             "charmark": "B"
  //         },
  //         {
  //             "subjectName": "Linux và phần mềm mã nguồn mở",
  //             "mark": 7.9,
  //             "mark4": 3,
  //             "charmark": "B"
  //         },
  //         {
  //             "subjectName": "Mạng máy tính",
  //             "mark": 9.3,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Nền tảng phát triển Web",
  //             "mark": 9.3,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Nguyên lý hệ điều hành",
  //             "mark": 7.7,
  //             "mark4": 3,
  //             "charmark": "B"
  //         },
  //         {
  //             "subjectName": "Nguyên lý lập trình hướng đối tượng",
  //             "mark": 9.3,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Nhập môn điện toán đám mây",
  //             "mark": 8.2,
  //             "mark4": 3,
  //             "charmark": "B"
  //         },
  //         {
  //             "subjectName": "Nhập môn lập trình",
  //             "mark": 9.4,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Phân tích dữ liệu lớn",
  //             "mark": 9.5,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Phân tích và thiết kế hệ thống thông tin",
  //             "mark": 8.6,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Phát triển ứng dụng cho các thiết bị di động",
  //             "mark": 8.8,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Quản lý dự án công nghệ thông tin",
  //             "mark": 9,
  //             "mark4": 4,
  //             "charmark": "A"
  //         },
  //         {
  //             "subjectName": "Quản trị Hệ thống thông tin",
  //             "mark": 8.3,
  //             "mark4": 3,
  //             "charmark": "B"
  //         },
  //         {
  //             "subjectName": "Toán rời rạc",
  //             "mark": 7.8,
  //             "mark4": 3,
  //             "charmark": "B"
  //         },
  //         {
  //             "subjectName": "Trí tuệ nhân tạo",
  //             "mark": 8.5,
  //             "mark4": 4,
  //             "charmark": "A"
  //         }
  //     ],
  //     "isSynced": true,
  //     "created_at": "2025-01-08T09:48:29.332Z",
  //     "updated_at": "2025-01-09T09:28:55.508Z",
  //     "__v": 0,
  //     "class": "63HTTT1",
  //     "date_of_birth": "18/09/2003",
  //     "department": "Khoa Công nghệ thông tin",
  //     "email": "haquangdung18092003@gmail.com",
  //     "full_name": "Hạ Quang Dũng",
  //     "gender": "M",
  //     "gpa": 3.42,
  //     "major": "Hệ thống thông tin",
  //     "uid": "2151160535"
  // }
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

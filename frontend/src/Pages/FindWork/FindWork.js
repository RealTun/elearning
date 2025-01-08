import React, { useState } from "react";
import "./FindWork.css"; // Chỉ cần giữ các phần không liên quan đến phân trang
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";

const FindWork = () => {
  // Danh sách công việc (giả lập dữ liệu)
  const jobs = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: `Tester`,
    company: `Công ty Cổ phần công nghệ và dịch vụ ${index + 1}`,
    salary: "Thỏa thuận",
    location: "Hà Nội",
  }));

  // Quản lý trạng thái phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Tính toán dữ liệu cần hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  // Số lượng trang
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  return (
    <div className="findwork">
      {/* Header */}
      <Header
        username="HuongPTA"
        title="Tìm việc"
        middleContent={<SearchItem />}
      />

      {/* Nội dung */}
      <div className="findwork-content p-3">
        {/* Tìm kiếm */}
        <div className="search-section py-4 bg-light shadow-sm rounded">
          <div className="text-center">
            <h3 className="mb-4 text-dark">Tìm kiếm công việc của bạn</h3>
            <div className="input-group mb-3 w-75 mx-auto">
              <input
                type="text"
                placeholder="Nhập vị trí việc làm..."
                className="form-control rounded-start"
              />
              <button className="btn btn-danger px-4 rounded-end">
                Tìm kiếm
              </button>
            </div>
            <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-outline-danger mx-2 px-4 rounded-pill">
                Công việc phù hợp
              </button>
              <button className="btn btn-outline-primary mx-2 px-4 rounded-pill">
                Dev
              </button>
              <button className="btn btn-outline-primary mx-2 px-4 rounded-pill">
                BA
              </button>
              <button className="btn btn-outline-primary mx-2 px-4 rounded-pill">
                Tester
              </button>
            </div>
          </div>
        </div>

        {/* Gợi ý công việc */}
        <div className="recommendations">
          <h2>Đề xuất</h2>
          <div className="row">
            {currentJobs.map((job) => (
              <div key={job.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body text-center">
                    <div className="job-logo bg-light p-3 mb-3">Logo Cty</div>
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text">{job.company}</p>
                    <div className="d-flex justify-content-between">
                      <span>{job.salary}</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang với Bootstrap */}
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default FindWork;

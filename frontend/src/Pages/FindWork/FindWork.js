import React, { useState, useEffect } from "react";
import "./FindWork.css"; // Chỉ cần giữ các phần không liên quan đến phân trang
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";
import API_URL from "../../config/API_URL";

const FindWork = () => {
  // Quản lý trạng thái tìm kiếm và công việc
  const [searchTerm, setSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSuggestedCollapsed, setIsSuggestedCollapsed] = useState(false); // Thêm trạng thái collapse cho "Đề xuất công việc"
  const [suggestedJobs, setSuggestedJobs] = useState([]); // Thêm state cho các công việc đề xuất
  const itemsPerPage = 6;

  // Tính toán dữ liệu cần hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  // Số lượng trang
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  // Gọi API tìm kiếm công việc
  const fetchAPI = async (url, method = "POST", body = {}) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        return await response.json();
      } else {
        console.error("Failed to fetch:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Gọi API tìm kiếm công việc
  const handleSearch = async () => {
    if (!searchTerm) {
      alert("Không được để trống!");
      return;
    }

    const data = await fetchAPI(`${API_URL}/jobs/search`, "POST", { keyword: searchTerm, limit: 50, page: 0 });

    if (data) {
      setJobs(data.data);
      setIsCollapsed(true);
    }
  };

  // Gọi API để lấy công việc đề xuất
  const handleSuggestedJobsCollapse = async () => {
    if (!isSuggestedCollapsed) {
      const predictedData = await fetchAPI(`${API_URL}/predict/career`, "POST");

      if (predictedData && predictedData.data) {
        const suggestedData = await fetchAPI(
          `${API_URL}/jobs/search`,
          "POST",
          { keyword: predictedData.data, limit: 3, page: 0 }
        );

        if (suggestedData) {
          setSuggestedJobs(suggestedData.data);
        }
      }
    }
  };

  return (
    <div className="findwork">
      {/* Header */}
      <Header username="HuongPTA" title="Tìm việc" />

      {/* Nội dung */}
      <div className="findwork-content p-3">
        {/* Tìm kiếm */}
        <div className="search-section py-4 bg-light shadow-sm rounded">
          <div className="text-center">
            <div className="input-group mb-3 w-75 mx-auto">
              <input
                type="text"
                placeholder="Nhập vị trí việc làm..."
                className="form-control rounded-start"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa
              />
              <button
                className="btn btn-danger px-4 rounded-end"
                onClick={handleSearch} // Gọi API khi ấn nút tìm kiếm
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách công việc */}
        <div className="recommendations">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Danh sách công việc</h2>
            <button
              className="btn btn-info"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseRecommendations"
              aria-expanded={isCollapsed ? "true" : "false"}
              aria-controls="collapseRecommendations"
              onClick={() => setIsCollapsed(!isCollapsed)} // Đổi trạng thái khi click
            >
              {isCollapsed ? (
                <i className="bi bi-arrow-up-circle"></i> // Icon lên
              ) : (
                <i className="bi bi-arrow-down-circle"></i> // Icon xuống
              )}
            </button>
          </div>

          <div
            id="collapseRecommendations"
            className={`collapse ${isCollapsed ? "show" : ""}`} // Thêm class 'show' khi mở
          >
            <div className="row">
              {currentJobs.map((job) => (
                <div key={job.id} className="col-md-4 mb-4">
                  <div className="card" style={{minHeight: '300px'}}>
                    <a
                      className="job-link text-decoration-none"
                      href={job.jobUrl}
                      rel="noopener"
                      target="_blank"
                    >
                      <div className="card-body text-center">
                        <div className="job-logo bg-light p-3 mb-3">
                          <img
                            src={job.companyLogo}
                            alt="Company Logo"
                            style={{ maxHeight: "80px", objectFit: "contain" }}
                          />
                        </div>
                        <h5 className="card-title">{job.jobTitle}</h5>
                        <p className="card-text">{job.companyName}</p>
                        <div className="d-flex justify-content-between">
                          <span>{job.workingLocations}</span>
                        </div>
                      </div>
                    </a>
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
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
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

        {/* Đề xuất công việc */}
        <div className="suggested-jobs">
          <div className="d-flex justify-content-between align-items-center mb-3 p-3">
            <h2>Đề xuất công việc</h2>
            <button
              className="btn btn-info"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSuggestedJobs"
              aria-expanded={isSuggestedCollapsed ? "true" : "false"}
              aria-controls="collapseSuggestedJobs"
              onClick={() => {
                setIsSuggestedCollapsed(!isSuggestedCollapsed); // Thay đổi trạng thái collapse
                handleSuggestedJobsCollapse(); // Gọi API khi mở
              }}
            >
              {isSuggestedCollapsed ? (
                <i className="bi bi-arrow-up-circle"></i> // Icon lên
              ) : (
                <i className="bi bi-arrow-down-circle"></i> // Icon xuống
              )}
            </button>
          </div>

          <div
            id="collapseSuggestedJobs"
            className={`collapse ${isSuggestedCollapsed ? "show" : ""}`} // Thêm class 'show' khi mở
          >
            <div className="row">
              {suggestedJobs.length > 0 ? (
                suggestedJobs.map((job) => (
                  <div key={job.id} className="col-md-4 mb-4">
                    <div className="card" style={{minHeight: '300px'}}>
                      <a
                        className="job-link text-decoration-none"
                        href={job.jobUrl}
                        rel="noopener"
                        target="_blank"
                      >
                        <div className="card-body text-center">
                          <div className="job-logo bg-light p-3 mb-3">
                            <img
                              src={job.companyLogo}
                              alt="Company Logo"
                              style={{ maxHeight: "80px", objectFit: "contain" }}
                            />
                          </div>
                          <h5 className="card-title">{job.jobTitle}</h5>
                          <p className="card-text">{job.companyName}</p>
                          <div className="d-flex justify-content-between">
                            <span>{job.workingLocations}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>Đang tải công việc đề xuất...</p> // Thông báo khi đang tải công việc
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindWork;
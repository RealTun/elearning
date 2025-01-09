import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/API_URL";
import Loading from "../../components/Loading/Loading";
import "./ShowCourse.css";

const convertToEmbedUrl = (url) => {
  if (!url) return "";

  // Kiểm tra nếu URL có chứa "watch?v="
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  // Kiểm tra nếu URL có dạng `youtu.be`
  if (url.includes("youtu.be")) {
    return url.replace("youtu.be/", "www.youtube.com/embed/");
  }

  // Nếu URL đã là embed
  if (url.includes("embed/")) {
    return url;
  }

  return url; // Trả về URL gốc nếu không khớp
};

const ShowCourse = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [courseDetail, setCourseDetail] = useState(null); // Thay đổi để tránh lỗi khi dữ liệu null
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Theo dõi video đang phát
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/studyMaterials/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
        if (response) {
          setCourseDetail(response.data.data); // Lưu dữ liệu khóa học
          console.log("Fetched Data:", response.data.data); // Log ngay sau khi fetch
        }
      } catch (err) {
        setError(err.message); // Lưu lỗi (nếu có)
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };

    fetchCourseDetail();
  }, [id]); // Chỉ chạy lại khi `id` thay đổi

  if (loading) return <Loading />;
  if (error) return <div>Lỗi: {error}</div>;
  if (!courseDetail) return <div>Không có dữ liệu để hiển thị</div>;

  const { playlist_title, list_video } = courseDetail;
  const currentVideo = list_video[currentVideoIndex];

  // Điều hướng video
  const handlePrevious = () => {
    if (currentVideoIndex > 0) setCurrentVideoIndex(currentVideoIndex - 1);
  };

  const handleNext = () => {
    if (currentVideoIndex < list_video.length - 1)
      setCurrentVideoIndex(currentVideoIndex + 1);
  };

  return (
    <div className="show-course">
      {/* Header */}
      <div className="header">
        <div className="logo">
          <span className="fw-bold">Nhóm 4 - Cụm 1</span>
        </div>
        <h5 className="m-0">{playlist_title || "Không có dữ liệu"}</h5>
        <div className="help">
          <button className="btn btn-outline-light btn-sm">Hướng dẫn</button>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="row">
        {/* Trình phát video */}
        <div className="col-md-9 video-player-container">
          <div className="video-player">
            <iframe
              className="video-frame"
              src={convertToEmbedUrl(currentVideo.url)}
              title="React Course"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Nội dung khóa học */}
        <div className="col-md-3 course-content">
          <h6 className="fw-bold">Danh sách bài học</h6>
          <ul className="list-group">
            {list_video.map((video, index) => (
              <li
                key={video._id}
                className={`list-group-item ${
                  index === currentVideoIndex ? "active" : ""
                }`}
                onClick={() => setCurrentVideoIndex(index)}
              >
                <strong>Bài {index+1}:</strong> {video.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-nav">
        <button
          className="btn btn-outline-secondary"
          onClick={handlePrevious}
          disabled={currentVideoIndex === 0}
        >
          Bài trước
        </button>
        <button
          className="btn btn-outline-success"
          onClick={handleNext}
          disabled={currentVideoIndex === list_video.length - 1}
        >
          Bài tiếp theo
        </button>
      </div>
    </div>
  );
};

export default ShowCourse;

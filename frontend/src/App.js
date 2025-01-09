import "./App.css";
import { useEffect } from "react";
import { useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "./layouts/SideBar/SideBar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ShowCourse from "./Pages/Course/ShowCourse";
import Document from "./Pages/Document/Document";
import FindWork from "./Pages/FindWork/FindWork";
import Profile from "./Pages/Profile/Profile";
import Schedule from "./Pages/Schedule/Schedule";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Setting from "./Pages/Setting/Setting";
import Chatbot from "./Pages/Chatbot/Chatbot";
import Course from "./Pages/Course/Course";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Các route không cần SideBar
  const noSideBarRoutes = ["/login", "/signup"];
  const hideSideBar = noSideBarRoutes.includes(location.pathname);

  // Kiểm tra token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isTokenExpired()) {
      localStorage.clear(); // Xóa toàn bộ dữ liệu trong localStorage
      toast.warning("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!");
      navigate("/login"); // Chuyển hướng về trang đăng nhập
    }
    if (!token) {
      localStorage.clear(); // Xóa toàn bộ dữ liệu trong localStorage
      navigate("/login"); // Chuyển hướng về trang đăng nhập
    }
  }, [location.pathname, navigate]);

  const isTokenExpired = () => {
    const expiredTime = localStorage.getItem("expiredTime");
    const now = new Date().getTime();
    return expiredTime && now > Number(expiredTime); // So sánh thời gian hiện tại với thời gian hết hạn
  };

  return (
    <div className="container-wrapper">
      {/* Ẩn SideBar cho các route không cần */}
      {!hideSideBar && <SideBar />}

      <div className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course" element={<Course />} />
          {/* <Route path="/course" element={<ShowCourse />} /> */}
          <Route path="/document" element={<Document />} />
          <Route path="/findwork" element={<FindWork />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/studyMaterials/:id" element={<ShowCourse />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;

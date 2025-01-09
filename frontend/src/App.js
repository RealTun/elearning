import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "./layouts/SideBar/SideBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Course from "./Pages/Course/Course";
import Document from "./Pages/Document/Document";
import FindWork from "./Pages/FindWork/FindWork";
import Profile from "./Pages/Profile/Profile";
import Schedule from "./Pages/Schedule/Schedule";
import Login from "./Pages/Login/Login";
import Setting from "./Pages/Setting/Setting";
import Chatbot from "./Pages/Chatbot/Chatbot";
import Signup from "./Pages/Signup/Signup";
import ShowCourse from "./Pages/Course/ShowCourse";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const noSideBarRoutes = ["/login", "/signup"];
  const hideSideBar = noSideBarRoutes.includes(location.pathname);

  useEffect(() => {
    if (isTokenExpired()) {
      // Token đã hết hạn
      localStorage.clear();
      toast.warning("Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại!");

      navigate("/login"); // Chuyển hướng về trang đăng nhập
    }
  }, [location.pathname]); // Kiểm tra mỗi khi đường dẫn thay đổi

  const isTokenExpired = () => {
    const expiredTime = localStorage.getItem("expiredTime");
    const now = new Date().getTime();
    return expiredTime && now > Number(expiredTime);
  };

  return (
    <div className="container-wrapper">
      {/* {!isLoginRoute && <SideBar />} */}
      {!hideSideBar && <SideBar />}

      <div className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/course" element={<Course />} /> */}
          <Route path="/course" element={<ShowCourse />} />
          <Route path="/document" element={<Document />} />
          <Route path="/findwork" element={<FindWork />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

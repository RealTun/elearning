import "./App.css";
import SideBar from "./layouts/SideBar/SideBar";
import { BrowserRouter as Router, Routes, Route, Link ,useLocation} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Course from "./Pages/Course/Course";
import Document from "./Pages/Document/Document";
import FindWork from "./Pages/FindWork/FindWork";
import Profile from "./Pages/Profile/Profile";
import Schedule from "./Pages/Schedule/Schedule";
import Login from "./Pages/Login/Login";
import Setting from "./Pages/Setting/Setting";
import Chatbot from "./Pages/Chatbot/Chatbot";

const App = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  return (
    <div className="container-wrapper">
    {!isLoginRoute && <SideBar />}

      <div className="main">  
        {/* Các Routes */}
        {/* <Headers></Headers> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course" element={<Course />} />
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

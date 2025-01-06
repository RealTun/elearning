import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import { BrowserRouter as Router, Routes, Route, Link ,useLocation} from "react-router-dom";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Course from "./components/Pages/Course/Course";
import Document from "./components/Pages/Document/Document";
import FindWork from "./components/Pages/FindWork/FindWork";
import Profile from "./components/Pages/Profile/Profile";
import Schedule from "./components/Pages/Schedule/Schedule";
import Login from "./components/Pages/Login/Login";
import Setting from "./components/Pages/Setting/Setting";
import Chatbot from "./components/Pages/Chatbot/Chatbot";

const App = () => {
  //test check ui login
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

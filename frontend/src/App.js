import logo from "./logo.svg";
import "./App.css";
import SideBar from "./components/SideBar/SideBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Course from "./components/Pages/Course/Course";
import Document from "./components/Pages/Document/Document";
import FindWork from "./components/Pages/FindWork/FindWork";
import Profile from "./components/Pages/Profile/Profile";
import Schedule from "./components/Pages/Schedule/Schedule";
import Login from "./components/Pages/Login/Login";
import Setting from "./components/Pages/Setting/Setting";

function App() {
  return (
    <div className="App">
      <SideBar />
      <div className="main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Course />} />
          <Route path="/ranking" element={<Document />} />
          <Route path="/summary" element={<FindWork />} />
          <Route path="/report" element={<Profile />} />
          <Route path="/profile" element={<Schedule />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/help" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

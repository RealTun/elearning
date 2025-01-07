import React from "react";
import "./Profile.css";
import Header from "../../layouts/Header/Header";

const Profile = () => {
  return (
    // <div className={`Profile`}>
    //   <h1>Đây là Component Profile</h1>
    // </div>
    <div className="profile">
      <Header userName="HuongPTA" title="Thông tin cá nhân"></Header>
      {/* Nội dung khác */}
    </div>
  );
};

export default Profile;

import React from "react";

const Header = ({ userName, children }) => {
  return (
    <div className="container-fluid mb-4 mt-3">
      <div className="row align-items-center">
        {/* Phần "Tổng quan" */}
        <div className="col-md-4 text-start d-flex align-items-center">
          <h4 className="mb-0">{children}</h4>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="col-md-4 text-center">
            <div className="input-group rounded-5 border border-dark">
                <span className="input-group-text bg-white border-0 rounded-start-5">
                <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                type="text"
                className="form-control border-0 rounded-end-5"
                placeholder="Tìm kiếm..."
                style={{ height: '38px' }}
                />
            </div>
        </div>

        {/* Thông báo và tên người dùng */}
        <div className="col-md-4 text-end d-flex justify-content-end align-items-center">
            <button className="btn btn-light position-relative me-3 ">
                {/* 🔔 */}
                 <i class="fa-regular fa-bell fa-lg"></i>
                 {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span> */}
            </button>
            <div className="d-flex justify-content-center align-items-center border border-black rounded-5 px-3 py-2">
                <i className="fa-regular fa-circle-user fa-lg me-4"></i>
                <span>{userName}</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

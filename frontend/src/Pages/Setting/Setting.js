import { React, useState } from "react";
import Header from "../../layouts/Header/Header";
import "./Setting.css";
import API_URL from "../../config/API_URL";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS

const Setting = () => {
  const [loading, setLoading] = useState(false);
  const [showModalSync, setShowModalSync] = useState(false);
  const [showModalPassword, setShowModalPassword] = useState(false);
  const [showModalChangeRoleUser, setShowModalChangeRoleUser] = useState(false);
  const [syncData, setSyncData] = useState({
    username: "",
    password: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSyncChange = (e) => {
    const { name, value } = e.target;
    setSyncData({ ...syncData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSyncSubmit = async (e) => {
    e.preventDefault();

    setShowModalSync(false); // Đóng modal sau khi submit

    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.post(
        `${API_URL}/student/syncData`,
        {
          username: syncData.username,
          password: syncData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // Xử lý theo mã trạng thái
      if (response.status === 200) {
        toast.success("Đồng bộ dữ liệu thành công!"); // Thông báo thành công
      } else if (response.status === 400) {
        toast.error("Dữ liệu đồng bộ không hợp lệ. Vui lòng kiểm tra lại!");
      } else if (response.status === 503) {
        toast.warning("Hệ thống đang bảo trì. Vui lòng thử lại sau!");
      }
    } catch (err) {
      toast.error("Không thể kết nối đến server. Vui lòng thử lại sau!");
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    setShowModalPassword(false);
    setLoading(true); // Bắt đầu loading

    try {
      const response = await axios.patch(
        `${API_URL}/user/changePassword`,
        {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        toast.success("Đổi mật khẩu thành công!");
      }
    } catch (err) {
      console.error("Lỗi khi đổi mật khẩu:", err);

      // Kiểm tra lỗi HTTP
      if (err.response) {
        const { status } = err.response;
        if (status === 400) {
          toast.warning("Mật khẩu hiện tại không chính xác!");
        } else if (status === 404) {
          toast.error("Người dùng không tồn tại");
        } else if (status === 500) {
          toast.error("Không thể kết nối đến server. Vui lòng thử lại sau!");
        }
      } else {
        // Lỗi khác (mạng, không phản hồi, v.v.)
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
      }
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleChangeRoleUser = async (e) => {
    e.preventDefault();
    setShowModalChangeRoleUser(false);
    setLoading(true); // Bắt đầu loading

    try {
      const response = await axios.patch(
        `${API_URL}/student/role`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.setItem("token", response.data.data)
        toast.success("Nâng cấp người dùng thành công!");
      }
    } catch (err) {
      // Kiểm tra lỗi HTTP
      if (err.response) {
        const { status } = err.response;
        if (status === 400) {
          toast.warning("Nâng cấp người dùng thất bại!");
        } else if (status === 401) {
          toast.error("Bạn không có quyền truy cập. Vui lòng đăng nhập lại!");
          // Tùy chọn: Redirect người dùng về trang đăng nhập
          localStorage.removeItem("token");
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000); // Chuyển trang sau 3 giây
        } else if (status === 500) {
          toast.error("Không thể kết nối đến server. Vui lòng thử lại sau!");
        }
      } else {
        // Lỗi khác (mạng, không phản hồi, v.v.)
        toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau!");
      }
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="setting">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hiển thị Loading khi loading = true */}
      {loading && <Loading />}

      <Header username="HuongPTA" title="Cài đặt"></Header>

      {/* Nội dung chính */}
      <div className="setting-content p-4 rounded shadow-sm mt-4 bg-white">
        <h2 className="text-primary mb-4">Tùy chọn cài đặt</h2>

        {/* Các tùy chọn */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div
              style={{ minHeight: "200px", maxHeight: "240px" }}
              className="card p-3 border-primary shadow-sm overflow-hiden"
            >
              <h5 className="card-title text-primary">Đồng bộ dữ liệu</h5>
              <p className="card-text text-muted">
                Đồng bộ dữ liệu từ tài khoản sinh viên.
              </p>
              <button
                className="btn btn-primary w-100"
                onClick={() => setShowModalSync(true)}
              >
                Thực hiện
              </button>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              style={{ minHeight: "200px", maxHeight: "240px" }}
              className="card p-3 border-danger shadow-sm overflow-hiden"
            >
              <h5 className="card-title text-danger">Đổi mật khẩu</h5>
              <p className="card-text text-muted">
                Cập nhật mật khẩu mới để tăng cường bảo mật tài khoản của bạn.
              </p>
              <button
                className="btn btn-danger w-100"
                onClick={() => setShowModalPassword(true)}
              >
                Thực hiện
              </button>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div
              style={{ minHeight: "200px", maxHeight: "240px" }}
              className="card p-3 border-success shadow-sm overflow-hiden"
            >
              <h5 className="card-title text-success">Nâng cấp tài khoản</h5>
              <p className="card-text text-muted">
                Trở thành thành viên VIP để sử dụng nhiều tính năng hơn.
              </p>
              <button
                className="btn btn-success w-100"
                onClick={() => setShowModalChangeRoleUser(true)}
              >
                Thực hiện
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách khác */}
        <div className="additional-options mt-5">
          <h4 className="text-secondary mb-3">Tùy chọn khác</h4>
          <ul className="list-group">
            <li className="list-group-item">Quản lý thông báo</li>
            <li className="list-group-item">Cập nhật thông tin tài khoản</li>
            <li className="list-group-item">Xóa tài khoản</li>
          </ul>
        </div>

        {/* Modal Đồng bộ dữ liệu */}
        {showModalSync && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Đồng bộ dữ liệu</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalSync(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSyncSubmit}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Mã sinh viên
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                        value={syncData.username}
                        onChange={handleSyncChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        value={syncData.password}
                        onChange={handleSyncChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Đồng bộ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Đổi mật khẩu */}
        {showModalPassword && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Đổi mật khẩu</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalPassword(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-3">
                      <label htmlFor="oldPassword" className="form-label">
                        Mật khẩu cũ
                      </label>
                      <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        className="form-control"
                        value={passwordData.oldPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        Mật khẩu mới
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        className="form-control"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Nhập lại mật khẩu mới
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-control"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-danger w-100">
                      Đổi mật khẩu
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Đổi mật khẩu */}
        {showModalChangeRoleUser && (
          <div className="modal fade show" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Thay đổi quyền người dùng</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModalChangeRoleUser(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleChangeRoleUser}>
                    <button type="submit" className="btn btn-success w-100">
                      Nâng cấp người dùng
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nền tối cho modal */}
        {(showModalSync || showModalPassword || showModalChangeRoleUser) && (
          <div className="modal-backdrop fade show"></div>
        )}
      </div>
    </div>
  );
};

export default Setting;

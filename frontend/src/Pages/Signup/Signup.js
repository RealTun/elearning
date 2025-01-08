import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({}); // State lưu lỗi
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateUsername = (value) => {
        const usernameRegex = /^[^\W_]+.*$/; // Không bắt đầu bằng ký tự đặc biệt hoặc dấu gạch dưới
        return usernameRegex.test(value)
        ? ""
        : "Tên đăng nhập không được bắt đầu bằng ký tự đặc biệt!";
    };

    const validatePassword = (value) => {
        return value.length >= 8
        ? ""
        : "Mật khẩu phải có ít nhất 8 ký tự!";
    };

    const validateConfirmPassword = (value) => {
        return value === password
        ? ""
        : "Mật khẩu xác nhận không khớp!";
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);

        const error = validateUsername(value);
        setErrors((prevErrors) => ({
        ...prevErrors,
        username: error,
        }));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const error = validatePassword(value);
        setErrors((prevErrors) => ({
        ...prevErrors,
        password: error,
        }));

        // Xác thực lại Confirm Password khi mật khẩu thay đổi
        const confirmError = validateConfirmPassword(confirmPassword);
        setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: confirmError,
        }));
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        const error = validateConfirmPassword(value);
        setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: error,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra toàn bộ form trước khi submit
        const formErrors = {
        username: validateUsername(username),
        password: validatePassword(password),
        confirmPassword: validateConfirmPassword(confirmPassword),
        };

        setErrors(formErrors);

        if (Object.values(formErrors).some((error) => error)) {
        return; // Không submit nếu có lỗi
        }

        // Xử lý đăng ký thành công
        setLoading(true);
        setTimeout(() => {
        setLoading(false);
    
        // Hiển thị thông báo Toast
        toast.success("Đăng ký tài khoản thành công!", {
            position: "top-right",
            autoClose: 1500, // Tự động đóng sau 2 giây
            onClose: () => navigate("/login"), // Chuyển hướng sau khi toast đóng
        });
        }, 2000);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            {/* ToastContainer để hiển thị thông báo */}
            <ToastContainer />
            <div className="login-container shadow-lg">
                {/* Ảnh bên cạnh */}
                <div className="login-image">
                    <img
                        src="https://i.pinimg.com/736x/66/fc/01/66fc01237650a7ef751b5c77e301c38f.jpg"
                        alt="Education"
                        className="custom-img"
                    />
                </div>
                { /* Form đăng ký */}
                <div className="login-form p-5 bg-white">
                    <h2 className="text-center mb-4 fw-bold mt-3">Đăng ký</h2>
                    <form onSubmit={handleSubmit} className="mt-2 mx-4 px-1">
                        <div className="mb-2 mt-3">
                        <label htmlFor="username" className="form-label fw-bold mt-3">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? "is-invalid" : ""}`}
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {errors.username && (
                            <div className="invalid-feedback">{errors.username}</div>
                        )}
                        </div>
                        <div className="mb-2">
                        <label htmlFor="password" className="form-label fw-bold">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                        </div>
                        <div className="mb-3">
                        <label
                            htmlFor="confirmPassword"
                            className="form-label fw-bold"
                        >
                            Nhập lại mật khẩu
                        </label>
                        <input
                            type="password"
                            className={`form-control ${
                            errors.confirmPassword ? "is-invalid" : ""
                            }`}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                        />
                        {errors.confirmPassword && (
                            <div className="invalid-feedback">
                            {errors.confirmPassword}
                            </div>
                        )}
                        </div>

                        <button
                        type="submit"
                        className="btn btn-danger w-100 fw-bold"
                        disabled={loading}
                        >
                        {loading ? (
                            <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                            Đang xử lý...
                            </>
                        ) : (
                            "Đăng ký"
                        )}
                        </button>
                    </form>
                    <p className="text-center mt-3">
                        <a
                        href="/login"
                        className="text-decoration-none text-black"
                        >
                        Bạn đã có tài khoản? Đăng nhập
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;

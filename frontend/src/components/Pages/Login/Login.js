import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //test login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Bắt đầu loading
  
    setTimeout(() => {
      // Giả lập xử lý đăng nhập
      if (username === "2151163702" && password === "1234") {
        navigate("/dashboard");
      } else {
        alert("Mã sinh viên hoặc mật khẩu không đúng!");
      }
      setIsLoading(false); // Kết thúc loading
    }, 2000); // Giả lập 2 giây xử lý
  };


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="login-container shadow-lg">
        {/* Form đăng nhập */}
        <div className="login-form p-5 bg-white">
          <h2 className="text-center mb-4 fw-bold mt-3">Đăng nhập</h2>
          <div className="border-top border-danger m-4" style={{ borderWidth: "4px"}}></div>
          <h5 className="text-center">Explore the World!</h5>
          <form onSubmit={handleSubmit} className="mt-2 mx-4 px-1">
            <div className="mb-3 mt-3">
                <label htmlFor="username" className="form-label fw-bold mt-3">Mã sinh viên</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-danger w-100 fw-bold" disabled={loading}>
                {loading ? 
                (<>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Đang xử lý...
                </>
                ) : ("Đăng nhập")}
            </button>
          </form>
          <p className="text-center mt-3">
            <a href="/forgot-password" className="text-decoration-none text-black">Quên mật khẩu?</a>
          </p>
        </div>

        {/* Ảnh bên cạnh */}
        <div className="login-image">
          <img
            src="https://i.pinimg.com/736x/66/fc/01/66fc01237650a7ef751b5c77e301c38f.jpg"
            alt="Education"
            className="custom-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import "./Document.css";
import Header from "../../Header/Header";

const Document = () => {
  return (
    // <div className={`Document`}>
    //   <h1>Đây là Component Document</h1>
    // </div>

    <div className="document-container">
      <Header userName="HuongPTA">
        <h4 className="document-title">Tài liệu</h4>
      </Header>
      {/* Nội dung khác */}
    </div>
  );
};

export default Document;

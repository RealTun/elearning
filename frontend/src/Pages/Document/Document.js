import React from "react";
import "./Document.css";
import Header from "../../layouts/Header/Header";
import SearchItem from "../../components/SearchItem/SearchItem";

const Document = () => {
  return (
    // <div className={`Document`}>
    //   <h1>Đây là Component Document</h1>
    // </div>

    <div className="document">
      <Header 
        username="HuongPTA" 
        title="Tài liệu"
        middleContent = {<SearchItem/>}      
        >
      </Header>
      {/* Nội dung khác */}
    </div>
  );
};

export default Document;

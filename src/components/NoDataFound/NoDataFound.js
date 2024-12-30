import React from "react";
import "./NoDataFound.css";
import { IoSearchSharp } from "react-icons/io5";

function NoDataFound({ message = "No data found. Please try again with a different query." }) {
  return (
    <div className="no-data-container">
      <div className="no-data-icon">
        <IoSearchSharp />
      </div>
      <p className="no-data-message">{message}</p>
    </div>
  );
}

export default NoDataFound;

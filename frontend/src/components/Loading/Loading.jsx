import React from "react";
import Footer from "../Footer/Footer";
import Navigation from "../Navbar/Navbar";

import "./Loading.css";

function Loading() {
  return (
    <>
      <Navigation />
      <hr className="h-divider" size="4" />
      <div className="overlay">
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading;

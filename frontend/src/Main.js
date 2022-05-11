import * as React from "react";

import { Navbar, Footer, LandingPage, ScrollArrow } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Main.css";

const Main = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        theme="dark"
        className="text-start"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <hr className="h-divider" size="4" />
      {/* CONTENT */}
      <LandingPage />

      <hr className="h-divider mt-5" size="4" />
      <Footer />
      {/* NEED TO FIX THIS SCROLL MAKE IT ON THE RIGHT AND MORE OPACITY */}
      <ScrollArrow />
    </>
  );
};

export default Main;

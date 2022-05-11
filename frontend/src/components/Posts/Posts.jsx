import React from "react";

import images from "../../resources/images";
import { Navbar, Footer } from "../";
import "./Posts.css";

const Posts = () => {
  return (
    <>
      <Navbar />
      <hr className="h-divider mt-3" size="4" />

      <hr className="h-divider mt-3" size="4" />
      <Footer />
    </>
  );
};

export default Posts;

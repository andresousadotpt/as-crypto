import React from "react";
import Footer from "../Footer/Footer";
import Navigation from "../Navbar/Navbar";

import "./404.css";

const p404 = () => {
  return (
    <>
      <Navigation />
      <hr className="h-divider" size="4" />

      <a href="/" target="_blank" rel="noreferrer">
        <header className="top-header"></header>
        {/*dust particel*/}
        <div>
          <div className="starsec" />
          <div className="starthird" />
          <div className="starfourth" />
          <div className="starfifth" />
        </div>
        {/*Dust particle end-*/}
        <div className="lamp__wrap">
          <div className="lamp">
            <div className="cable" />
            <div className="cover" />
            <div className="in-cover">
              <div className="bulb" />
            </div>
            <div className="light" />
          </div>
        </div>
        {/* END Lamp */}
      </a>
      <section className="error">
        <a href="/" target="_blank" rel="noreferrer">
          {/* Content */}
        </a>
        <div className="error__content">
          <a href="/" target="_blank" rel="noreferrer">
            <div className="error__message message">
              <h1 className="message__title">404 Page Not Found</h1>
              <p className="message__text">
                We&apos;re sorry, the page you were looking for isn&apos;t found
                here. The link you followed may either be broken or no longer
                exists. Please try again, or take a look at our.
              </p>
            </div>
          </a>
          <div className="error__nav e-nav">
            <a href="/" target="_blank" rel="noreferrer"></a>
            <a href="/" target="_blank" className="e-nav__link" />
          </div>
        </div>
        {/* END Content */}
      </section>

      <hr className="h-divider" size="4" />
      <Footer />
    </>
  );
};

export default p404;

import React, { Component } from "react";
import $ from "jquery";

import "./Staff.css";
import images from "../../../resources/images";

//https://www.bootdey.com/snippets/view/dark-timeline#html

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidMount() {
    /* Demo purposes only */
    $(".hover").mouseleave(function () {
      $(this).removeClass("hover");
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 1000;
    // 13 7
    // d-flex justify-content-center ""
    if (isMobile) {
      return (
        <>
          <h1 className="text-center mt-2 mb-1" id="staff">
            Staff
          </h1>
          <div className="container">
            <hr className="mt-2 mb-5" size="4" />
          </div>
          <div className="text-center">
            <figure className="snip1574">
              <img src={images.staff1} alt="Staff" width={310} height={310} />
              <figcaption>
                <blockquote>
                  <p></p>
                </blockquote>
                <h3>André Sousa</h3>
                <h5>Founder</h5>
                <h6>Web Developer</h6>
              </figcaption>
            </figure>
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="text-center mt-2 mb-1" id="staff">
          Staff
        </h1>
        <div className="container">
          <hr className="mt-2 mb-5" size="4" />
        </div>
        <div className="text-center">
          <figure className="snip1574">
            <img src={images.staff1} alt="Staff" />
            <figcaption>
              <blockquote>
                <p></p>
              </blockquote>
              <h3>André Sousa</h3>
              <h5>Founder</h5>
              <h6>Web Developer</h6>
            </figcaption>
          </figure>
        </div>
      </>
    );
  }
}

export default Staff;

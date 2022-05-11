import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import $ from "jquery";

import "./Counter.css";

/**
 * Not using <Footer> because reactbootstrap doesn't have a component for that idk why xD
 */

class Counter extends Component {
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
    $(".counter").each(function () {
      $(this)
        .prop("Counter", 0)
        .animate(
          {
            Counter: $(this).text(),
          },
          {
            duration: 4000,
            easing: "swing",
            step: function (now) {
              $(this).text(Math.ceil(now));
            },
          }
        );
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

    if (isMobile) {
      return (
        <>
          <Container style={{ marginTop: "5rem", marginBottom: "2rem" }}>
            <Row className="d-flex justify-content-center">
              {/* md={7} FICA FIXE PARA MOBILE */}
              <Col>
                <div className="text-center">
                  <span className="counter">9999</span>
                  <p className="counter-txt">NFTs</p>
                </div>
              </Col>
              <Col>
                <div className="text-center">
                  <span className="counter">120</span>
                  <p className="counter-txt">Traits</p>
                </div>
              </Col>
              <Col>
                <div className="text-center">
                  <span className="counter">1</span>
                  <p className="counter-txt">Artist</p>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      );
    }

    return (
      <>
        <Container style={{ marginTop: "5rem", paddingLeft: "0" }}>
          <Row className="">
            {/* md={7} FICA FIXE PARA MOBILE */}
            <Col xs={4}>
              <div className="text-center">
                <span className="counter">9999</span>
                <p className="counter-txt">NFTs</p>
              </div>
            </Col>
            <Col xs={4}>
              <div className="text-center">
                <span className="counter">120</span>
                <p className="counter-txt">Traits</p>
              </div>
            </Col>
            <Col xs={4}>
              <div className="text-center">
                <span className="counter">1</span>
                <p className="counter-txt">Artist</p>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Counter;

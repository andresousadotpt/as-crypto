import React, { Component } from "react";
import { Button, Container, Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import { ImArrowUpRight2 } from "react-icons/im";
import Counter from "./Counter/Counter";

import images from "../../../resources/images";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: [],
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidMount() {
    axios
      .get(
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH&tsyms=EUR"
      )
      .then((res) => {
        let cryptos = res.data;
        if (cryptos["Response"] === "Error") {
          cryptos = { ETH: { EUR: "ERROR" } };
          this.setState({ cryptos: cryptos });
        }
        this.setState({ cryptos: cryptos });
      })
      .catch((error) => {
        console.log(error);
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
          <Container className="main-content">
            <Row>
              <Col xs={13}>
                <div className="content">
                  <h1>Collecting digital rare art and discover Slimy NFTs</h1>
                  <p>
                    Mint your exclusive <span>Slimy NFT</span> from a collection
                    of <span>9.999</span> NFTs in the Ethereum Network using
                    your <span>Ethereum</span>
                    <img
                      src={images.eth}
                      width={25}
                      height={25}
                      className="me-2 ms-1"
                      alt="eth"
                    />
                  </p>
                  <a href="#collection">
                    <Button variant="light">
                      Discover <ImArrowUpRight2 />
                    </Button>
                  </a>
                </div>
                <Counter />
                {/* INSIDE HERE WE NEED THE COUNT THAT HAS IN THE FIGMA JUST GO TO FIGMA AND SEE WHAT I'M TALKING */}
              </Col>
              <Col>
                <div className="d-flex justify-content-center">
                  <Card style={{ width: "21rem" }}>
                    <img
                      src={images.coll_5}
                      className="card-img-top"
                      alt=""
                      width={336}
                      height={336}
                    />
                    <Card.Body>
                      <Card.Title className="text-center">
                        Slimy Gang
                      </Card.Title>
                      <Card.Text>
                        <p className="card-text-mint-price-txt">Mint Price</p>

                        {Object.keys(this.state.cryptos).map((key) => (
                          <p className="card-text-mint-price">
                            0.06
                            <img
                              src={images.eth}
                              width={25}
                              height={25}
                              className="me-2 ms-1"
                              alt="eth"
                            />
                            <span>
                              {parseFloat(
                                this.state.cryptos[key].EUR * 0.06
                              ).toPrecision(5)}
                              €
                            </span>
                          </p>
                        ))}
                      </Card.Text>
                      <div className="text-center center-block d-block">
                        <a href="/mint">
                          <Button className="btn-mint">Mint</Button>
                        </a>
                        <a href="#collection">
                          <Button
                            variant="outline-primary"
                            className="btn-viewcoll"
                          >
                            View Examples
                          </Button>
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      );
    }

    return (
      <>
        <Container className="main-content">
          <Row>
            <Col xs={7}>
              <div className="content">
                <h1>Collecting digital rare art and discover Slimy NFTs</h1>
                <p>
                  Mint your exclusive <span>Slimy NFT</span> from a collection
                  of <span>9.999</span> NFTs in the Ethereum Network using your
                  <span> Ethereum</span>
                  <img
                    src={images.eth}
                    width={25}
                    height={25}
                    className="me-2 ms-1"
                    alt="eth"
                  />
                </p>
                <a href="#collection">
                  <Button variant="light">
                    Discover <ImArrowUpRight2 />
                  </Button>
                </a>
                <Counter />
              </div>
              {/* INSIDE HERE WE NEED THE COUNT THAT HAS IN THE FIGMA JUST GO TO FIGMA AND SEE WHAT I'M TALKING */}
            </Col>
            <Col>
              <div>
                <Card style={{ width: "21rem" }}>
                  <img
                    src={images.coll_5}
                    className="card-img-top"
                    alt=""
                    width={336}
                    height={336}
                  />
                  <Card.Body>
                    <Card.Title className="text-center"> Slimy Gang</Card.Title>
                    <Card.Text>
                      <p className="card-text-mint-price-txt">Mint Price</p>

                      {Object.keys(this.state.cryptos).map((key) => (
                        <p className="card-text-mint-price">
                          0.06
                          <img
                            src={images.eth}
                            width={25}
                            height={25}
                            className="me-2 ms-1"
                            alt="eth"
                          />
                          <span>
                            {parseFloat(
                              this.state.cryptos[key].EUR * 0.06
                            ).toPrecision(5)}
                            €
                          </span>
                        </p>
                      ))}
                    </Card.Text>
                    <div className="text-center center-block">
                      <a href="/mint">
                        <Button className="btn-mint">Mint</Button>
                      </a>
                      <a href="#collection">
                        <Button
                          variant="outline-primary"
                          className="btn-viewcoll"
                        >
                          View Examples
                        </Button>
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Main;

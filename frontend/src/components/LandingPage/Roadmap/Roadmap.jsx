import React, { Component } from "react";

import "./Roadmap.css";

//https://www.bootdey.com/snippets/view/dark-timeline#html

class Roadmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentDidMount() {}

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
          <h1 className="text-center mt-2 mb-0" id="roadmap">
            Roadmap
          </h1>
          <div className="container">
            <hr className="mt-2 mb-3" size="4" />
          </div>
          <div className="container" id="#roadmap">
            <div className="timeline">
              <div className="timeline-row">
                <div className="timeline-time">
                  Q1<small>2022/01</small>
                </div>
                <div className="timeline-content">
                  <h4>0% Sold</h4>
                  <p>
                    Pre-mint of 75 random Slimy Gang NFTs for the team and
                    promoting purposes, such as giveaways to grow our community.
                  </p>
                  <div className="">
                    <span className="badge badge-pill">Tag 01</span>{" "}
                    <span className="badge badge-pill">Tag 02</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">
                  Q2<small>2022/02</small>
                </div>
                <div className="timeline-content">
                  <h4>Title 02</h4>
                  <p>
                    Cupidatat Lorem quis excepteur non esse enim ut adipisicing
                    cupidatat.
                  </p>
                  <div className="">
                    <span className="badge badge-pill">Tag 03</span>{" "}
                    <span className="badge badge-pill">Tag 04</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">
                  Q3<small>2022/03</small>
                </div>
                <div className="timeline-content">
                  <h4>Title 03</h4>
                  <p>
                    Et mollit dolor tempor elit nulla voluptate quis in enim
                    minim dolore esse amet velit.
                  </p>
                  <div>
                    <span className="badge badge-pill">Tag 05</span>{" "}
                    <span className="badge badge-pill">Tag 06</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-time">
                  Q4<small>2022/04</small>
                </div>
                <div className="timeline-content">
                  <h4>Title 04</h4>
                  <p>In ipsum ex adipisicing velit laboris ad.</p>
                  <div>
                    <span className="badge badge-pill">Tag 07</span>{" "}
                    <span className="badge badge-pill">Tag 08</span>
                  </div>
                </div>
              </div>
              <div className="timeline-row">
                <div className="timeline-content">
                  <p className="m-0">Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="text-center mt-2 mb-1" id="roadmap">
          Roadmap
        </h1>
        <div className="container">
          <hr className="mt-2 mb-5" size="4" />
        </div>
        <div className="container">
          <div className="timeline">
            <div className="timeline-row">
              <div className="timeline-time"></div>
              <div className="timeline-content">
                <h4>0% Sold</h4>
                <p>
                  Pre-mint of 75 random Slimy Gang NFTs for the team and
                  promoting purposes, such as giveaways to grow our community.
                </p>
                <div className="">
                  <span className="badge badge-pill">Pre-mint</span>{" "}
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-time"></div>
              <div className="timeline-content">
                <h4>10% Sold</h4>
                <p>5 Giveaways of 1 Ether to random Slimy Gang holders..</p>
                <div className="">
                  <span className="badge badge-pill">Giveaway</span>{" "}
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-time"></div>
              <div className="timeline-content">
                <h4>25% Sold</h4>
                <p>
                  Play 2 Earn NFT game - Endless runner browser-based game..
                </p>
                <div>
                  <span className="badge badge-pill">Play 2 Earn Game</span>{" "}
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-time"></div>
              <div className="timeline-content">
                <h4>50% Sold</h4>
                <p>
                  Launch of merch store. Creation of a community fund where 75%
                  of merch profits will be placed.
                </p>
                <div>
                  <span className="badge badge-pill">Merch</span>{" "}
                  <span className="badge badge-pill">Community Fund</span>
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-time"></div>
              <div className="timeline-content">
                <h4>75% Sold</h4>
                <p>
                  Launch of collection Little Slimy (LSM). Free for Slimy Gang
                  holders. In-game companion.
                </p>
                <div>
                  <span className="badge badge-pill">New Collection</span>{" "}
                  <span className="badge badge-pill">In-game Companion</span>
                </div>
              </div>
            </div>
            <div className="timeline-row">
              <div className="timeline-time"></div>
              <div className="timeline-content">
                <h4>100% Sold</h4>
                <p>
                  Donation of 100 000€ to an institution chosen by the
                  community.
                </p>
                <div>
                  <span className="badge badge-pill">Donation</span>{" "}
                  <span className="badge badge-pill">Solidary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Roadmap;

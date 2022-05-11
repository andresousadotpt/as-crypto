import React, { Component } from "react";
import { Accordion } from "react-bootstrap";

import "./FAQ.css";

class FAQ extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
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
          <h1 className="text-center mt-2 mb-3" id="faq">
            FAQs
          </h1>
          <div className="container">
            <hr className="mt-2 mb-5" size="4" />
            <div className="row">
              <div className="d-none d-sm-flex col-1"></div>
              <div className="col">
                <Accordion className="ms-5 me-5">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Quantity and Price?</Accordion.Header>
                    <Accordion.Body>
                      The collection consists of 9999 Goats priced at .06 Ether.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      How were the Slimes Created?
                    </Accordion.Header>
                    <Accordion.Body>
                      Each of our slimes was randomly created using computer
                      software that combined 120 handcrafted traits to create
                      unique goats.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      Where can I get a Slimy Gang NFT?
                    </Accordion.Header>
                    <Accordion.Body>
                      You can mint Slimy Gang NFTs through the official website
                      (https://as-crypto.netlify.app/) or directly through the
                      smart contract. Upon minting NFTs, these are automatically
                      sent to your wallet and shown in your Testnet OpenSea
                      account.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                    <Accordion.Header>
                      Is there a limit of NFTs per transaction?
                    </Accordion.Header>
                    <Accordion.Body>
                      Yes, the maximum amount of NFTs per transaction is 1!
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                    <Accordion.Header>Is the minting random?</Accordion.Header>
                    <Accordion.Body>
                      Yes, all NFTs are minted at random from the smart
                      contract.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                    <Accordion.Header>
                      Where can I get more information?
                    </Accordion.Header>
                    <Accordion.Body>
                      If you have any doubts regarding our NFT collection, feel
                      free to contact us through our email
                      contact@andresousa.pt.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="d-none d-sm-flex col-1"></div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="text-center mt-4 mb-3" id="faq">
          FAQs
        </h1>
        <div className="container">
          <hr className="mt-2 mb-5" size="4" />
          <div className="row">
            <div className="col-0"></div>
            <div className="col">
              <Accordion className="ms-5 me-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Quantity and Price?</Accordion.Header>
                  <Accordion.Body>
                    The collection consists of 9999 Slimes priced at 0.06
                    Ethereum.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    How were the Slimes Created?
                  </Accordion.Header>
                  <Accordion.Body>
                    Each of our slimes was randomly created using computer
                    software that combined 120 handcrafted traits to create
                    unique goats.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    Where can I get a Slimy Gang NFT?
                  </Accordion.Header>
                  <Accordion.Body>
                    You can mint Slimy Gang NFTs through the official website
                    (https://as-crypto.netlify.app/) or directly through the
                    smart contract. Upon minting NFTs, these are automatically
                    sent to your wallet and shown in your Testnet OpenSea
                    account.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    Is there a limit of NFTs per transaction?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, the maximum amount of NFTs per transaction is 1!
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Is the minting random?</Accordion.Header>
                  <Accordion.Body>
                    Yes, all NFTs are minted at random from the smart contract.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>
                    Where can I get more information?
                  </Accordion.Header>
                  <Accordion.Body>
                    If you have any doubts regarding our NFT collection, feel
                    free to contact us through our email contact@andresousa.pt.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="col-0"></div>
          </div>
        </div>
      </>
    );
  }
}

export default FAQ;

import React, { useState } from "react";
import Forms from "../AuthSystem/Login";
import Account from "../Account/Account";
// import { toast } from "react-toastify";

import { Navbar, Nav, Button, Offcanvas, Container } from "react-bootstrap";

import images from "../../resources/images";
import "./Navbar.css";

const Navigation = () => {
  let isLoggedIn = false;

  if (localStorage.getItem("access_token") != null) {
    isLoggedIn = true;
  }

  const pages = [
    { page: "Mint", link: "/mint" },
    { page: "Collection", link: "/#collection" },
    { page: "Roadmap", link: "/#roadmap" },
    { page: "Staff", link: "/#staff" },
    { page: "FAQ", link: "/#faq" },
    // { page: "Posts", link: "/posts" },
    {
      page: "OpenSea",
      link: "https://testnets.opensea.io/collection/slimygang",
    },
  ];

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [account, setAccount] = useState(false);

  const handleCloseAcc = () => setAccount(false);
  const handleShowAcc = () => setAccount(true);

  return (
    <>
      <Navbar className="mt-4" collapseOnSelect expand="xl">
        <Container fluid="sm">
          <Navbar.Brand className="ps-3 pe-4 float-right" href=".">
            <img src={images.logo_dark} alt="" width={40} height={77} />
          </Navbar.Brand>
          <Navbar.Toggle
            className="bg-light"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto fw-bold fs-5 ml-auto float-mg-end text-end">
              {pages.map((pages) => (
                <Nav.Link key="" className="text-light pe-4" href={pages.link}>
                  {pages.page}
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="float-end text-end">
              {/* TODO:  Need to make this when the person login */}
              {/* <Nav.Link href="#">Connect Wallet</Nav.Link> */}
              {isLoggedIn ? (
                <>
                  <input
                    type="image"
                    src={
                      localStorage.getItem("profile_pic") === "null"
                        ? images.default_profile
                        : localStorage.getItem("profile_pic")
                    }
                    name="saveForm"
                    width={100}
                    height={100}
                    onClick={handleShowAcc}
                    alt=""
                  />
                </>
              ) : (
                // </div>
                <Button variant="light" onClick={handleShow}>
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="text-center"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <img
            src={images.slime100x100}
            className="rounded"
            alt=""
            width={100}
            height={100}
          />
          <Forms></Forms>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={account}
        onHide={handleCloseAcc}
        placement="end"
        className="text-center"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ color: "black" }}>
          <Account />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;

// import axios from "axios";
import React, { useEffect, useState } from "react";
// import axios from "axios";
import { toast } from "react-toastify";

import { Button } from "react-bootstrap";
import images from "../../resources/images";
import "./Account.css";

const Account = () => {
  const [width, setWidth] = useState(window.innerWidth);

  let notify = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: false,
          pauseOnFocusLoss: false,
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: false,
          pauseOnFocusLoss: false,
        });
        break;

      default:
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: false,
          pauseOnFocusLoss: false,
        });
        break;
    }
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  const logout = () => {
    notify("success", "Logged you out successfully!");
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile_pic");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    /*
      DEPOIS TENS DE FAZER AQUI ALGUMA COISA PARA DESCONECTAR A METAMASK
      */
    setInterval(() => {
      document.location.href = "/";
    }, 1500);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 1000;

  if (isMobile) {
    return (
      <>
        <div className="account">
          <img
            src={
              localStorage.getItem("profile_pic") === "null"
                ? images.default_profile
                : localStorage.getItem("profile_pic")
            }
            alt=""
            // onError={this.onerror=null; this.src=} TAKE A LOOK AT THIS
          />
          <h4 className="mt-3">
            Welcome,{" "}
            <span className="name">{localStorage.getItem("name")}</span>
          </h4>

          <a href="/profile">
            <p>Change profile</p>
          </a>
          <p>My Collection [ NOT WORKING ]</p>
          <div>
            <Button variant="light" className="mt-5" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="account">
      <img
        src={
          localStorage.getItem("profile_pic") == "null"
            ? images.default_profile
            : localStorage.getItem("profile_pic")
        }
        alt=""
      />
      <h4 className="mt-3">
        Welcome, <span className="name">{localStorage.getItem("name")}</span>
      </h4>

      <a href="/profile" className="mb-0">
        <p className="mb-1" style={{color: "#519259"}}>Change profile</p>
      </a>
      <a href="/mycollection" className="mt-0">
        <p className="mb-0" style={{color: "#519259"}}>My Collection</p>
      </a>
      <div>
        <Button variant="light" className="mt-3" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Account;

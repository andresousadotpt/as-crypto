// import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import images from "../../resources/images";
import "./Profile.css";
import Footer from "../Footer/Footer";
import Navigation from "../Navbar/Navbar";

import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";

const Profile = () => {
  const URL = "https://andresousa.pt";
  const [selectedFile, setSelectedFile] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let notify = (type, message, id) => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          toastId: id,
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          toastId: id,
        });
        break;
      case "info":
        toast.info(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          toastId: id,
        });
        break;

      default:
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          toastId: id,
        });
        break;
    }
  };

  const formSchemaPw = Yup.object().shape({
    currentPassword: Yup.string()
      .required("Current Password required")
      .min(10, "Current Password length should be at least 10 characters")
      .max(30, "Current Password length has reached its max characters"),
    newPassword: Yup.string()
      .required("New Password required")
      .min(10, "New Password length should be at least 10 characters")
      .max(30, "New Password length has reached its max characters"),
    newPasswordConfirm: Yup.string()
      .required("Confirm New Password required")
      .oneOf(
        [Yup.ref("newPassword")],
        "Confirm New Password should be the same as New Password"
      ),
  });

  const formSchemaEmail = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .min(15, "Email length should be at least 15 characters")
      .max(100, "Email length has reached its max characters"),
  });

  const formSchemaName = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(5, "Name length should be at least 5 characters")
      .max(50, "Name length has reached its max characters"),
  });

  const formSchemaFile = Yup.object().shape({
    file: Yup.mixed().required("File is required"),
  });

  const validationOptPw = { resolver: yupResolver(formSchemaPw) };
  const validationOptEmail = { resolver: yupResolver(formSchemaEmail) };
  const validationOptName = { resolver: yupResolver(formSchemaName) };
  const validationOptFile = { resolver: yupResolver(formSchemaFile) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(validationOptPw);

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm(validationOptEmail);

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    formState: { errors: errors3 },
  } = useForm(validationOptName);

  const {
    register: register4,
    handleSubmit: handleSubmit4,
    formState: { errors: errors4 },
  } = useForm(validationOptFile);

  useEffect(() => {
    document.getElementById("passwordInput").style.display = "none";
    document.getElementById("passwordHide").style.display = "block";
    document.getElementById("emailInput").style.display = "none";
    document.getElementById("emailHide").style.display = "block";
    document.getElementById("nameInput").style.display = "none";
    document.getElementById("nameHide").style.display = "block";
    document.getElementById("submit-file").style.display = "none";
  }, []);

  function changePwAction(e) {
    e.target.style.display = "none";
    let passwordInput = document.getElementById("passwordInput");
    passwordInput.style.display = "block";
    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("newPasswordConfirm").value = "";
  }
  function unChangePwAction(e) {
    let passwordInput = document.getElementById("passwordInput");
    passwordInput.style.display = "none";
    let passwordHide = document.getElementById("passwordHide");
    passwordHide.style.display = "block";
  }

  function changeEmailAction(e) {
    e.target.style.display = "none";
    let emailInput = document.getElementById("emailInput");
    emailInput.style.display = "block";
    document.getElementById("email").value = localStorage.getItem("email");
  }
  function unChangeEmailAction(e) {
    let emailHide = document.getElementById("emailHide");
    emailHide.style.display = "block";
    let emailInput = document.getElementById("emailInput");
    emailInput.style.display = "none";
  }

  function changeNameAction(e) {
    e.target.style.display = "none";
    let nameInput = document.getElementById("nameInput");
    nameInput.style.display = "block";
    document.getElementById("name").value = localStorage.getItem("name");
  }
  function unChangeNameAction(e) {
    let nameHide = document.getElementById("nameHide");
    nameHide.style.display = "block";
    let nameInput = document.getElementById("nameInput");
    nameInput.style.display = "none";
  }

  function changeImageAction(e) {
    document.getElementById("submit-file").style.display = "block";
  }

  const onSubmitPw = (data) => {
    changepassword(data);
  };
  const onSubmitEmail = (data) => {
    changeEmail(data);
  };
  const onSubmitName = (data) => {
    changeName(data);
  };
  const onSubmitFile = (data) => {
    changeProfilePic(data);
  };

  function changepassword(data) {
    let dataA = {
      password: data.currentPassword,
      newPassword: data.newPassword,
    };

    axios
      .post(`https://andresousa.pt/api/v1/user/changemypassword`, dataA, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        notify("success", res.data["message"], "bb");
        setInterval(() => {
          document.location.href = "/";
        }, 1000);
        localStorage.clear();
      })
      .catch((error) => {
        if (!error.response) {
          notify("error", `❌ Couldn't get a connection with the API!`, "cc");
          notify(
            "error",
            "❌ If the error persists contact support@andresousa.pt",
            "ee"
          );
          return;
        }
        if (error.response.status === 400 || error.response.status === 401) {
          if (error.response.data["message"] == "Password doesn't match") {
            notify(
              "error",
              `❌ Current ${error.response.data["message"]}`,
              "dd"
            );
            return;
          } else {
            notify("error", `❌ ${error.response.data["message"]}`, "gg");
            return;
          }
        }
      });
  }

  function changeEmail(data) {
    let dataA = {
      email: data.email,
    };

    axios
      .post(`https://andresousa.pt/api/v1/user/changemyemail`, dataA, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        notify("success", res.data["message"], "bb");
        setInterval(() => {
          document.location.href = "/profile";
        }, 500);
        localStorage.setItem("email", data.email);
      })
      .catch((error) => {
        if (!error.response) {
          notify("error", `❌ Couldn't get a connection with the API!`, "ac");
          notify(
            "error",
            "❌ If the error persists contact support@andresousa.pt",
            "ae"
          );
          return;
        }
        if (error.response.status === 400 || error.response.status === 401) {
          notify("error", `❌ ${error.response.data["message"]}`, "ag");
          return;
        }
      });
  }

  function changeName(data) {
    let dataA = {
      name: data.name,
    };

    axios
      .post(`https://andresousa.pt/api/v1/user/changemyname`, dataA, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        notify("success", res.data["message"], "bb");
        setInterval(() => {
          document.location.href = "/profile";
        }, 500);
        localStorage.setItem("name", data.name);
      })
      .catch((error) => {
        console.log(error);
        if (!error.response) {
          notify("error", `❌ Couldn't get a connection with the API!`, "ac");
          notify(
            "error",
            "❌ If the error persists contact support@andresousa.pt",
            "ae"
          );
          return;
        }
        if (error.response.status === 400 || error.response.status === 401) {
          notify("error", `❌ ${error.response.data["message"]}`, "ag");
          return;
        }
      });
  }

  function changeProfilePic(data) {
    document.getElementById("submit-file").style.display = "none";
    const formData = new FormData();
    formData.append("profile_pic", data.file[0]);

    axios
      .post(`https://andresousa.pt/api/v1/user/changemyprofilepic`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        notify("success", res.data["message"], "bb");
        setInterval(() => {
          document.location.href = "/profile";
        }, 500);
        localStorage.setItem("profile_pic", URL + "/" + res.data.path);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 401) {
          notify("error", `❌ ${error.response.data["message"]}`, "ag");
          return;
        }

        if (!error.response) {
          notify("error", `❌ Couldn't get a connection with the API!`, "ac");
          notify(
            "error",
            "❌ If the error persists contact support@andresousa.pt",
            "ae"
          );
          return;
        }
      });
  }

  return (
    <>
      <Navigation />
      <hr className="h-divider" size="4" />
      <div className="mt-5 mb-5">
        <div className="container-xl carta pb-5 pt-5">
          <div className="row">
            <div className="col-md-3 text-center">
              <div className="esquerda h-100 d-flex justify-content-center align-items-center">
                <div className="d-block text-center">
                  <div className="image mb-4">
                    <form
                      encType="multipart/form-data"
                      className="d-flex justify-content-center align-items-center"
                      onSubmit={handleSubmit4(onSubmitFile)}
                    >
                      <label htmlFor="image">
                        <input
                          type="file"
                          name="image"
                          id="image"
                          multiple={false}
                          style={{ display: "none" }}
                          onClick={changeImageAction}
                          {...register4("file")}
                        />
                        {notify("error", errors4?.name?.message, "file")}
                        <img
                          style={{ cursor: "pointer" }}
                          src={
                            localStorage.getItem("profile_pic") === "null"
                              ? images.default_profile
                              : localStorage.getItem("profile_pic")
                          }
                          className="rounded-circle"
                          width={100}
                          height={100}
                        />
                        <i
                          className="ms-1 fa-solid fa-pencil"
                          style={{ cursor: "pointer" }}
                        ></i>
                        <div className="d-flex justify-content-center align-items-center mt-3">
                          <button
                            type="submit"
                            id="submit-file"
                            className="btn oo mt-2"
                          >
                            Submit <i className="fa-solid fa-circle-check"></i>
                          </button>
                        </div>
                      </label>
                    </form>
                  </div>
                  <div className="content mb-0 ml-lg-0">
                    <u>
                      <h3
                        style={{ cursor: "pointer" }}
                        id="nameHide"
                        className=""
                        onClick={changeNameAction}
                      >
                        {localStorage.getItem("name")}
                        <i
                          className="ms-2 fa-solid fa-pencil"
                          style={{ fontSize: "1.3rem" }}
                        ></i>
                      </h3>
                    </u>
                    <div className="aa" id="nameInput">
                      <form
                        onSubmit={handleSubmit3(onSubmitName)}
                        key="form-name"
                      >
                        <input
                          type="text"
                          id="name"
                          placeholder="Your name"
                          maxLength="50"
                          minLength="5"
                          {...register3("name")}
                        />
                        {notify("error", errors3?.name?.message, "name")}
                        <br />
                        <button type="submit" className="btn oo mt-2">
                          <i className="fa-solid fa-circle-check"></i>
                        </button>
                        <button
                          type="button"
                          onClick={unChangeNameAction}
                          className="btn oo mt-2 ms-2"
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                      </form>
                    </div>
                    <button className="btn oo mt-3" onClick={handleShow}>
                      <i className="bi bi-question-square-fill" /> How this
                      works
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md">
              <div className="container mt-4 titulo">
                <h3>Information</h3>
                <hr />
                <div className="row">
                  <div className="col-sm">
                    <h3>Email</h3>
                    <u>
                      <p
                        style={{ cursor: "pointer" }}
                        id="emailHide"
                        onClick={changeEmailAction}
                      >
                        {localStorage.getItem("email")}
                        <i className="ms-1 fa-solid fa-pencil"></i>
                      </p>
                    </u>
                    <div className="aa" id="emailInput">
                      {/* onSubmit={handleSubmit(onSubmit)} */}
                      <form
                        onSubmit={handleSubmit2(onSubmitEmail)}
                        key="form-email"
                      >
                        <input
                          type="email"
                          id="email"
                          placeholder="Your email"
                          maxLength="100"
                          minLength="1"
                          {...register2("email")}
                        />
                        {notify("error", errors2?.email?.message, "email")}
                        <br />
                        <button type="submit" className="btn oo mt-2">
                          <i className="fa-solid fa-circle-check"></i>
                        </button>
                        <button
                          type="button"
                          onClick={unChangeEmailAction}
                          className="btn oo mt-2 ms-2"
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="col-sm">
                    <h3>Password</h3>
                    <u>
                      <p
                        style={{ cursor: "pointer" }}
                        className="passwordHide"
                        id="passwordHide"
                        onClick={changePwAction}
                      >
                        Click Here <i className="ms-1 fa-solid fa-pencil"></i>
                      </p>
                    </u>
                    <div className="aa" id="passwordInput">
                      <form
                        onSubmit={handleSubmit(onSubmitPw)}
                        key="form-password"
                      >
                        <input
                          type="password"
                          id="currentPassword"
                          placeholder="Current Password"
                          minLength="10"
                          maxLength="30"
                          {...register("currentPassword")}
                        />
                        {notify(
                          "error",
                          errors?.currentPassword?.message,
                          "currentpw"
                        )}
                        <input
                          type="password"
                          id="newPassword"
                          placeholder="New Password"
                          minLength="10"
                          maxLength="30"
                          {...register("newPassword")}
                        />
                        {notify("error", errors?.newPassword?.message, "newpw")}
                        <input
                          type="password"
                          id="newPasswordConfirm"
                          placeholder="Confirm New Password"
                          minLength="10"
                          maxLength="30"
                          {...register("newPasswordConfirm")}
                        />
                        {notify(
                          "error",
                          errors?.newPasswordConfirm?.message,
                          "newpwconfirm"
                        )}
                        <br />
                        <button type="submit" className="btn oo mt-2">
                          <i className="fa-solid fa-circle-check"></i>
                        </button>
                        <button
                          type="button"
                          onClick={unChangePwAction}
                          className="btn oo mt-2 ms-2"
                        >
                          <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-divider" size="4" />
      <Footer />
      <Modal show={show} onHide={handleClose} className="text-black" centered>
        <Modal.Header closeButton>
          <Modal.Title>How to edit your profile ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Simply click on everything....
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={handleClose} className="btn">
            <i
              className="fa-solid fa-circle-check"
              style={{ color: "green" }}
            ></i>
          </button>
        </Modal.Footer>
      </Modal>
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
    </>
  );
};

export default Profile;

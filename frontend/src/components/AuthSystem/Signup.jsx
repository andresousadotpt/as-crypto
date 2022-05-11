import React, { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navbar, Footer } from "../";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import $ from "jquery";

import "./Signup.css";
import images from "../../resources/images";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const URL = "https://andresousa.pt";

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

  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password required")
      .min(10, "Password length should be at least 10 characters")
      .max(30, "Password length has reached its max characters"),
    passwordConfirm: Yup.string()
      .required("Confirm Password required")
      .oneOf(
        [Yup.ref("password")],
        "Confirm Password must be the same as the password"
      ),
    name: Yup.string()
      .required("Name is required")
      .min(5, "Name length should be at least 5 characters")
      .max(50, "Name length has reached its max characters"),
    email: Yup.string()
      .required("Email is required")
      .min(15, "Email length should be at least 15 characters")
      .max(100, "Email length has reached its max characters"),
    dob: Yup.string().required("Date of Birth is required"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, watch, reset, formState } =
    useForm(validationOpt);
  const { errors } = formState;
  let dataF = {};

  const onSubmit = (data) => {
    signup(data);
  };

  const info = () => {
    const name = document.getElementById("exampleInputName1");
    const email = document.getElementById("exampleInputEmail1");
    const password = document.getElementById("exampleInputPassword1");
    const cPassword = document.getElementById("exampleInputConfirmpassword1");
    const bday = document.getElementById("bday");

    name.value = "example";
    email.value = "email@example.com";
    password.value = "1234567890";
    cPassword.value = "1234567890";
    bday.value = "2002-02-02";
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  $(function () {
    $("input[data-relmax]").each(function () {
      var oldVal = $(this).prop("value");
      var relmax = $(this).data("relmax");
      var max = new Date();
      max.setFullYear(max.getFullYear() + relmax);
      $.prop(this, "max", $(this).prop("valueAsDate", max).val());
      $.prop(this, "value", oldVal);
    });
  });

  const isMobile = width <= 1000;

  async function signup(data) {
    await axios
      .post(
        URL +
          "/api/v1/user/create?name=" +
          data.name +
          "&email=" +
          data.email +
          "&password=" +
          data.password +
          "&date_of_birth=" +
          data.dob
      )
      .then((res) => {
        if (localStorage.getItem("access_token")) {
          notify("error", "You already signed in!", "1");
          setTimeout(() => {
            document.location.href = "/";
          }, 2000);
          return;
        }

        notify("success", "Welcome to Slimy Gang!", "2");
        setInterval(() => {
          document.location.href = "/";
        }, 1500);
      })
      .catch((error) => {
        if (!error.response) {
          notify("error", `❌ Couldn't get a connection with the API!`, "3");
          notify(
            "error",
            "❌ If the error persists contact support@andresousa.pt",
            "4"
          );
          return;
        }
        if (error.response.status === 400 || error.response.status === 401) {
          notify("error", `❌ ${error.response.data["message"]}`, "5");
          return;
        }
      });
  }
  if (isMobile) {
    return (
      <>
        <Navbar />
        <hr className="h-divider mt-3" size="4" />
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-lg text-center d-flex justify-content-center">
              <img
                src={images.coll_1}
                alt="singupimg"
                className="signupimg"
                width={300}
              />
            </div>
            <div className="col-lg">
              <h1 className="text-center">Register</h1>
              <form className="formss" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-lg">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Your name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        aria-describedby="nameHelp"
                        placeholder="Enter name"
                        maxLength="50"
                        minLength="5"
                        {...register("name")}
                      />
                      {notify("error", errors.name?.message, "6")}
                      <small id="nameHelp" className="form-text text-muted">
                        Needs to be at max 50 characters long.
                      </small>
                    </div>
                  </div>
                  <div className="col-lg">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        maxLength="100"
                        minLength="1"
                        {...register("email")}
                      />
                      {notify("error", errors.email?.message, "7")}
                      <small id="emailHelp" className="form-text text-muted">
                        Needs to be at max 100 characters long.
                      </small>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        minLength="10"
                        maxLength="30"
                        {...register("password")}
                      />
                      {notify("error", errors.password?.message, "8")}
                      <small id="passwordHelp" className="form-text text-muted">
                        Needs to be between 10-30 characters long.
                      </small>
                    </div>
                  </div>
                  <div className="col-lg">
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputConfirmpassword1"
                        placeholder="Confirm Password"
                        minLength="10"
                        maxLength="30"
                        {...register("passwordConfirm")}
                      />
                      {notify("error", errors.passwordConfirm?.message, "9")}
                      <small
                        id="confirmPasswordHelp"
                        className="form-text text-muted"
                      >
                        Needs to be between 10-30 characters long.
                      </small>
                    </div>
                  </div>
                </div>
                <label htmlFor="exampleInputPassword1">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="bday"
                  placeholder="Date of Birth"
                  data-relmax="-18"
                  pattern="\d{4}-\d{2}-\d{2}"
                  {...register("dob")}
                />
                {notify("error", errors.dob?.message, "10")}
                <small id="dobHelp" className="form-text text-muted">
                  You need to be at least 18 years old.
                </small>
                <div className="text-center">
                  <button type="submit" className="register mt-3">
                    Submit
                  </button>
                  <button className="info mt-3" onClick={info}>
                    Insert Info
                  </button>
                </div>
              </form>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
        <hr className="h-divider mt-5" size="4" />
        <Footer />
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
  }

  return (
    <>
      <Navbar />
      <hr className="h-divider mt-3" size="4" />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col text-center d-flex justify-content-center">
            <img
              src={images.coll_1}
              alt="singupimg"
              className="signupimg"
              width={380}
            />
          </div>
          <div className="col">
            <h1 className="text-center">Register</h1>
            <form className="formss" onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Your name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      aria-describedby="nameHelp"
                      placeholder="Enter name"
                      maxLength="50"
                      minLength="5"
                      {...register("name")}
                    />
                    {notify("error", errors.name?.message, "11")}
                    <small id="nameHelp" className="form-text text-muted">
                      Needs to be at max 50 characters long.
                    </small>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      maxLength="100"
                      minLength="1"
                      {...register("email")}
                    />
                    {notify("error", errors.email?.message, "12")}
                    <small id="emailHelp" className="form-text text-muted">
                      Needs to be at max 100 characters long.
                    </small>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      minLength="10"
                      maxLength="30"
                      {...register("password")}
                    />
                    {notify("error", errors.password?.message, "13")}
                    <small id="passwordHelp" className="form-text text-muted">
                      Needs to be between 10-30 characters long.
                    </small>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputConfirmpassword1"
                      placeholder="Confirm Password"
                      minLength="10"
                      maxLength="30"
                      {...register("passwordConfirm")}
                    />
                    {notify("error", errors.passwordConfirm?.message, "14")}
                    <small
                      id="confirmPasswordHelp"
                      className="form-text text-muted"
                    >
                      Needs to be between 10-30 characters long.
                    </small>
                  </div>
                </div>
              </div>
              <label htmlFor="exampleInputPassword1">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                id="bday"
                placeholder="Date of Birth"
                data-relmax="-18"
                {...register("dob")}
              />
              {notify("error", errors.dob?.message, "15")}
              <small id="dobHelp" className="form-text text-muted">
                You need to be at least 18 years old.
              </small>
              <div className="text-center">
                <button type="submit" className="register mt-3">
                  Submit
                </button>
                <button className="info mt-3" onClick={info}>
                  Insert Info
                </button>
              </div>
            </form>
          </div>
          <div className="col-1"></div>
        </div>
      </div>
      <hr className="h-divider mt-5" size="4" />
      <Footer />
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

export default Signup;

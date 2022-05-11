import React from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import $ from "jquery";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";

import "./Login.css";

const Login = () => {
  const URL = "https://andresousa.pt";
  let toastId = "login";
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
    email: Yup.string()
      .required("Email is required")
      .min(1, "Email length should be at least 15 characters")
      .max(100, "Email length has reached its max characters"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, watch, reset, formState } =
    useForm(validationOpt);
  const { errors } = formState;
  let dataF = {};

  const onSubmit = (data) => {
    login(data);
  };

  const info = () => {
    const email = document.getElementById("formBasicEmail");
    const password = document.getElementById("formBasicPassword");
    email.value = "email@example.com";
    password.value = "1234567890";
  };

  function login(data) {
    axios
      .post(
        URL +
          "/api/v1/user/login?email=" +
          data.email +
          "&password=" +
          data.password
      )
      .then((res) => {
        if (localStorage.getItem("access_token")) {
          notify("error", "You already signed in!", "a");
          setTimeout(() => {
            document.location.href = "/";
          }, 2000);
          return;
        }

        localStorage.setItem("access_token", res.data["access_token"]);
        localStorage.setItem("name", res.data["name"]);
        localStorage.setItem("email", res.data["email"]);
        localStorage.setItem(
          "profile_pic",
          URL + "/" + res.data["profile_pic"]
        );
        if (res.data["profile_pic"] == null) {
          localStorage.setItem("profile_pic", "null");
        }
        notify("success", "Welcome to Slimy Gang!", "b");
        setInterval(() => {
          document.location.href = "/";
        }, 1500);
      })
      .catch((error) => {
        if (!error.response) {
          notify("error", `❌ Couldn't get a connection with the API!`, "c");
          notify(
            "error",
            "❌ If the error persists contact support@andresousa.pt",
            "d"
          );
          return;
        }
        if (error.response.status === 400 || error.response.status === 401) {
          notify("error", `❌ ${error.response.data["message"]}`, "e");
          return;
        }
      });
  }

  return (
    <>
      <Form className="forms" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            maxLength="100"
            minLength="1"
            {...register("email")}
          />
          {notify("error", errors.email?.message, "f")}
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            minLength="10"
            maxLength="30"
            {...register("password")}
          />
          {notify("error", errors.password?.message, "g")}
          <Form.Text className="text-muted">
            We&apos;ll never share your password nor our staff will ask for your
            password.
          </Form.Text>
        </Form.Group>
        <Button type="submit" className="login">
          Submit
        </Button>
        <p className="text-muted mt-2">
          Don&apos;t have an account?{" "}
          <a href="/signup" style={{ color: "#519259" }}>
            Sign up here
          </a>
        </p>
        <Button className="info" onClick={info}>
          Insert Info
        </Button>
      </Form>
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

export default Login;

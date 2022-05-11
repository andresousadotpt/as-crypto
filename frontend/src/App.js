import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";
import {
  Signup,
  P404,
  Dashboard,
  Loading,
  Posts,
  Mint,
  Profile,
  MyCollection
} from "./components/";
import axios from "axios";
import { toast } from "react-toastify";

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

const App = () => {
  const [isAdmin, setAdmin] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://andresousa.pt/api/v1/user/isLogin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        if (res.data["status"] == 201) {
          setAuth(true);
          setAdmin(false);
          setLoading(false);

          if (res.data["role"] === "Administrator" || res.data["role"] === "Moderator" || res.data["role"] === "Social Media Engineer") {
            setAuth(true);
            setAdmin(true);
            setLoading(false);
          }
        } else {
          localStorage.clear();
          setAuth(false);
          setAdmin(false);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (isAdmin) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/*" element={<P404 />} />
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/posts" element={<Posts />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mycollection" element={<MyCollection />} />
        </Routes>
      </BrowserRouter>
    );
  }

  if (isAuth) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/*" element={<P404 />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mycollection" element={<MyCollection />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/*" element={<P404 />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

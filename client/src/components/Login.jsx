import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit() {
    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await api.post("/auth/login", data);
      if (res.data.message === "login successfull") {
        localStorage.setItem("token", res.data.token);
        nav("/home");
      } else {
        setError(res.data.message);
      }
    } catch (e) {}
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className=" w-[90%] sm:w-[50%] lg:w-[30%]  bg-white  rounded-2xl shadow-2xl">
        <div className="w-full h-full flex flex-col justify-between py-12">
          <h1 className="text-center text-3xl font-bold">Login</h1>
          <div className="h-full p-12 flex flex-col gap-4 ">
            <input
              type="text"
              name="email"
              onChange={handleInput}
              className="py-2 px-4 bg-gray-200 rounded-2xl"
              placeholder="Enter your email"
            />
            <input
              type="text"
              name="password"
              onChange={handleInput}
              className="py-2 px-4 bg-gray-200 rounded-2xl"
              placeholder="Enter your password"
            />

            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white bg-black mx-20 py-2 font-bold rounded-2xl"
            >
              Log In
            </button>
            <p className="h-4 text-center text-sm text-red-600">{error}</p>
          </div>
          <Link to={"/register"} className="text-blue-600 text-center">
            create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

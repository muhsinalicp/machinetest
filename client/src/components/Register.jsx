import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Register() {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit() {
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    try {
      if (formData.confirmpassword === formData.password) {
        const res = await api.post("/auth/register", data);

        if (res.data.message === "registered successfully") {
          nav("/");
        }
      } else {
        setError("password isn't same");
      }
    } catch (e) {
      console.log(
        "error happened in login component: ",
        e.response.data.message
      );

      if (e.response.data.message === "all fields are required") {
        setError(e.response.data.message);
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className=" w-[90%] sm:w-[50%] lg:w-[30%]  bg-white  rounded-2xl shadow-2xl">
        <div className="w-full h-full flex flex-col justify-between py-12">
          <h1 className="text-center text-3xl font-bold">Register</h1>
          <div className="h-full p-8 flex flex-col gap-4 ">
            <input
              type="text"
              onChange={handleInput}
              name="name"
              className="py-2 px-4 bg-gray-200 rounded-2xl"
              placeholder="Enter your name"
            />
            <input
              type="text"
              onChange={handleInput}
              name="email"
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
            <input
              type="text"
              name="confirmpassword"
              onChange={handleInput}
              className="py-2 px-4 bg-gray-200 rounded-2xl"
              placeholder="Enter your confirm password"
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="text-white bg-black mx-20 py-2 font-bold rounded-2xl"
            >
              Register
            </button>
            <p className="h-4 text-sm text-center text-red-600">
              {error && error}
            </p>
          </div>
          <Link to={"/"} className="text-blue-600 text-center">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

async function fetchData() {
  const res = await api.post("/auth/register");
  console.log(res);
}

export default Register;

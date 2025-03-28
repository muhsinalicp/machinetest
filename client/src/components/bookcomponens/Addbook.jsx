import React, { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function Addbook() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });

  const [lid, setlid] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setlid(token);
  }, []);

  const [error, setError] = useState();

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  async function handleSubmit() {
    const data = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
    };

    console.log(lid);

    try {
      if (lid) {
        const res = await api.post("/protect/addbook", data, {
          headers: {
            Authorization: "Bearer " + lid,
          },
        });

        console.log(res.data.message);

        if (res.data.message === "book created successfully") {
          nav("/home");
        } else {
          setError(res.data.message);
        }

        // if(res.data.)
      } else {
        setError("session expired, please sign in");
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className=" w-[90%] sm:w-[50%] lg:w-[30%]  bg-white  rounded-2xl shadow-2xl">
        <div className="w-full h-full flex flex-col justify-between py-12">
          <h1 className="text-center text-3xl font-bold">add a book</h1>
          <div className="h-full p-12 flex flex-col gap-4 ">
            <input
              type="text"
              name="title"
              onChange={handleInput}
              className="py-2 px-4 bg-gray-200 rounded-2xl"
              placeholder="Enter a title,"
            />
            <input
              type="text"
              name="author"
              onChange={handleInput}
              className="py-2 px-4 bg-gray-200 rounded-2xl"
              placeholder="Enter author name "
            />

            <input
              type="text"
              name="genre"
              onChange={handleInput}
              className="py-2 px-4 bg-gray-200 rounded-2xl"
              placeholder="Enter the book genre "
            />

            <button
              onClick={handleSubmit}
              type="submit"
              className="text-white bg-black mx-20 py-2 font-bold rounded-2xl"
            >
              Submit
            </button>
            <p className="h-4 text-center text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

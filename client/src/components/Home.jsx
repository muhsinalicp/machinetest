import React, { useEffect, useState } from "react";
import Navbar from "./homecomponents/Navbar";
import api from "../api";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/user/allbooks");
      setData(res.data.books);
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen">
      <Navbar />
      <div className="p-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {data.map(({ _id, title, author, genre }) => (
          <div
            key={_id}
            className="w-full rounded-2xl flex flex-col items-center p-3 bg-gray-100"
          >
            <h1>title:{title}</h1>
            <h1>title:{author}</h1>
            <h1>title:{genre}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

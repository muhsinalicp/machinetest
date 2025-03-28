import React, { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();
  const [lid, setlid] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setlid(token);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <nav className="flex px-8 py-2  bg-gray-100 justify-between items-center">
      <h1 className="font-bold ">welcome user</h1>

      {lid && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => nav("/addbook")}
            className="text-white bg-black md:px-4 p-2 rounded-xl"
          >
            add book
          </button>
          <button onClick={handleLogOut}>
            <LuLogOut size={34} />
          </button>
        </div>
      )}
    </nav>
  );
}

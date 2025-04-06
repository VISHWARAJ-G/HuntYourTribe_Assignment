import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const icon = [
    {
      name: "Home",
      logo: <i className="fa-solid fa-house"></i>,
      path: "/",
    },
    {
      name: "My Network",
      logo: <i className="fa-solid fa-user-group"></i>,
      path: "/",
    },
    {
      name: "Messages",
      logo: <i className="fa-solid fa-message"></i>,
      path: "/",
    },
    {
      name: "Notifications",
      logo: <i className="fa-solid fa-bell"></i>,
      path: "/notifications",
    },
  ];
  const [clicked, setClicked] = useState("Notifications");
  return (
    <div className="sticky top-0 left-0 w-full h-20 py-5 shadow-md bg-white z-50">
      <div className="flex justify-around">
        {icon.map((value) => {
          return (
            <Link
              to={value["path"]}
              key={value["name"]}
              onClick={() => {
                setClicked(value.name);
              }}
              className={`flex flex-col items-center ${
                clicked === value.name ? `text-blue-400` : `text-gray-500`
              }`}
            >
              <div>{value["logo"]}</div>
              <div>{value["name"]}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Navbar;

import React, { useEffect, useState } from "react";

function Notification() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/notifications");
        const jsondata = await response.json();
        console.log(jsondata);
        setData(jsondata);
      } catch (error) {
        console.error("Error while fetching:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="pt-24 px-10">
        {data.map((value) => {
          return (<div className="flex justify-between">
            <div className="text-7xl">{value["icon"]}</div>
            <div>{value["message"]}</div>
          </div>);
        })}
      </div>
    </>
  );
}

export default Notification;

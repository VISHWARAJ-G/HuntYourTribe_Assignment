import React, { useEffect } from "react";

function Notification() {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/notifications");
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error while fetching:", error);
      }
    }
    fetchData();
  }, []);
  return <></>;
}

export default Notification;

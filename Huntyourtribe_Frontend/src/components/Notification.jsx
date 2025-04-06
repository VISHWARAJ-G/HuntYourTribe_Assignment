import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

function Notification() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/notifications?page=${page}&limit=5`
      );
      const jsondata = await response.json();
      console.log(jsondata);
      setData(jsondata);
      setHasMore(jsondata.length === 5);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/notifications/${id}/read`, {
        method: "PUT",
      });
      fetchData();
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await fetch(`http://localhost:5000/notifications/${id}`, {
        method: "DELETE",
      });
      fetchData();
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  const allRead = async () => {
    const response = await fetch(
      "http://localhost:5000/notifications/read-all",
      {
        method: "PUT",
      }
    );
    fetchData();
  };

  return (
    <>
      <Pagination
        page={page}
        setPage={setPage}
        hasMore={hasMore}
        allRead={allRead}
      />
      <div className="mx-60 shadow-xl p-10 pb-1 shadow-slate-500">
        {data.length === 0 ? (
          <div className="text-center text-gray-500 text-xl py-20">
            No more notifications !
          </div>
        ) : (
          data.map((value, index) => {
            return (
              <div
                key={index}
                onClick={() => markAsRead(value.id)}
                className={`flex justify-between items-center gap- mb-10 py-7 rounded-3xl hover:scale-105 duration-150 transition-all relative px-10 cursor-pointer ${
                  value["is_read"] === 1 ? "bg-white border-4" : "bg-blue-200"
                }`}
              >
                <div
                  className={`text-2xl rounded-full shadow-lg p-5 bg-white shadow-slate-600`}
                >
                  <i className={value["icon"]}></i>
                </div>
                <p className="truncate max-w-xl" title={value["message"]}>
                  {value["message"]}
                </p>
                <div className="flex flex-col gap-5">
                  <div>{value["created_at"].slice(5, 16)}</div>
                </div>
                <div className="absolute -top-3 left-5">
                  {value["is_read"] === 1 ? "🟢" : "🔴"}
                </div>
                <button
                  onClick={() => deleteNotification(value.id)}
                  className="p-3 bg-slate-100 rounded-full absolute right-4 -top-7"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default Notification;

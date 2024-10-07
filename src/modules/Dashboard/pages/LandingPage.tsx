import React, { useEffect, useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [data, setData] = useState({
    totalProperties: 0,
    totalSuccessBookings: 0,
    totalFailedBookings: 0,
    totalOwners: 0,
    totalBuyers: 0,
  });

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:5000/admin/counts")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Card Data
  const cardData = [
    {
      title: "Total Properties",
      count: data.totalProperties,
      icon: "🏡", // You can use an icon library like Font Awesome or Emoji
      bgColor: "bg-blue-400", // Tailwind CSS background color
    },
    {
      title: "Successful Bookings",
      count: data.totalSuccessBookings,
      icon: "✅",
      bgColor: "bg-green-400",
    },
    {
      title: "Failed Bookings",
      count: data.totalFailedBookings,
      icon: "❌",
      bgColor: "bg-yellow-400",
    },
    {
      title: "Total Owners",
      count: data.totalOwners,
      icon: "👤",
      bgColor: "bg-red-400",
    },
    {
      title: "Total Buyers",
      count: data.totalBuyers,
      icon: "💼",
      bgColor: "bg-pink-400",
    },
  ];

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg shadow-lg text-white ${card.bgColor} flex flex-col justify-between`}
        >
          <div className="flex items-center gap-10">
            <div className="text-3xl">{card.icon}</div>
            <div>
              <div className="text-2xl font-semibold">{card.count}</div>
              <div className="text-lg">{card.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LandingPage;

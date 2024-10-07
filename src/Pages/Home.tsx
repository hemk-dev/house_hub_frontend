import React, { useState } from "react";
import { FaMapMarkerAlt, FaRupeeSign, FaSearch } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  // State variables to capture user input
  const [location, setLocation] = useState("");
  const [bhk, setBhk] = useState(""); // For storing BHK value
  const [minRent, setMinRent] = useState(""); // For storing minimum rent

  const handleSearch = () => {
    // Construct the query parameters
    const queryParams = new URLSearchParams({
      city: location,
      BHK: bhk,
      minRent: minRent,
    }).toString();

    // Navigate to the listing page with the query parameters
    navigate(`/list?${queryParams}`);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-[2.75rem] font-semibold">
          Find Your Perfect Rental Home
        </h2>
        <p className="text-[2.5rem] mt-2">Start Searching!</p>
      </div>

      {/* Search Bar */}
      <div className="my-8 border border-gray-400 py-2 px-3 rounded-full w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Location Section */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 flex-grow">
            <FaMapMarkerAlt className="text-red-500" />
            <input
              className="focus:outline-none bg-transparent text-gray-600 w-full"
              type="text"
              placeholder="Location, City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Flat Type Section */}
          <div className="flex items-center gap-2 border-l border-gray-300 px-4 flex-grow">
            <HiHome className="text-red-500" />
            <input
              className="focus:outline-none bg-transparent text-gray-600 w-full"
              type="text"
              placeholder="BHK"
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
            />
          </div>

          {/* Budget Section */}
          <div className="flex items-center gap-2 border-l border-gray-300 px-4 flex-grow">
            <FaRupeeSign className="text-red-500" />
            <input
              className="focus:outline-none bg-transparent text-gray-600 w-full"
              type="number"
              placeholder="Min Rent"
              value={minRent}
              onChange={(e) => setMinRent(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="flex items-center bg-red-500 text-white rounded-full px-5 py-2 w-1/4 gap-2"
          >
            <FaSearch className="text-xl text-white" />
            <p>Search</p>
          </button>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="my-8 px-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        <HighlightCard
          title="Discover 100+ rental options just for you!"
          linkText="See all"
          link="/list"
        />
        <HighlightCard
          title="100+ owner properties available for you!"
          linkText="See all"
          link="/list"
        />
        <HighlightCard
          title="Browse 100+ homes in popular locations!"
          linkText="See all"
          link="/list"
        />
      </div>
    </div>
  );
};

// HighlightCard component
const HighlightCard = ({
  title,
  linkText,
  link,
}: {
  title: string;
  linkText: string;
  link: string; // Add link prop
}) => (
  <div className="p-4 border rounded-lg shadow-md bg-red-100 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <Link
      to={link} // Use the link prop here
      className="text-red-500 font-medium mt-2 inline-block hover:underline"
    >
      {linkText} →
    </Link>
  </div>
);

export default Home;

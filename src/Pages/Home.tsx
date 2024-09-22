import React from "react";
import { FaMapMarkerAlt, FaRupeeSign, FaSearch } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

const Home = () => {
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
      <div className="my-8 border border-gray-300 py-2 px-3 rounded-full w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Location Section */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 flex-grow">
            <FaMapMarkerAlt className="text-red-500" />
            <input
              className="focus:outline-none bg-transparent text-gray-600 w-full"
              type="text"
              placeholder="Location, City"
            />
          </div>

          {/* Flat Type Section */}
          <div className="flex items-center gap-2 border-l border-gray-300 px-4 flex-grow">
            <HiHome className="text-red-500" />
            <span className="text-gray-600">Flat +8</span>
          </div>

          {/* Budget Section */}
          <div className="flex items-center gap-2 border-l border-gray-300 px-4 flex-grow">
            <FaRupeeSign className="text-red-500" />
            <span className="text-gray-600">Budget</span>
          </div>

          {/* Search Button */}
          <button className="flex items-center bg-red-500 text-white rounded-full px-6 py-3 gap-2">
            <FaSearch />
            Search
          </button>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="my-8 px-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        <HighlightCard
          title="Discover 100+ rental options just for you!"
          linkText="See all"
        />
        <HighlightCard
          title="100+ owner properties available for you!"
          linkText="See all"
        />
        <HighlightCard
          title="Browse 100+ homes in popular locations!"
          linkText="See all"
        />
      </div>
    </div>
  );
};

// HighlightCard component
const HighlightCard = ({
  title,
  linkText,
}: {
  title: string;
  linkText: string;
}) => (
  <div className="p-4 border rounded-lg shadow-md bg-red-100 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <Link
      to="#"
      className="text-red-500 font-medium mt-2 inline-block hover:underline"
    >
      {linkText} →
    </Link>
  </div>
);

export default Home;

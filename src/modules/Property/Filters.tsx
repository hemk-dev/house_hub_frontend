import React, { useState } from "react";

interface FiltersProps {
  filters: any;
  handleFilterChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

const FiltersModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  handleFilterChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}> = ({ isOpen, onClose, filters, handleFilterChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50 text-black">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">More Filters</h2>

        {/* More Filters Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Availability Status */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-700">
              Availability Status
            </label>
            <select
              name="availabilityStatus"
              onChange={handleFilterChange}
              value={filters.availabilityStatus || ""}
              className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 focus:border-gray-400"
            >
              <option value="">Select Availability</option>
              <option value="Available">Available</option>
              <option value="NotAvailable">Not Available</option>
            </select>
          </div>

          {/* Furnishing */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-700">Furnishing</label>
            <select
              name="furnishing"
              onChange={handleFilterChange}
              value={filters.furnishing || ""}
              className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 focus:border-gray-400"
            >
              <option value="">Select Furnishing</option>
              <option value="0">Unfurnished</option>
              <option value="1">Semi-Furnished</option>
              <option value="2">Furnished</option>
            </select>
          </div>

          {/* BHK */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-700">BHK</label>
            <select
              name="BHK"
              onChange={handleFilterChange}
              value={filters.BHK || ""}
              className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 focus:border-gray-400"
            >
              <option value="">Select BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
            </select>
          </div>

          {/* Security Deposit */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-700">
              Security Deposit
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minSecurityDeposit"
                placeholder="Min Security"
                value={filters.minSecurityDeposit || ""}
                onChange={handleFilterChange}
                className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 outline-red-500 w-full"
              />
              <input
                type="number"
                name="maxSecurityDeposit"
                placeholder="Max Security"
                value={filters.maxSecurityDeposit || ""}
                onChange={handleFilterChange}
                className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 outline-red-500 w-full"
              />
            </div>
          </div>

          {/* Carpet Area */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-700">Carpet Area</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minCarpetArea"
                placeholder="Min Area"
                value={filters.minCarpetArea || ""}
                onChange={handleFilterChange}
                className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 outline-red-500 w-full"
              />
              <input
                type="number"
                name="maxCarpetArea"
                placeholder="Max Area"
                value={filters.maxCarpetArea || ""}
                onChange={handleFilterChange}
                className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 outline-red-500 w-full"
              />
            </div>
          </div>

          {/* Sort By */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-700">Sort By</label>
            <select
              name="sortBy"
              onChange={handleFilterChange}
              value={filters.sortBy || ""}
              className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 outline-red-500"
            >
              <option value="">Select Sort By</option>
              <option value="rent">Rent</option>
              <option value="securityDeposit">Security Deposit</option>
              <option value="carpetArea">Carpet Area</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-700">Sort Order</label>
            <select
              name="sortOrder"
              onChange={handleFilterChange}
              value={filters.sortOrder || ""}
              className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 outline-red-500"
            >
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>

          {/* Keyword Search */}
          {/* <div className="flex flex-col">
            <label className="mb-2 text-sm text-gray-700">Keyword</label>
            <input
              type="text"
              name="keyword"
              placeholder="Keyword"
              value={filters.keyword || ""}
              onChange={handleFilterChange}
              className="bg-white border border-gray-300 p-2 rounded-lg hover:border-gray-400 focus:border-gray-400"
            />
          </div> */}
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export const Filters: React.FC<FiltersProps> = ({
  filters,
  handleFilterChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="bg-red-500 text-white p-4 mb-6">
      {/* Basic Filters */}
      <div className="flex flex-wrap items-center space-x-4">
        {/* City */}
        <select
          name="city"
          onChange={handleFilterChange}
          value={filters.city || ""}
          className="bg-white text-black p-2 m-1 focus:outline-none rounded-lg"
        >
          <option value="">City</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Mumbai">Mumbai</option>
        </select>

        {/* State */}
        <select
          name="city"
          onChange={handleFilterChange}
          value={filters.city || ""}
          className="bg-white text-black p-2 m-1 focus:outline-none rounded-lg"
        >
          <option value="">State</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Rajashthan">Rajashthan</option>
        </select>

        {/* Country */}
        <select
          name="city"
          onChange={handleFilterChange}
          value={filters.city || ""}
          className="bg-white text-black p-2 m-1 focus:outline-none rounded-lg max-w-48"
        >
          <option value="">Country</option>
          <option value="India">India</option>
          <option value="Canada">Canada</option>
          <option value="United Kingdom abc">United Kingdom</option>
        </select>

        {/* Rent Range */}
        <div className="flex items-center mx-8">
          <input
            type="number"
            name="minRent"
            placeholder="Min Rent"
            value={filters.minRent || ""}
            onChange={handleFilterChange}
            className="bg-white text-black p-2 m-1 rounded-lg"
          />
          <input
            type="number"
            name="maxRent"
            placeholder="Max Rent"
            value={filters.maxRent || ""}
            onChange={handleFilterChange}
            className="bg-white text-black p-2 m-1 rounded-lg"
          />
        </div>

        {/* Open Modal for more filters */}
        <button
          onClick={openModal}
          className="bg-blue-500 text-white p-2 rounded-full px-5"
        >
          More Filters
        </button>
      </div>

      {/* Filters Modal */}
      <FiltersModal
        isOpen={isModalOpen}
        onClose={closeModal}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
    </div>
  );
};

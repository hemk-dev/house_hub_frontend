import React, { useEffect, useState } from "react";

interface FiltersProps {
  filters: {
    city: string;
    BHK: number | null;
    minRent: number | null;
    maxRent: number | null;
    maxDeposit: number | null;
    minDeposit: number | null;
    furnishing: number | null;
  };
  handleFilterChange: (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  resetFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  handleFilterChange,
  resetFilters,
}) => {
  const [filterOptions, setFilterOptions] = useState({
    city: [] as string[],
    state: [] as string[],
    country: [] as string[],
    owner: [] as string[],
  });

  // Fetch the dynamic filter options from the API
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/properties/filters"
        );
        const data = await response.json();
        setFilterOptions({
          city: data.city ?? [],
          state: data.state ?? [],
          country: data.country ?? [],
          owner: data.owner_name ?? [],
        });
      } catch (error) {
        console.error("Failed to fetch filter options", error);
      }
    };

    fetchFilterOptions();
  }, []);

  return (
    <div className="w-1/5 bg-red-500 p-4 border-r border-gray-200 h-screen">
      <h3 className="text-2xl font-sans mb-6 text-white">Filter Properties</h3>

      {/* Rent Filter */}
      <div className="flex gap-4">
        <div className="mb-4">
          <label
            htmlFor="minRent"
            className="block text-sm font-medium text-white mb-1"
          >
            Min Rent (₹)
          </label>
          <input
            type="number"
            id="minRent"
            name="minRent"
            value={filters.minRent !== null ? filters.minRent : ""}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
            placeholder="Minimum Rent"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="maxRent"
            className="block text-sm font-medium text-white mb-1"
          >
            Max Rent (₹)
          </label>
          <input
            type="number"
            id="maxRent"
            name="maxRent"
            value={filters.maxRent !== null ? filters.maxRent : ""}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
            placeholder="Maximum Rent"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="mb-4">
          <label
            htmlFor="minDeposit"
            className="block text-sm font-medium text-white mb-1"
          >
            Min Deposit (₹)
          </label>
          <input
            type="number"
            id="minDeposit"
            name="minDeposit"
            value={filters.minDeposit !== null ? filters.minDeposit : ""}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Minimum Deposit"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="maxDeposit"
            className="block text-sm font-medium text-white mb-1"
          >
            Max Deposit (₹)
          </label>
          <input
            type="number"
            id="maxDeposit"
            name="maxDeposit"
            value={filters.maxDeposit !== null ? filters.maxDeposit : ""}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
            placeholder="Maximum Deposit"
          />
        </div>
      </div>

      <div className="flex gap-4">
        {/* BHK Filter */}
        <div className="mb-4 w-2/4">
          <label htmlFor="BHK" className="text-sm font-medium text-white mb-1">
            BHK
          </label>
          <select
            id="BHK"
            name="BHK"
            value={filters.BHK || ""}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
          >
            <option value={0}>Any</option>
            <option value={1}>1 BHK</option>
            <option value={2}>2 BHK</option>
            <option value={3}>3 BHK</option>
            <option value={4}>4 BHK</option>
          </select>
        </div>

        {/* Furnishing Filter */}
        <div className="mb-4">
          <label
            htmlFor="furnishing"
            className="block text-sm font-medium text-white mb-1"
          >
            Furnishing
          </label>
          <select
            id="furnishing"
            name="furnishing"
            value={filters.furnishing || 0}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
          >
            <option value={0}>Any</option>
            <option value={1}>Furnished</option>
            <option value={2}>Semi-Furnished</option>
            <option value={3}>Unfurnished</option>
          </select>
        </div>
      </div>

      {/* Country Filter */}
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-white mb-1"
        >
          Country
        </label>
        <select
          id="country"
          name="country"
          onChange={handleFilterChange}
          className="w-full border border-gray-300 rounded-md p-2 outline-none"
        >
          <option value="">All</option>
          {filterOptions.country.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        {/* State Filter */}
        <div className="mb-4 w-2/4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-white mb-1"
          >
            State
          </label>
          <select
            id="state"
            name="state"
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
          >
            <option value="">All</option>
            {filterOptions.state.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 w-2/4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-white mb-1"
          >
            City
          </label>
          <select
            id="city"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md p-2 outline-none"
          >
            <option value="">All</option>
            {filterOptions.city.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="owner"
          className="block text-sm font-medium text-white mb-1"
        >
          Owner
        </label>
        <select
          id="owner"
          name="owner"
          onChange={handleFilterChange}
          className="w-full border border-gray-300 rounded-md p-2 outline-none"
        >
          <option value="">All</option>
          {filterOptions.owner.map((owner, index) => (
            <option key={index} value={owner}>
              {owner}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={resetFilters}
        className="mt-4 px-4 py-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;

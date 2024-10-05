import React, { useEffect, useState } from "react";
import Filters from "./Filters"; // Ensure the path is correct
import { getAvailabilityStatus } from "./utils/AvailabiltyStatus";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
interface Property {
  id: number;
  name: string;
  city: string;
  state: string;
  bathroom: number;
  tenantPreferred: number;
  BHK: number;
  furnishing: number;
  rent: number;
  security_deposit: number;
  createdAt: string;
  availability_status: number;
  owner_name: string;
  contact: string;
  country: string;
  address: string;
  zipcode: string;
  email: string;
  carpet_area: string;
  description: string;
  photos: string[];
}

const List: React.FC = () => {
  const [filters, setFilters] = useState({
    city: "",
    BHK: null,
    minRent: null,
    maxRent: null,
    maxDeposit: null,
    minDeposit: null,
    furnishing: null,
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};

      if (filters.city) params.city = filters.city;
      if (filters.BHK !== null) params.BHK = filters?.BHK;
      if (filters.minRent !== null) params.minRent = filters?.minRent;
      if (filters.maxRent !== null) params.maxRent = filters?.maxRent;
      if (filters.minDeposit !== null) params.minDeposit = filters?.minDeposit;
      if (filters.maxDeposit !== null) params.maxDeposit = filters?.maxDeposit;
      if (filters.furnishing !== null) params.furnishing = filters?.furnishing;
      const response = await fetch(
        `http://localhost:5000/properties?${new URLSearchParams(params)}`
      );
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
        ? name === "BHK" || name === "furnishing"
          ? Number(value)
          : value
        : null,
    }));
  };

  const resetFilters = () => {
    setFilters({
      city: "",
      BHK: null,
      minRent: null,
      maxRent: null,
      maxDeposit: null,
      minDeposit: null,
      furnishing: null,
    });
  };
  const handleDropDownToggle = () => {
    setDropDown(!dropDown);
  };
  return (
    <div className="flex">
      <Filters
        filters={filters}
        handleFilterChange={handleFilterChange}
        resetFilters={resetFilters}
      />

      <div className="w-4/5 p-4">
        <h3 className="text-2xl font-bold mb-6">
          {properties.length} results | Properties for Rent{" "}
        </h3>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {properties.length > 0 ? (
              properties.map((property) => (
                <li
                  key={property.id}
                  className="border p-4 rounded shadow-lg flex justify-between items-start bg-white"
                >
                  <div className="w-1/5">
                    {/* Left Section with Image */}
                    <div className="relative">
                      <img
                        src={
                          property.photos[0] ||
                          "https://via.placeholder.com/150"
                        }
                        alt="Property"
                        className="w-full h-auto rounded"
                      />
                      <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                        {property.photos.length}+ Photos
                      </span>
                    </div>
                    <span className="text-gray-500 text-xs block mt-2">
                      Posted:{" "}
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="w-3/7 px-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold">{property.name}</h4>
                    </div>
                    <p className="text-md font-medium text-gray-500 mb-2">
                      {property.address}, {property.zipcode}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      {property.city}, {property.state}, {property.country}
                    </p>

                    <div className="my-4">
                      <p>
                        {property?.description?.length > 100
                          ? `${property?.description.slice(0, 100)}...`
                          : property?.description}
                      </p>
                    </div>
                    {/* 
                    <div className="bg-green-100 text-green-600 w-1/5 py-1 rounded text-s text-center items-center">
                      <span>
                        {property.availability_status === 2
                          ? "Available"
                          : "Not Available"}
                      </span>
                    </div> */}
                    <div className="bg-gray-100 py-4 px-6 rounded-md my-4 grid grid-cols-8 gap-6 relative">
                      {/* First Row of Details */}
                      <div className="col-span-2 space-y-1">
                        <p className="text-xs uppercase text-gray-500">
                          furnishing
                        </p>
                        <p className="text-md truncate">
                          {property.furnishing === 1
                            ? "Unfurnished"
                            : property.furnishing === 2
                            ? "Furnished"
                            : property.furnishing === 3
                            ? "Semi-furnished"
                            : ""}
                        </p>
                      </div>

                      <div className="bg-gray-300 w-[1px] col-span-1"></div>

                      <div className="col-span-2 space-y-1">
                        <p className="text-xs uppercase text-gray-500">
                          availability
                        </p>
                        <p className="text-md truncate">
                          {getAvailabilityStatus(property.availability_status)}
                        </p>
                      </div>

                      <div className="bg-gray-300 w-[1px] col-span-1"></div>

                      <div className="col-span-2 space-y-1">
                        <p className="text-xs uppercase text-gray-500">bhk</p>
                        <p className="text-md truncate">{property.BHK} BHK</p>
                      </div>

                      {/* Dropdown Button */}
                      <div className="absolute right-0 flex justify-center items-center">
                        <button className="p-2" onClick={handleDropDownToggle}>
                          {!dropDown ? (
                            <MdArrowDropDown className="text-2xl" />
                          ) : (
                            <MdArrowDropUp className="text-2xl" />
                          )}
                        </button>
                      </div>

                      {/* Dropdown Content */}
                      {dropDown && (
                        <>
                          <div className="col-span-8 mt-4 grid grid-cols-8 gap-6">
                            <div className="col-span-2 space-y-1">
                              <p className="text-xs uppercase text-gray-500">
                                carpet area
                              </p>
                              <p className="text-md truncate">
                                {property.carpet_area} sqft
                              </p>
                            </div>

                            <div className="bg-gray-300 w-[1px] col-span-1"></div>

                            <div className="col-span-2 space-y-1">
                              <p className="text-xs uppercase text-gray-500">
                                bathroom
                              </p>
                              <p className="text-md truncate">
                                {property.bathroom}
                              </p>
                            </div>

                            <div className="bg-gray-300 w-[1px] col-span-1"></div>

                            <div className="col-span-2 space-y-1">
                              <p className="text-xs uppercase text-gray-500">
                                tenant preferred
                              </p>
                              <p className="text-md truncate">
                                {property.tenantPreferred === 1
                                  ? "Bachelors"
                                  : property.tenantPreferred === 2
                                  ? "Family"
                                  : "Bachelors/Family"}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="w-2/7 flex flex-col mx-2 gap-6">
                    {/* Rent, Security Deposit, and Buttons */}
                    <div className="flex flex-col items-center mb-4">
                      <p className="font-bold text-xl">
                        ₹{property.security_deposit}
                      </p>
                      <p className="text-md font-normal text-gray-600 text-lg">
                        Security Deposit
                      </p>
                    </div>

                    <div className="space-y-2">
                      <button className="px-4 py-2 w-full bg-red-500 text-white rounded-full hover:bg-red-600">
                        Book
                      </button>
                      <button className="px-4 py-2 w-full border border-red-500 text-red-500 rounded-full hover:bg-red-50">
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No properties found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default List;

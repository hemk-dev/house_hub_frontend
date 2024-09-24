import React, { useEffect, useState } from "react";
import Modal from "../Property/InquiryModal";
import {
  AvailabilityStatus,
  getAvailabilityStatus,
} from "./utils/AvailabiltyStatus";
import { Filters } from "./Filters";

// Interface for Property
interface Property {
  id: string;
  name: string;
  type: string;
  security_deposit: string;
  rent: string;
  status: number;
  owner_name: string;
  city: string;
  address: string;
  BHK: number;
  furnishing: number;
  bathrooms: number;
  tenant_preferred: string;
  photos: string[];
  description: string;
}

// API call function to fetch properties with filters
const fetchProperties = async (
  filters: Record<string, string | number>
): Promise<Property[]> => {
  // Filter out empty filters
  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value !== "" && value !== 0)
  );

  // Convert filters into query string format
  const queryString = new URLSearchParams(
    activeFilters as Record<string, string>
  ).toString();

  // Fetch properties based on filters (or all properties if no filters applied)
  const response = await fetch(
    `http://localhost:5000/properties${queryString ? `?${queryString}` : ""}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  const data = await response.json();
  return data;
};

const List: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(
    null
  );

  // Filter state with initial values
  const [filters, setFilters] = useState({
    city: "", // Default: no filter applied
    BHK: 0, // Initialize with 0
    minRent: 0, // Initialize with a default value (e.g., 0)
    maxRent: 100000, // Initialize with a default value (e.g., 100000)
    furnishing: 0, // Initialize with 0
  });

  // Load properties on mount and when filters change
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchProperties(filters);
        setProperties(data);
      } catch (err) {
        setError("Error fetching properties");
      }
    };
    loadProperties();
  }, [filters]);

  // Handle filter change for dropdowns and number inputs
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    // Convert BHK and furnishing to numbers, rest remain strings
    setFilters({
      ...filters,
      [name]: name === "BHK" || name === "furnishing" ? Number(value) : value,
    });
  };

  // Modal handling functions
  const openModal = (propertyId: string) => {
    setSelectedPropertyId(propertyId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPropertyId(null);
  };

  return (
    <>
      <Filters filters={filters} handleFilterChange={handleFilterChange} />
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}

        {/* Location and Total Results */}
        <h3 className="text-xl font-semibold mb-4">
          Properties for Rent in {filters.city || "All Cities"}
        </h3>
        <h2 className="text-lg mb-4">
          Total Results: {properties.length} Properties
        </h2>

        {/* Error Handling */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Property List */}
        <div className="space-y-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="border rounded-lg shadow-md overflow-hidden flex items-stretch w-3/4 mx-auto"
            >
              {/* Property Image */}
              <div className="w-1/4 relative">
                <img
                  src={property.photos[0]}
                  alt={property.name}
                  className="h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  {property.photos.length}+ Photos
                </span>
              </div>

              {/* Property Details */}
              <div className="w-2/4 p-4 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold">{property.name}</h2>
                  <p className="text-gray-600">
                    {property.address}, {property.city}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {property.description.length > 150
                      ? `${property.description.slice(0, 150)}...`
                      : property.description}
                  </p>
                </div>

                {/* Details (BHK, Furnishing, etc.) */}
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div>
                    <span className="block text-sm text-gray-500 uppercase">
                      Availability
                    </span>
                    <span>{getAvailabilityStatus(property.status)}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500 uppercase">
                      Furnishing
                    </span>
                    <span>
                      {property.furnishing === 0
                        ? "Unfurnished"
                        : property.furnishing === 1
                        ? "Furnished"
                        : "Semi-furnished"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500 uppercase">
                      BHK
                    </span>
                    <span>{property.BHK}</span>
                  </div>
                </div>
              </div>

              {/* Rent & Security Section */}
              <div className="w-1/4 p-4 flex flex-col justify-between">
                <div className="text-right">
                  <p className="text-xl font-semibold">
                    ₹{property.security_deposit}
                  </p>
                  <p className="text-gray-500 text-sm">Security Deposit</p>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                    onClick={() => openModal(property.id)}
                  >
                    Inquire Property
                  </button>
                  <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg w-full">
                    Get Contact Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedPropertyId && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            propertyId={selectedPropertyId}
          />
        )}
      </div>
    </>
  );
};

export default List;

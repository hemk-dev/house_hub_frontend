import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { propertyDetailsById } from "../modules/Dashboard/utils/slice";
import { useAppDispatch } from "../Config/store";

const PaymentSuccess = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const amount = query.get("amt")?.slice(0,-2);
  const propertyId = query.get("propertyId");
  const dispatch = useAppDispatch();
  const [propertyDetails, setPropertyDetails] = useState<any>(null);
  const bookingDate = new Date().toLocaleDateString();
  useEffect(() => {
    if (propertyId) {
      const fetchDetails = async () => {
        const details = await dispatch(propertyDetailsById(propertyId));
        setPropertyDetails(details);
      };
      fetchDetails();
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-green-100">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Successful Payment
          </h1>
          <p className="text-lg mb-2">
            {propertyDetails?.name} is booked at an amount of ₹{amount} on{" "}
            {bookingDate}.
          </p>
          <p className="text-md text-gray-500">
            Thank you for your booking! We look forward to seeing you soon.
          </p>
          <a
            href="/"
            className="mt-6 inline-block bg-green-500 text-white rounded-full px-6 py-2 hover:bg-green-600"
          >
            Go to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;

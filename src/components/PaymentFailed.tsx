import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { propertyDetailsById } from "../modules/Dashboard/utils/slice";
import { useAppDispatch } from "../Config/store";

const PaymentFailed = () => {
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
  }, [propertyId, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h1>
        <p className="text-lg mb-2">
          Unfortunately, the booking for {propertyDetails?.name} at an amount of
          ₹{amount} on {bookingDate} could not be completed.
        </p>
        <p className="text-md text-gray-500">
          Please try again or contact support for assistance.
        </p>
        <a
          href="/"
          className="mt-6 inline-block bg-red-500 text-white rounded-full px-6 py-2 hover:bg-red-600"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentFailed;

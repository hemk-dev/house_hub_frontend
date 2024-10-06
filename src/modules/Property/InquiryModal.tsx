import { Button } from "antd";
import React, { useState } from "react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string | null; // Change to string | null
  onSubmit: (data: {
    name: string;
    email: string;
    contact: string;
    message: string;
    property_id: string;
  }) => void;
}

const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  propertyId,
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (propertyId) {
      onSubmit({ name, email, contact, message, property_id: propertyId }); // Use propertyId directly
      onClose(); // Close the modal after submission
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-80 backdrop-blur-sm">
      <div className="bg-white p-8 rounded shadow-lg w-1/3 h-[70%]">
        <h2 className="text-xl font-bold mb-4">Enquire Now</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Contact:</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 w-full h-24" // Increase height for textarea
              required
            />
          </div>
          <div className="flex justify-center items-center gap-6 w-full">
            <Button
              className="text-md p-5 w-1/2"
              size="large"
              type="primary"
              danger
              htmlType="submit"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="text-md p-5 w-1/2"
              size="large"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;

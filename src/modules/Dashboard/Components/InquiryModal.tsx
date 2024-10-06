import React, { useState } from "react";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: number | null;
  onSubmit: (data: { email: string; contact: string }) => void;
}

const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  propertyId,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (propertyId) {
      onSubmit({ email, contact });
      onClose(); // Close the modal after submission
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enquire Now</h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 py-2 px-4 rounded border"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;

import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
}

const InquiryModal: React.FC<ModalProps> = ({ isOpen, onClose, propertyId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "I am interested in the property. Can you provide more details?",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form logic here, e.g., sending data to backend API
    console.log("Form submitted: ", { ...formData, propertyId });
    onClose(); // Close the modal after form submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Submit a Inquiry</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded my-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded my-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Contact</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full p-2 border rounded my-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border rounded my-2"
              required
            />
          </div>
          <input type="hidden" value={propertyId} />
          <div className="flex justify-end p-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded-lg mr-2 hover:bg-gray-300 hover:shadow-sm hover:shadow-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg  hover:bg-red-500 hover:shadow-sm hover:shadow-red-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryModal;

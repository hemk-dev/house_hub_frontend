import React, { useState } from "react";
import { Button, Modal } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import axios from "axios";

// Load Stripe with your publishable key
const stripePromise = loadStripe("your_publishable_key_here");

// Define the types for the Property and PaymentModal props
interface Property {
  id: number;
  security_deposit: number;
  rent: number;
}

interface PaymentModalProps {
  property: Property;
  isOpen: boolean; // Indicates if the modal is open
  onClose: () => void; // Function to close the modal
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  property,
  isOpen,
  onClose,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState<boolean>(false); // Set type for isLoading
  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      Swal.fire(
        "Error",
        "Stripe has not yet loaded. Please try again later.",
        "error"
      );
      setIsLoading(false);
      return;
    }

    try {
      // Create a PaymentIntent on the server to get the client secret
      const response = await axios.post(
        "http://localhost:5000/properties/book",
        { propertyId: property.id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      //   console.log("🚀 ~ handlePayment ~ response:", response);

      await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (!response.data.success) {
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: "There was an error initiating the payment process. Please try again later.",
        });
      }

      Swal.fire({
        icon: "success",
        title: "Payment Success",
        text: "Payment successful and property booked!",
      });

      onClose();
    } catch (error: any) {
      console.error("Error in payment", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "There was an error initiating the payment process. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Enter Your Payment Details"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      className="payment-modal"
    >
      <form onSubmit={handlePayment}>
        <CardElement
          options={{ style: { base: { fontSize: "16px", color: "#32325d" } } }}
        />
        <div className="flex justify-center items-center gap-6 mt-4">
          <Button type="primary" danger onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={!stripe || isLoading}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentModal;

import React, { useEffect, useState } from "react";
import { Button, Space, Table, Breadcrumb, Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom"; // For navigation
import { useAppDispatch, useAppSelector } from "../../../Config/store";
import { fetchPaymentData } from "../utils/slice"; // Adjusted the import for fetching payment data

const { Header, Content } = Layout;

interface PaymentDataType {
  key: string;
  propertyName: string;
  buyerName: string;
  ownerName: string;
  amount: string;
  status: boolean;
  createdDate: string; // Assuming createdDate is a string (e.g., ISO date)
}

const PaymentData: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.dashboard.paymentData); // Fetch payment data from Redux store
  const navigate = useNavigate(); // Hook for navigation
  const [properties, setProperties] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token"); // Replace with your actual key
        console.log("🚀 ~ fetchData ~ token:", token)
        const response = await fetch(
          `http://localhost:5000/properties/transactions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // Optional: Add if needed
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("🚀 ~ fetchData ~ data:", data);
        setProperties(data);
        // await dispatch(fetchPaymentData());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  // Map payment data to match the table structure
  const dataSource: PaymentDataType[] = Array.isArray(properties)
    ? properties.map((payment: any) => ({
        key: payment.id, // Use the unique ID as key
        propertyName: payment.property_name,
        buyerName: payment.buyer_name,
        ownerName: payment.owner_name,
        amount: (payment.amount / 100).toFixed(2), // Divide amount by 100 and format it to 2 decimal places
        status: payment.status,
        createdDate: new Date(payment.createdAt).toLocaleString(), // Format date as needed
      }))
    : []; // Fallback to empty array if data is not an array

  // Define columns for the payment table
  const columns = [
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
    },
    {
      title: "Buyer Name",
      dataIndex: "buyerName",
      key: "buyerName",
    },
    {
      title: "Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <span>{status ? "Processed" : "Pending"}</span>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
    },
  ];

  return (
    <Layout>
      <Header className="bg-white p-4">
        <Row justify="space-between" align="middle">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item>
                <span
                  onClick={() => navigate("/dashboard/landingpage")}
                  className="cursor-pointer text-black font-bold"
                >
                  Dashboard
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Payments</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Header>

      <Content className="mt-4" style={{ padding: "20px" }}>
        <Table<PaymentDataType>
          columns={columns}
          dataSource={dataSource}
          loading={loading}
        />
      </Content>
    </Layout>
  );
};

export default PaymentData;

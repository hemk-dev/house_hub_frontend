import React, { useEffect, useState } from "react";
import { Button, Space, Table, Breadcrumb, Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom"; // For navigation
import { useAppDispatch, useAppSelector } from "../../../Config/store";
import { fetchInqiryList, fetchPaymentData, inquiryStatusUpdateById } from "../utils/slice"; // Adjusted the import for status update

const { Header, Content } = Layout;

interface InquiryType {
  key: string;
  inquiryId: string;
  name: string;
  email: string;
  contact: string;
  message: string;
  propertyName: string;
  status: boolean;
}

const PaymentData: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.dashboard.inquiryData); // Fetch inquiry data from Redux store
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchPaymentData());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  // Map inquiry data to match the table structure
  const dataSource: InquiryType[] = Array.isArray(data)
    ? data.map((inquiry: any) => ({
        key: inquiry.inquiry_inquiry_id,
        inquiryId: inquiry.inquiry_inquiry_id,
        name: inquiry.inquiry_name,
        email: inquiry.inquiry_email,
        contact: inquiry.inquiry_contact,
        message: inquiry.inquiry_message,
        propertyName: inquiry.propertyname,
        status: inquiry.inquiry_status,
      }))
    : []; // Fallback to empty array if data is not an array

  // Function to handle status update
  const handleStatusUpdate = async (inquiryId: string) => {
    setLoading(true);
    await dispatch(inquiryStatusUpdateById(inquiryId));
    setLoading(false);
  };

  // Define columns for the inquiry table
  const columns = [
    {
      title: "Owner Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      ellipsis: true, // Truncate long messages
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean, record: InquiryType) => (
        <Button
          type={status ? "primary" : "default"}
          disabled={status ? true : false}
          onClick={() => handleStatusUpdate(record.inquiryId)}
        >
          {status ? "Processed" : "Pending"}
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <Header className="bg-white p-4">
        <Row justify="space-between" align="middle">
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item>
                <span onClick={() => navigate("/dashboard")} className="cursor-pointer text-black font-bold">
                  Dashboard
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Inquiries</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Header>

      <Content className="mt-4" style={{ padding: "20px" }}>
        <Table<InquiryType> columns={columns} dataSource={dataSource} loading={loading} />
      </Content>
    </Layout>
  );
};

export default PaymentData;

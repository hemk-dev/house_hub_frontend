import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import axios from "axios";

interface PropertyType {
  key: string;
  owner_name: string;
  city: string;
  state: string;
  country: string;
  property_status: string[];
}

const columns: TableProps<PropertyType>["columns"] = [
  {
    title: "Owner Name",
    dataIndex: "owner_name",
    key: "owner_name",
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Status",
    key: "property_status",
    dataIndex: "property_status",
    render: (_, { property_status }) => (
      <>
        {property_status.map((status) => {
          let color = status === "active" ? "green" : "volcano";
          return (
            <Tag color={color} key={status}>
              {parseInt(status) === 0 ? "Available" : "Vacant"}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>View {record.owner_name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/properties/list",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZjU4ZjNiMC1lZDY1LTQzYzQtODg5OC04ZjA2NWQyMTkyODQiLCJmbmFtZSI6IkRhdmlkIiwibG5hbWUiOiJMdWl6IiwiZW1haWwiOiJ0ZXN0QGFkbWluLmNvbSIsInJvbGVJZCI6MSwiaWF0IjoxNzI3NzE5MzY0LCJleHAiOjE3Mjc4MDU3NjR9.JJiAiqLSK7dlbn9B2UnkCvaPX5Afo8BtY1ElGvjWOJk`, // Add your static token here
            },
          }
        );
        const formattedData = response.data.map((property: any) => ({
          key: property.id,
          owner_name: property.owner_name,
          city: property.city,
          state: property.state,
          country: property.country,
          property_status: [property.status],
        }));
        setProperties(formattedData);
      } catch (error) {
        console.error("Failed to fetch properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Table<PropertyType>
      columns={columns}
      dataSource={properties}
      loading={loading}
    />
  );
};

export default PropertyList;

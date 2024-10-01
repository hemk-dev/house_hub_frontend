import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../../Config/store";
import { fetchPropertyData } from "../utils/slice";

interface PropertyType {
  key: string;
  owner_name: string;
  city: string;
  state: string;
  country: string;
  deposit: string; // Changed to string to match the expected format
  property_status: string;
}

const PropertyList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.dashboard.propertyData);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchPropertyData());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  // Map the properties to the format expected by the Table
  const dataSource = properties.map((property: any) => ({
    key: property.id,
    owner_name: property.owner_name,
    city: property.city,
    state: property.state,
    country: property.country,
    deposit: property.security_deposit, // Corrected access
    property_status: property.status === 0 ? 'Occupied' : 'Vacant',
  }));

  // Define the columns for the table
  const columns = [
    {
      title: 'Owner Name',
      dataIndex: 'owner_name',
      key: 'owner_name',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Deposit',
      dataIndex: 'deposit',
      key: 'deposit',
    },
    {
      title: 'Property Status',
      dataIndex: 'property_status',
      key: 'property_status',
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <a>View</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Table<PropertyType>
      columns={columns}
      dataSource={dataSource}
      loading={loading}
    />
  );
};

export default PropertyList;

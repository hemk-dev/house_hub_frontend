import React, { useEffect, useState } from "react";
import { Space, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../../../Config/store";
import { fetchPropertyData, propertyDelete } from "../utils/slice";
import DeleteModal from "../../../components/DeleteModal";
import ViewDrawerProperty from "./ViewDrawerProperty";

interface PropertyType {
  key: string;
  owner_name: string;
  city: string;
  state: string;
  country: string;
  deposit: string;
  property_status: string;
}

const PropertyList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [deleteValue, setDeleteValue] = useState<number | null>(null);
  const [viewVisible, setViewVisible] = useState<boolean>(false); // State for drawer visibility
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null); // Store selected property ID
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

  const dataSource = properties.map((property: any) => ({
    key: property.id,
    owner_name: property.owner_name,
    city: property.city,
    state: property.state,
    country: property.country,
    deposit: property.security_deposit,
    property_status: property.status === 0 ? "Occupied" : "Vacant",
  }));

  const columns = [
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
      title: "Deposit",
      dataIndex: "deposit",
      key: "deposit",
    },
    {
      title: "Property Status",
      dataIndex: "property_status",
      key: "property_status",
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => { setSelectedPropertyId(record.key); setViewVisible(true); }}>View</a>
          <a onClick={() => setDeleteValue(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table<PropertyType> columns={columns} dataSource={dataSource} loading={loading} />

      {/* DeleteModal for deletion confirmation */}
      <DeleteModal
        title="Property"
        deleteValues={deleteValue}
        callApi={propertyDelete}
        close={() => setDeleteValue(null)}
      />

      {/* ViewDrawer for viewing property details */}
      <ViewDrawerProperty
        visible={viewVisible}
        onClose={() => setViewVisible(false)}
        propertyId={selectedPropertyId} // Pass the selected property ID
      />
    </>
  );
};

export default PropertyList;

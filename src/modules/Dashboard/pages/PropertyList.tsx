import React, { useEffect, useState } from "react";
import { Button, Space, Table, Breadcrumb, Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom"; // For navigation
import { useAppDispatch, useAppSelector } from "../../../Config/store";
import { fetchPropertyData, propertyDelete } from "../utils/slice";
import DeleteModal from "../../../components/DeleteModal";
import ViewDrawerProperty from "../Components/ViewDrawerProperty";
import CreateProperty from "../Components/CreateProperty"; // Import the updated CreateProperty component

const { Header, Content } = Layout;

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
  const [createVisible, setCreateVisible] = useState<boolean>(false); // State for Create Property Drawer visibility
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.dashboard.propertyData);
  const navigate = useNavigate(); // Hook for navigation
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading before fetching data
        await dispatch(fetchPropertyData());
      } catch (error: any) {
        // Handle different kinds of errors safely
        if (error?.response && error.response.status === 404) {
          console.warn("No properties found!"); // Handle 404 specifically
        } else if (error?.response?.data?.message) {
          console.error("Error fetching property data:", error.response.data.message);
        } else if (error?.message) {
          console.error("Error:", error.message); // Handle generic error message
        } else {
          console.error("An unknown error occurred:", error);
        }
      } finally {
        // Ensure loading is set to false regardless of success or failure
        setLoading(false);
      }
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
          <Button
            onClick={() => {
              setSelectedPropertyId(record.key);
              setViewVisible(true);
            }}
          >
            View
          </Button>
          <Button onClick={() => setDeleteValue(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Header className="bg-white p-4">
        <Row justify="space-between" align="top">
          {/* Breadcrumb on the left */}
          <Col>
            <Breadcrumb>
              <Breadcrumb.Item>
                <span onClick={() => navigate("/dashboard/landingpage")} className="cursor-pointer text-black font-bold">
                  Dashboard
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Properties</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          {/* Create Property Button on the right */}
          <Col>
            <Button type="primary"  onClick={() => setCreateVisible(true)}>
              Create Property
            </Button>
          </Col>
        </Row>
      </Header>

      {/* Add margin-top to create gap between header and table */}
      <Content style={{ padding: "10px", marginTop: "20px" }}>
        <Table<PropertyType> columns={columns} dataSource={dataSource} loading={loading} />
      </Content>

      {/* Create Property Drawer */}
      <CreateProperty visible={createVisible} onClose={() => setCreateVisible(false)} />

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
    </Layout>
  );
};

export default PropertyList;

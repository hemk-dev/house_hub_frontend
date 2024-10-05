import React, { useEffect, useState } from "react";
import { Button, Space, Table, Breadcrumb, Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom"; // For navigation
import { useAppDispatch, useAppSelector } from "../../../Config/store";
import { fetchUserData, userDelete } from "../utils/slice"; // Adjusted the import for delete action
import DeleteModal from "../../../components/DeleteModal";

const { Header, Content } = Layout;

interface UserType {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

// Helper function to get role name based on roleId
const getRoleName = (roleId: number): string => {
  switch (roleId) {
    case 1:
      return "Admin";
    case 2:
      return "Owner";
    case 3:
      return "Buyer";
    default:
      return "Unknown";
  }
};

const UserList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [deleteValue, setDeleteValue] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.dashboard.userData); // Fetch user data from Redux store
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchUserData());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  // Check if users is an array and map over it
  const dataSource: UserType[] = Array.isArray(users)
    ? users.map((user: any) => ({
        key: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        roleId: user.roleId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }))
    : []; // Fallback to empty array if users is not an array

  // Define columns for the user table
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "roleId",
      key: "roleId",
      render: (roleId: number) => getRoleName(roleId), // Use helper function to get role name
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <Button onClick={() => setDeleteValue(record.key)}>Delete</Button>
        </Space>
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
              <Breadcrumb.Item>Users</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Header>

      <Content className="mt-4" style={{ padding: "20px" }}>
        <Table<UserType> columns={columns} dataSource={dataSource} loading={loading} />
      </Content>

      {/* DeleteModal for deletion confirmation */}
      <DeleteModal
        title="User"
        deleteValues={deleteValue}
        callApi={userDelete} // Adjusted the delete action for users
        close={() => setDeleteValue(null)}
      />
    </Layout>
  );
};

export default UserList;

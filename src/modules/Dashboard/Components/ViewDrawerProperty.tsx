
// ViewDrawer.tsx
import React, { useEffect, useState } from "react";
import { Drawer, Descriptions, Button } from "antd";
import { propertyDetailsById } from "../utils/slice"; // Assuming you have an API to fetch property details
import { useAppDispatch } from "../../../Config/store";

interface ViewDrawerProps {
  visible: boolean;
  onClose: () => void;
  propertyId: any; // ID of the property to view
}

const ViewDrawerProperty: React.FC<ViewDrawerProps> = ({ visible, onClose, propertyId }) => {
  const dispatch = useAppDispatch();
  const [propertyDetails, setPropertyDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (propertyId) {
      const fetchDetails = async () => {
        setLoading(true);
        const details = await dispatch(propertyDetailsById(propertyId)); // Adjust as per your API
        setPropertyDetails(details);
        setLoading(false);
      };
      fetchDetails();
    }
  }, [propertyId, dispatch]);

  return (
    <Drawer
      title="Property Details"
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      width={480}
    >
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          propertyDetails && (
            <Descriptions bordered>
              <Descriptions.Item label="Owner Name">{propertyDetails.owner_name}</Descriptions.Item>
              <Descriptions.Item label="City">{propertyDetails.city}</Descriptions.Item>
              <Descriptions.Item label="State">{propertyDetails.state}</Descriptions.Item>
              <Descriptions.Item label="Country">{propertyDetails.country}</Descriptions.Item>
              <Descriptions.Item label="Deposit">{propertyDetails.security_deposit}</Descriptions.Item>
              <Descriptions.Item label="Status">
                {propertyDetails.status === 0 ? "Occupied" : "Vacant"}
              </Descriptions.Item>
            </Descriptions>
          )
        )}
      </div>
      <Button onClick={onClose} style={{ marginTop: 16 }}>
        Close
      </Button>
    </Drawer>
  );
};

export default ViewDrawerProperty;

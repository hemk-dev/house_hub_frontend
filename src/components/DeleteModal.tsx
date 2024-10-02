import React, { useState } from "react";
import { Button, Modal, ModalProps } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../Config/store";

interface DeleteModalProps extends ModalProps {
  title: string;
  close: () => void;
  deleteValues: any;
  callApi: any;
  nameKey?: string | number;
  specialChar?: any;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  close,
  deleteValues,
  callApi,
  nameKey,
  specialChar,
}) => {
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState<boolean>(false);

  const deleteApi = () => {
    setSaving(true);
    dispatch(callApi(deleteValues)) // Use deleteValues directly as it's the ID
    .then(() => {
        close();
      })
      .catch(() => {
        close();
      })
      .finally(() => setSaving(false));
  };

  return (
    <Modal
      title={`Delete ${title}?`}
      open={!!deleteValues}
      onCancel={close}
      footer={[
        <Button
          key="1"
          htmlType="button"
          type="primary"
          loading={saving}
          onClick={deleteApi}
          danger
        >
          Delete
        </Button>,
        <Button key="2" htmlType="button" onClick={close}>
          Cancel
        </Button>,
      ]}
      width={600} // Increased width
      style={{ top: 20, height: "80vh" }} // Increase height
    >
      <div className="flex flex-col items-center justify-start text-center space-y-4">
        <ExclamationCircleOutlined className="text-4xl text-red-500" />
        <div className="text-xl font-semibold">
          Are you sure you want to delete{" "}
          {nameKey && deleteValues[nameKey]
            ? `${deleteValues[nameKey]}${specialChar ? specialChar : ""}`
            : ""}?
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;

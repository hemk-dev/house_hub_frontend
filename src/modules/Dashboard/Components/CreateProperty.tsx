import React, { useState } from "react";
import {
  Drawer,
  Form,
  Input,
  Button,
  Radio,
  Row,
  Col,
  InputNumber,
  Upload,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../Config/store";
import { createProperty } from "../utils/slice";
import { assignErrorToInput } from "../../../Config/api";
import { MdOutlineFileUpload } from "react-icons/md";

interface CreatePropertyProps {
  visible: boolean;
  onClose: () => void;
}

const CreateProperty: React.FC<CreatePropertyProps> = ({
  visible,
  onClose,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [fileList, setFileList] = useState<any[]>([]); // State for storing file list
  const loading = useAppSelector((state) => state.dashboard.isLoading);

  const onFinish = async (values: any) => {
    const formData = new FormData();
    console.log(values);
    // Append non-file fields (text values)
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (
          typeof values[key] === "object" &&
          values[key] !== null &&
          !(values[key] instanceof File)
        ) {
          formData.append(key, JSON.stringify(values[key])); // Serialize nested objects/arrays
        } else {
          formData.append(key, values[key]); // Append regular text values
        }
      }
    }

    console.log(
      "Logging specific fields from formData (before appending files):"
    );
    console.log("Name:", formData.get("name"));
    console.log("Address:", formData.get("address"));
    console.log("Property Status:", formData.get("status"));
    console.log("City:", formData.get("city"));
    // Continue for other fields as needed

    // Now append the files to FormData
    fileList.forEach((file) => {
      formData.append("photos", file.originFileObj); // Append each file
    });
    // Log FormData again after appending images
    console.log("Photos:", formData.getAll("photos")); // Log all appended photos

    console.log("Form Data: ", formData);
    try {
      await dispatch(createProperty(formData));
      form.resetFields();
      setFileList([]); // Reset file list after submission
      onClose();
      console.log("Property created successfully");
    } catch (error) {
      console.error("Failed to create property", error);
      assignErrorToInput(form);
    }
  };
  const onValuesChange = (changedValues: any) => {
    const fieldsValue = form.getFieldsValue();
    // Check if all required fields are filled
    const allFieldsFilled = Object.values(fieldsValue).every(
      (value) => value !== undefined && value !== ""
    );
    setIsSubmitDisabled(!allFieldsFilled);
  };

  const handleFileChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  return (
    <Drawer
      title="Create New Property"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={800} // Increased width for better layout
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange} // Monitor changes in form values
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter city" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="State"
              name="state"
              rules={[{ required: true, message: "Please enter state" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Please enter country" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Deposit"
              name="security_deposit"
              rules={[
                { required: true, message: "Please enter security deposit" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Availability Status"
              name="availability_status"
              rules={[
                {
                  required: true,
                  message: "Please select availability status",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={1}>Immediately</Radio>
                <Radio value={2}>Within 1 Month</Radio>
                <Radio value={3}>1 to 3 Months</Radio>
                <Radio value={4}>3 to 6 Months</Radio>
                <Radio value={5}>6 Months+</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Property Type"
              name="type"
              rules={[
                { required: true, message: "Please select property type" },
              ]}
            >
              <Radio.Group>
                <Radio value="Apartment">Apartment</Radio>
                <Radio value="House">House</Radio>
                <Radio value="Villa">Villa</Radio>
                <Radio value="Townhouse">Townhouse</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Rent"
              name="rent"
              rules={[{ required: true, message: "Please enter rent" }]}
            >
              <Input minLength={0} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Property Status"
              name="status"
              rules={[
                { required: true, message: "Please select property status" },
              ]}
            >
              <Radio.Group>
                <Radio value={0}>Occupied</Radio>
                <Radio value={1}>Vacant</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Furnishing"
              name="furnishing"
              rules={[
                { required: true, message: "Please select furnishing status" },
              ]}
            >
              <Radio.Group>
                <Radio value={1}>Unfurnished</Radio>
                <Radio value={2}>Furnished</Radio>
                <Radio value={3}>Semi-Furnished</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="BHK"
              name="BHK"
              rules={[
                { required: true, message: "Please select BHK" },
                { type: "number", message: "BHK must be a number" },
              ]}
            >
              <Radio.Group>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Age of Construction"
              name="age_of_construction"
              rules={[
                { required: true, message: "Please enter age of construction" },
                { type: "number", message: "Age must be a number" },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Carpet Area"
              name="carpet_area"
              rules={[{ required: true, message: "Please enter carpet area" }]}
            >
              <Input minLength={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Contact"
              name="contact"
              rules={[
                { required: true, message: "Please enter contact number" },
                { type: "string", message: "Contact number must be a string" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Zipcode"
              name="zipcode"
              rules={[{ required: true, message: "Please enter zipcode" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Photos">
              <Upload
                multiple
                fileList={fileList}
                beforeUpload={() => false} // Prevent auto-upload
                onChange={handleFileChange} // Handle file selection
                listType="picture"
              >
                <Button type="dashed" icon={<MdOutlineFileUpload />}>
                  Upload Photos
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isSubmitDisabled}
            loading={loading}
          >
            Submit
          </Button>

          <Button
            type="primary"
            color="red-6"
            danger
            onClick={onClose}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateProperty;

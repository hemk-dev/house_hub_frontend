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
} from "antd";
import { useAppDispatch, useAppSelector } from "../../../Config/store";
import { createProperty } from "../utils/slice";
import { assignErrorToInput } from "../../../Config/api";

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
  const loading = useAppSelector((state) => state.dashboard.isLoading);

  const onFinish = async (values: any) => {
    console.log("Form Values: ", values);
    try {
      await dispatch(
        createProperty({
          ...values,
          furnishing: values.furnishing === "Yes" ? 1 : 0,
          status: values.property_status === "Occupied" ? 1 : 0,
        })
      );
      form.resetFields();
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
                <Radio value="Condo">Condo</Radio>
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
              name="property_status"
              rules={[
                { required: true, message: "Please select property status" },
              ]}
            >
              <Radio.Group>
                <Radio value="Occupied">Occupied</Radio>
                <Radio value="Vacant">Vacant</Radio>
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
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isSubmitDisabled}
            loading={loading}
          >
            Submit
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default CreateProperty;

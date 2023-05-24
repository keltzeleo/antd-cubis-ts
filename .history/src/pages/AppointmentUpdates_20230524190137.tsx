import { PlusOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Drawer, Form, Input, Table } from "antd";
import React, { useState } from "react";

const dataSource = [
  { name: "A", assigned: 5, unassigned: 2 },
  { name: "B", assigned: 4, unassigned: 0 },
  // Add more data as needed
];

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Assigned", dataIndex: "assigned", key: "assigned" },
  { title: "Unassigned", dataIndex: "unassigned", key: "unassigned" },
];

const ExpandableBorderedTable: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values: any) => {
    // Handle form submission and appointment creation
    console.log(values);
    form.resetFields();
    setVisible(false);
  };

  const expandedRowRender = (record: any) => {
    // Render the expanded content when clicking on the name
    return (
      <Drawer
        title={`${record.name}'s Info`}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        {/* Display the basic info of the plumber */}
        {/* Add any additional info you want to display */}
      </Drawer>
    );
  };

  return (
    <ConfigProvider theme={{ token: light }}>
      <>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          expandable={{ expandedRowRender }}
          pagination={false}
        />
        <Button
          type="primary"
          onClick={showDrawer}
          icon={<PlusOutlined />}
          style={{ marginTop: "1rem" }}
        >
          Add Appointment
        </Button>
        <Drawer
          title="Add Appointment"
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Add form fields for customer details and appointment info */}
            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            {/* Add more form fields as needed */}
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        </Drawer>
      </>
    </ConfigProvider>
  );
};

export default ExpandableBorderedTable;

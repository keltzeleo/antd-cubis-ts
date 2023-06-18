import { Col, Form, Input, Row } from "antd";

const CustomerInfo = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <Form onFinish={onFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: "Please enter ID" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter Name" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Branch" name="branch">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Customer No" name="customerNo">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            label="Race"
            name="race"
            rules={[{ required: true, message: "Please enter Race" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <button type="submit">Submit</button>
      </Form.Item>
    </Form>
  );
};

export default CustomerInfo;
